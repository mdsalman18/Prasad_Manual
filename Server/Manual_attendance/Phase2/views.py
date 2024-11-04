import pandas as pd
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
import io
from rest_framework import mixins
from django.db.models import Count, Case, When

# List all students or create a new one
class Phase2StudentListCreateView(generics.ListCreateAPIView):
    queryset = Phase2Student.objects.all()
    serializer_class = Phase2StudentSerializer

# Retrieve, update, or delete a specific student
class StudentDetailView(APIView):
    def get(self, request, roll_number):
        try:
            # Make sure roll_number is being treated as an integer
            roll_number = int(roll_number)  # Convert to int just in case
            student = Phase2Student.objects.get(roll_number=roll_number)
            serializer = Phase2StudentSerializer(student)
            return Response(serializer.data)
        except ValueError:
            return Response({"error": "Invalid roll number"}, status=400)
        except Phase2Student.DoesNotExist:
            raise NotFound("Student not found")

#Upload the Student data using file FileView

class UploadFileView(APIView):
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')

        if file is None:
            return Response({"error": "No file was uploaded."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure the uploaded file is a CSV
        if file.name.endswith('.csv'):
            try:
                # Read the CSV file with the correct encoding
                decoded_file = file.read().decode('utf-8')
                io_string = io.StringIO(decoded_file)
                df = pd.read_csv(io_string)

                for _, row in df.iterrows():
                    # Prepare student data based on CSV columns
                    student_data = {
                        'roll_no': row.get('roll_no'),  # Ensure this matches your model
                        'name': row.get('name'),
                        'fathers_name': row.get('fathers_name'),  # Ensure this matches your model
                        'student_mobile': row.get('student_mobile'),
                        'father_mobile': row.get('father_mobile'),
                        'email': row.get('email')
                    }
                    
                    # Check if the student already exists
                    existing_student = Phase2Student.objects.filter(roll_no=student_data['roll_no']).first()
                    if existing_student:
                        # Update existing student
                        serializer = Phase2StudentSerializer(existing_student, data=student_data, partial=True)
                    else:
                        # Create a new student
                        serializer = Phase2StudentSerializer(data=student_data)

                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                return Response({"message": "Students uploaded successfully!"}, status=status.HTTP_201_CREATED)
            except UnicodeDecodeError:
                return Response({"error": "File encoding is not supported. Please upload a UTF-8 encoded CSV."}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Invalid file format. Please upload a CSV file."}, status=status.HTTP_400_BAD_REQUEST)






# Community Medicine  Attendance logic

class CommunityMedicineListCreateView2(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = CommunityMedicine.objects.all()
    serializer_class = CommunityMedicineSerializer

    def get_object(self, roll_number, date):
        try:
            return CommunityMedicine.objects.get(roll_number__roll_no=roll_number, date=date)  # Adjusted for ForeignKey lookup
        except CommunityMedicine.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
        attendance_data = request.data.get('attendance_list', [])
        response_data = []
        success = False

        for data in attendance_data:
            roll_number = data.get('roll_number')  # Using roll_number from your schema
            date = data.get('date')
            status_value = data.get('status')

            # Check if the attendance already exists
            attendance_record = self.get_object(roll_number, date)

            if attendance_record:
                # Update the existing record
                serializer = self.get_serializer(attendance_record, data=data, partial=True)
                if serializer.is_valid():
                    try:
                        self.perform_update(serializer)
                        response_data.append({"roll_number": roll_number, "status": "updated", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Failed to update attendance."})
            else:
                # Create a new record
                serializer = self.get_serializer(data=data)
                if serializer.is_valid():
                    try:
                        self.perform_create(serializer)
                        response_data.append({"roll_number": roll_number, "status": "created", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Attendance record already exists."})
                else:
                    response_data.append({"roll_number": roll_number, "error": serializer.errors})

        return Response(response_data, status=status.HTTP_201_CREATED if success else status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save()

    def perform_create(self, serializer):
        serializer.save()

    def get(self, request, *args, **kwargs):
        
        attendance_summary = CommunityMedicine.objects.values(
            'roll_number__roll_no',
            'roll_number__name',            
            'roll_number__fathers_name'      
        ).annotate(
            present_count=Count(Case(When(status="P", then=1))),
            absent_count=Count(Case(When(status="A", then=1)))
        )

        response_data = []
        for record in attendance_summary:
            roll_number = record['roll_number__roll_no']
            student_name = record['roll_number__name']
            fathers_name = record['roll_number__fathers_name']
                
            present_count = record['present_count']
            absent_count = record['absent_count']
            total_classes = present_count + absent_count
            
            attendance_percentage = (present_count / total_classes * 100) if total_classes > 0 else 0
           
            attendance_records = CommunityMedicine.objects.filter(
                roll_number__roll_no=roll_number
            ).order_by('date').values_list('date', 'status')
     
            dates = [entry[0] for entry in attendance_records]
            statuses = [entry[1] for entry in attendance_records]
 
            response_data.append({
                "roll_number": roll_number,
                "student_name": student_name,
                "fathers_name": fathers_name,
                "present_count": present_count,
                "absent_count": absent_count,
                "total_classes": total_classes,
                "attendance_percentage": round(attendance_percentage, 2),
                "dates": dates,          
                "statuses": statuses      
            })

        return Response(response_data, status=status.HTTP_200_OK)




# Pathology  Attendance logic

class PathologyListCreateView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Pathology.objects.all()
    serializer_class = PathologySerializer

    def get_object(self, roll_number, date):
        try:
            return Pathology.objects.get(roll_number__roll_no=roll_number, date=date)  
        except Pathology.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
        attendance_data = request.data.get('attendance_list', [])
        response_data = []
        success = False

        for data in attendance_data:
            roll_number = data.get('roll_number')  
            date = data.get('date')
            status_value = data.get('status')

            
            attendance_record = self.get_object(roll_number, date)

            if attendance_record:
               
                serializer = self.get_serializer(attendance_record, data=data, partial=True)
                if serializer.is_valid():
                    try:
                        self.perform_update(serializer)
                        response_data.append({"roll_number": roll_number, "status": "updated", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Failed to update attendance."})
            else:
                
                serializer = self.get_serializer(data=data)
                if serializer.is_valid():
                    try:
                        self.perform_create(serializer)
                        response_data.append({"roll_number": roll_number, "status": "created", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Attendance record already exists."})
                else:
                    response_data.append({"roll_number": roll_number, "error": serializer.errors})

        return Response(response_data, status=status.HTTP_201_CREATED if success else status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save()

    def perform_create(self, serializer):
        serializer.save()

    def get(self, request, *args, **kwargs):
        
        attendance_summary = Pathology.objects.values(
            'roll_number__roll_no',
            'roll_number__name',            
            'roll_number__fathers_name'      
        ).annotate(
            present_count=Count(Case(When(status="P", then=1))),
            absent_count=Count(Case(When(status="A", then=1)))
        )

        response_data = []
        for record in attendance_summary:
            roll_number = record['roll_number__roll_no']
            student_name = record['roll_number__name']
            fathers_name = record['roll_number__fathers_name']
                
            present_count = record['present_count']
            absent_count = record['absent_count']
            total_classes = present_count + absent_count
            
            attendance_percentage = (present_count / total_classes * 100) if total_classes > 0 else 0
           
            attendance_records = Pathology.objects.filter(
                roll_number__roll_no=roll_number
            ).order_by('date').values_list('date', 'status')
     
            dates = [entry[0] for entry in attendance_records]
            statuses = [entry[1] for entry in attendance_records]
 
            response_data.append({
                "roll_number": roll_number,
                "student_name": student_name,
                "fathers_name": fathers_name,
                "present_count": present_count,
                "absent_count": absent_count,
                "total_classes": total_classes,
                "attendance_percentage": round(attendance_percentage, 2),
                "dates": dates,          
                "statuses": statuses      
            })

        return Response(response_data, status=status.HTTP_200_OK)





# Microbiology  Attendance logic

class MicrobiologyListCreateView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Microbiology.objects.all()
    serializer_class = MicrobiologySerializer

    def get_object(self, roll_number, date):
        try:
            return Microbiology.objects.get(roll_number__roll_no=roll_number, date=date)  
        except Microbiology.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
        attendance_data = request.data.get('attendance_list', [])
        response_data = []
        success = False

        for data in attendance_data:
            roll_number = data.get('roll_number')  
            date = data.get('date')
            status_value = data.get('status')

            
            attendance_record = self.get_object(roll_number, date)

            if attendance_record:
               
                serializer = self.get_serializer(attendance_record, data=data, partial=True)
                if serializer.is_valid():
                    try:
                        self.perform_update(serializer)
                        response_data.append({"roll_number": roll_number, "status": "updated", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Failed to update attendance."})
            else:
                
                serializer = self.get_serializer(data=data)
                if serializer.is_valid():
                    try:
                        self.perform_create(serializer)
                        response_data.append({"roll_number": roll_number, "status": "created", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Attendance record already exists."})
                else:
                    response_data.append({"roll_number": roll_number, "error": serializer.errors})

        return Response(response_data, status=status.HTTP_201_CREATED if success else status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save()

    def perform_create(self, serializer):
        serializer.save()

    def get(self, request, *args, **kwargs):
        
        attendance_summary = Microbiology.objects.values(
            'roll_number__roll_no',
            'roll_number__name',            
            'roll_number__fathers_name'      
        ).annotate(
            present_count=Count(Case(When(status="P", then=1))),
            absent_count=Count(Case(When(status="A", then=1)))
        )

        response_data = []
        for record in attendance_summary:
            roll_number = record['roll_number__roll_no']
            student_name = record['roll_number__name']
            fathers_name = record['roll_number__fathers_name']
                
            present_count = record['present_count']
            absent_count = record['absent_count']
            total_classes = present_count + absent_count
            
            attendance_percentage = (present_count / total_classes * 100) if total_classes > 0 else 0
           
            attendance_records = Microbiology.objects.filter(
                roll_number__roll_no=roll_number
            ).order_by('date').values_list('date', 'status')
     
            dates = [entry[0] for entry in attendance_records]
            statuses = [entry[1] for entry in attendance_records]
 
            response_data.append({
                "roll_number": roll_number,
                "student_name": student_name,
                "fathers_name": fathers_name,
                "present_count": present_count,
                "absent_count": absent_count,
                "total_classes": total_classes,
                "attendance_percentage": round(attendance_percentage, 2),
                "dates": dates,          
                "statuses": statuses      
            })

        return Response(response_data, status=status.HTTP_200_OK)




# Pharmacology  Attendance logic

class PharmacologyListCreateView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Pharmacology.objects.all()
    serializer_class = PharmacologySerializer

    def get_object(self, roll_number, date):
        try:
            return Pharmacology.objects.get(roll_number__roll_no=roll_number, date=date)  
        except Pharmacology.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
        attendance_data = request.data.get('attendance_list', [])
        response_data = []
        success = False

        for data in attendance_data:
            roll_number = data.get('roll_number')  
            date = data.get('date')
            status_value = data.get('status')

            
            attendance_record = self.get_object(roll_number, date)

            if attendance_record:
               
                serializer = self.get_serializer(attendance_record, data=data, partial=True)
                if serializer.is_valid():
                    try:
                        self.perform_update(serializer)
                        response_data.append({"roll_number": roll_number, "status": "updated", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Failed to update attendance."})
            else:
                
                serializer = self.get_serializer(data=data)
                if serializer.is_valid():
                    try:
                        self.perform_create(serializer)
                        response_data.append({"roll_number": roll_number, "status": "created", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Attendance record already exists."})
                else:
                    response_data.append({"roll_number": roll_number, "error": serializer.errors})

        return Response(response_data, status=status.HTTP_201_CREATED if success else status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save()

    def perform_create(self, serializer):
        serializer.save()

    def get(self, request, *args, **kwargs):
        
        attendance_summary = Pharmacology.objects.values(
            'roll_number__roll_no',
            'roll_number__name',            
            'roll_number__fathers_name'      
        ).annotate(
            present_count=Count(Case(When(status="P", then=1))),
            absent_count=Count(Case(When(status="A", then=1)))
        )

        response_data = []
        for record in attendance_summary:
            roll_number = record['roll_number__roll_no']
            student_name = record['roll_number__name']
            fathers_name = record['roll_number__fathers_name']
                
            present_count = record['present_count']
            absent_count = record['absent_count']
            total_classes = present_count + absent_count
            
            attendance_percentage = (present_count / total_classes * 100) if total_classes > 0 else 0
           
            attendance_records = Pharmacology.objects.filter(
                roll_number__roll_no=roll_number
            ).order_by('date').values_list('date', 'status')
     
            dates = [entry[0] for entry in attendance_records]
            statuses = [entry[1] for entry in attendance_records]
 
            response_data.append({
                "roll_number": roll_number,
                "student_name": student_name,
                "fathers_name": fathers_name,
                "present_count": present_count,
                "absent_count": absent_count,
                "total_classes": total_classes,
                "attendance_percentage": round(attendance_percentage, 2),
                "dates": dates,          
                "statuses": statuses      
            })

        return Response(response_data, status=status.HTTP_200_OK)




# Forensic Med And TC Attendance logic

class ForensicMedAndTCListCreateView1(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = ForensicMedAndTC.objects.all()
    serializer_class = ForensicMedAndTCSerializer

    def get_object(self, roll_number, date):
        try:
            return ForensicMedAndTC.objects.get(roll_number__roll_no=roll_number, date=date)  
        except ForensicMedAndTC.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
        attendance_data = request.data.get('attendance_list', [])
        response_data = []
        success = False

        for data in attendance_data:
            roll_number = data.get('roll_number')  
            date = data.get('date')
            status_value = data.get('status')

            
            attendance_record = self.get_object(roll_number, date)

            if attendance_record:
               
                serializer = self.get_serializer(attendance_record, data=data, partial=True)
                if serializer.is_valid():
                    try:
                        self.perform_update(serializer)
                        response_data.append({"roll_number": roll_number, "status": "updated", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Failed to update attendance."})
            else:
                
                serializer = self.get_serializer(data=data)
                if serializer.is_valid():
                    try:
                        self.perform_create(serializer)
                        response_data.append({"roll_number": roll_number, "status": "created", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Attendance record already exists."})
                else:
                    response_data.append({"roll_number": roll_number, "error": serializer.errors})

        return Response(response_data, status=status.HTTP_201_CREATED if success else status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save()

    def perform_create(self, serializer):
        serializer.save()

    def get(self, request, *args, **kwargs):
        
        attendance_summary = ForensicMedAndTC.objects.values(
            'roll_number__roll_no',
            'roll_number__name',            
            'roll_number__fathers_name'      
        ).annotate(
            present_count=Count(Case(When(status="P", then=1))),
            absent_count=Count(Case(When(status="A", then=1)))
        )

        response_data = []
        for record in attendance_summary:
            roll_number = record['roll_number__roll_no']
            student_name = record['roll_number__name']
            fathers_name = record['roll_number__fathers_name']
                
            present_count = record['present_count']
            absent_count = record['absent_count']
            total_classes = present_count + absent_count
            
            attendance_percentage = (present_count / total_classes * 100) if total_classes > 0 else 0
           
            attendance_records = ForensicMedAndTC.objects.filter(
                roll_number__roll_no=roll_number
            ).order_by('date').values_list('date', 'status')
     
            dates = [entry[0] for entry in attendance_records]
            statuses = [entry[1] for entry in attendance_records]
 
            response_data.append({
                "roll_number": roll_number,
                "student_name": student_name,
                "fathers_name": fathers_name,
                "present_count": present_count,
                "absent_count": absent_count,
                "total_classes": total_classes,
                "attendance_percentage": round(attendance_percentage, 2),
                "dates": dates,          
                "statuses": statuses      
            })

        return Response(response_data, status=status.HTTP_200_OK)





# Medicine Attendance logic

class MedicineListCreateView1(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer

    def get_object(self, roll_number, date):
        try:
            return Medicine.objects.get(roll_number__roll_no=roll_number, date=date)  
        except Medicine.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
        attendance_data = request.data.get('attendance_list', [])
        response_data = []
        success = False

        for data in attendance_data:
            roll_number = data.get('roll_number')  
            date = data.get('date')
            status_value = data.get('status')

            
            attendance_record = self.get_object(roll_number, date)

            if attendance_record:
               
                serializer = self.get_serializer(attendance_record, data=data, partial=True)
                if serializer.is_valid():
                    try:
                        self.perform_update(serializer)
                        response_data.append({"roll_number": roll_number, "status": "updated", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Failed to update attendance."})
            else:
                
                serializer = self.get_serializer(data=data)
                if serializer.is_valid():
                    try:
                        self.perform_create(serializer)
                        response_data.append({"roll_number": roll_number, "status": "created", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Attendance record already exists."})
                else:
                    response_data.append({"roll_number": roll_number, "error": serializer.errors})

        return Response(response_data, status=status.HTTP_201_CREATED if success else status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save()

    def perform_create(self, serializer):
        serializer.save()

    def get(self, request, *args, **kwargs):
        
        attendance_summary = Medicine.objects.values(
            'roll_number__roll_no',
            'roll_number__name',            
            'roll_number__fathers_name'      
        ).annotate(
            present_count=Count(Case(When(status="P", then=1))),
            absent_count=Count(Case(When(status="A", then=1)))
        )

        response_data = []
        for record in attendance_summary:
            roll_number = record['roll_number__roll_no']
            student_name = record['roll_number__name']
            fathers_name = record['roll_number__fathers_name']
                
            present_count = record['present_count']
            absent_count = record['absent_count']
            total_classes = present_count + absent_count
            
            attendance_percentage = (present_count / total_classes * 100) if total_classes > 0 else 0
           
            attendance_records = Medicine.objects.filter(
                roll_number__roll_no=roll_number
            ).order_by('date').values_list('date', 'status')
     
            dates = [entry[0] for entry in attendance_records]
            statuses = [entry[1] for entry in attendance_records]
 
            response_data.append({
                "roll_number": roll_number,
                "student_name": student_name,
                "fathers_name": fathers_name,
                "present_count": present_count,
                "absent_count": absent_count,
                "total_classes": total_classes,
                "attendance_percentage": round(attendance_percentage, 2),
                "dates": dates,          
                "statuses": statuses      
            })

        return Response(response_data, status=status.HTTP_200_OK)






# Surgery Attendance logic

class SurgeryListCreateView1(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Surgery.objects.all()
    serializer_class = SurgerySerializer

    def get_object(self, roll_number, date):
        try:
            return Surgery.objects.get(roll_number__roll_no=roll_number, date=date)  
        except Surgery.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
        attendance_data = request.data.get('attendance_list', [])
        response_data = []
        success = False

        for data in attendance_data:
            roll_number = data.get('roll_number')  
            date = data.get('date')
            status_value = data.get('status')

            
            attendance_record = self.get_object(roll_number, date)

            if attendance_record:
               
                serializer = self.get_serializer(attendance_record, data=data, partial=True)
                if serializer.is_valid():
                    try:
                        self.perform_update(serializer)
                        response_data.append({"roll_number": roll_number, "status": "updated", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Failed to update attendance."})
            else:
                
                serializer = self.get_serializer(data=data)
                if serializer.is_valid():
                    try:
                        self.perform_create(serializer)
                        response_data.append({"roll_number": roll_number, "status": "created", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Attendance record already exists."})
                else:
                    response_data.append({"roll_number": roll_number, "error": serializer.errors})

        return Response(response_data, status=status.HTTP_201_CREATED if success else status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save()

    def perform_create(self, serializer):
        serializer.save()

    def get(self, request, *args, **kwargs):
        
        attendance_summary = Surgery.objects.values(
            'roll_number__roll_no',
            'roll_number__name',            
            'roll_number__fathers_name'      
        ).annotate(
            present_count=Count(Case(When(status="P", then=1))),
            absent_count=Count(Case(When(status="A", then=1)))
        )

        response_data = []
        for record in attendance_summary:
            roll_number = record['roll_number__roll_no']
            student_name = record['roll_number__name']
            fathers_name = record['roll_number__fathers_name']
                
            present_count = record['present_count']
            absent_count = record['absent_count']
            total_classes = present_count + absent_count
            
            attendance_percentage = (present_count / total_classes * 100) if total_classes > 0 else 0
           
            attendance_records = Surgery.objects.filter(
                roll_number__roll_no=roll_number
            ).order_by('date').values_list('date', 'status')
     
            dates = [entry[0] for entry in attendance_records]
            statuses = [entry[1] for entry in attendance_records]
 
            response_data.append({
                "roll_number": roll_number,
                "student_name": student_name,
                "fathers_name": fathers_name,
                "present_count": present_count,
                "absent_count": absent_count,
                "total_classes": total_classes,
                "attendance_percentage": round(attendance_percentage, 2),
                "dates": dates,          
                "statuses": statuses      
            })

        return Response(response_data, status=status.HTTP_200_OK)






# Obs And Gyn Attendance logic

class ObsAndGynListCreateView1(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = ObsAndGyn.objects.all()
    serializer_class = ObsAndGynSerializer

    def get_object(self, roll_number, date):
        try:
            return ObsAndGyn.objects.get(roll_number__roll_no=roll_number, date=date)  
        except ObsAndGyn.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
        attendance_data = request.data.get('attendance_list', [])
        response_data = []
        success = False

        for data in attendance_data:
            roll_number = data.get('roll_number')  
            date = data.get('date')
            status_value = data.get('status')

            
            attendance_record = self.get_object(roll_number, date)

            if attendance_record:
               
                serializer = self.get_serializer(attendance_record, data=data, partial=True)
                if serializer.is_valid():
                    try:
                        self.perform_update(serializer)
                        response_data.append({"roll_number": roll_number, "status": "updated", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Failed to update attendance."})
            else:
                
                serializer = self.get_serializer(data=data)
                if serializer.is_valid():
                    try:
                        self.perform_create(serializer)
                        response_data.append({"roll_number": roll_number, "status": "created", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Attendance record already exists."})
                else:
                    response_data.append({"roll_number": roll_number, "error": serializer.errors})

        return Response(response_data, status=status.HTTP_201_CREATED if success else status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save()

    def perform_create(self, serializer):
        serializer.save()

    def get(self, request, *args, **kwargs):
        
        attendance_summary = ObsAndGyn.objects.values(
            'roll_number__roll_no',
            'roll_number__name',            
            'roll_number__fathers_name'      
        ).annotate(
            present_count=Count(Case(When(status="P", then=1))),
            absent_count=Count(Case(When(status="A", then=1)))
        )

        response_data = []
        for record in attendance_summary:
            roll_number = record['roll_number__roll_no']
            student_name = record['roll_number__name']
            fathers_name = record['roll_number__fathers_name']
                
            present_count = record['present_count']
            absent_count = record['absent_count']
            total_classes = present_count + absent_count
            
            attendance_percentage = (present_count / total_classes * 100) if total_classes > 0 else 0
           
            attendance_records = ObsAndGyn.objects.filter(
                roll_number__roll_no=roll_number
            ).order_by('date').values_list('date', 'status')
     
            dates = [entry[0] for entry in attendance_records]
            statuses = [entry[1] for entry in attendance_records]
 
            response_data.append({
                "roll_number": roll_number,
                "student_name": student_name,
                "fathers_name": fathers_name,
                "present_count": present_count,
                "absent_count": absent_count,
                "total_classes": total_classes,
                "attendance_percentage": round(attendance_percentage, 2),
                "dates": dates,          
                "statuses": statuses      
            })

        return Response(response_data, status=status.HTTP_200_OK)





# ECA Attendance logic

class ECAListCreateView2(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = ECA.objects.all()
    serializer_class = ECASerializer

    def get_object(self, roll_number, date):
        try:
            return ECA.objects.get(roll_number__roll_no=roll_number, date=date)  
        except ECA.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
        attendance_data = request.data.get('attendance_list', [])
        response_data = []
        success = False

        for data in attendance_data:
            roll_number = data.get('roll_number')  
            date = data.get('date')
            status_value = data.get('status')

            
            attendance_record = self.get_object(roll_number, date)

            if attendance_record:
               
                serializer = self.get_serializer(attendance_record, data=data, partial=True)
                if serializer.is_valid():
                    try:
                        self.perform_update(serializer)
                        response_data.append({"roll_number": roll_number, "status": "updated", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Failed to update attendance."})
            else:
                
                serializer = self.get_serializer(data=data)
                if serializer.is_valid():
                    try:
                        self.perform_create(serializer)
                        response_data.append({"roll_number": roll_number, "status": "created", "data": serializer.data})
                        success = True
                    except IntegrityError:
                        response_data.append({"roll_number": roll_number, "error": "Attendance record already exists."})
                else:
                    response_data.append({"roll_number": roll_number, "error": serializer.errors})

        return Response(response_data, status=status.HTTP_201_CREATED if success else status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save()

    def perform_create(self, serializer):
        serializer.save()

    def get(self, request, *args, **kwargs):
        
        attendance_summary = ECA.objects.values(
            'roll_number__roll_no',
            'roll_number__name',            
            'roll_number__fathers_name'      
        ).annotate(
            present_count=Count(Case(When(status="P", then=1))),
            absent_count=Count(Case(When(status="A", then=1)))
        )

        response_data = []
        for record in attendance_summary:
            roll_number = record['roll_number__roll_no']
            student_name = record['roll_number__name']
            fathers_name = record['roll_number__fathers_name']
                
            present_count = record['present_count']
            absent_count = record['absent_count']
            total_classes = present_count + absent_count
            
            attendance_percentage = (present_count / total_classes * 100) if total_classes > 0 else 0
           
            attendance_records = ECA.objects.filter(
                roll_number__roll_no=roll_number
            ).order_by('date').values_list('date', 'status')
     
            dates = [entry[0] for entry in attendance_records]
            statuses = [entry[1] for entry in attendance_records]
 
            response_data.append({
                "roll_number": roll_number,
                "student_name": student_name,
                "fathers_name": fathers_name,
                "present_count": present_count,
                "absent_count": absent_count,
                "total_classes": total_classes,
                "attendance_percentage": round(attendance_percentage, 2),
                "dates": dates,          
                "statuses": statuses      
            })

        return Response(response_data, status=status.HTTP_200_OK)









