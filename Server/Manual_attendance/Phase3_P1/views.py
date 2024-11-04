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


class Phase3_P1StudentListCreateView(generics.ListCreateAPIView):
    queryset = Phase3_P1Student.objects.all()
    serializer_class = Phase3_P1StudentSerializer


class StudentDetailView(APIView):
    def get(self, request, roll_number):
        try:
            
            roll_number = int(roll_number)  
            student = Phase3_P1Student.objects.get(roll_number=roll_number)
            serializer = Phase3_P1StudentSerializer(student)
            return Response(serializer.data)
        except ValueError:
            return Response({"error": "Invalid roll number"}, status=400)
        except Phase3_P1Student.DoesNotExist:
            raise NotFound("Student not found")

#Upload the Student data using file FileView

class UploadFileView(APIView):
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')

        if file is None:
            return Response({"error": "No file was uploaded."}, status=status.HTTP_400_BAD_REQUEST)

     
        if file.name.endswith('.csv'):
            try:
           
                decoded_file = file.read().decode('utf-8')
                io_string = io.StringIO(decoded_file)
                df = pd.read_csv(io_string)

                for _, row in df.iterrows():
                   
                    student_data = {
                        'roll_no': row.get('roll_no'),  
                        'name': row.get('name'),
                        'fathers_name': row.get('fathers_name'),  
                        'student_mobile': row.get('student_mobile'),
                        'father_mobile': row.get('father_mobile'),
                        'email': row.get('email')
                    }
                    
                    # Check if the student already exists
                    existing_student = Phase3_P1Student.objects.filter(roll_no=student_data['roll_no']).first()
                    if existing_student:
                        # Update existing student
                        serializer = Phase3_P1StudentSerializer(existing_student, data=student_data, partial=True)
                    else:
                        # Create a new student
                        serializer = Phase3_P1StudentSerializer(data=student_data)

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

class CommunityMedicineListCreateView3(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
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





# Forensic Med And TC Attendance logic

class ForensicMedAndTCListCreateView2(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
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

class MedicineListCreateView2(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
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

class SurgeryListCreateView2(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
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





# Paediatrics  Attendance logic

class PaediatricsListCreateView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Paediatrics.objects.all()
    serializer_class = PaediatricsSerializer

    def get_object(self, roll_number, date):
        try:
            return Paediatrics.objects.get(roll_number__roll_no=roll_number, date=date)  
        except Paediatrics.DoesNotExist:
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
        
        attendance_summary = Paediatrics.objects.values(
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
           
            attendance_records = Paediatrics.objects.filter(
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




# Orthopaedics  Attendance logic

class OrthopaedicsListCreateView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Orthopaedics.objects.all()
    serializer_class = OrthopaedicsSerializer

    def get_object(self, roll_number, date):
        try:
            return Orthopaedics.objects.get(roll_number__roll_no=roll_number, date=date)  
        except Orthopaedics.DoesNotExist:
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
        
        attendance_summary = Orthopaedics.objects.values(
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
           
            attendance_records = Orthopaedics.objects.filter(
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




# Ophthalmology  Attendance logic

class OphthalmologyListCreateView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Ophthalmology.objects.all()
    serializer_class = OphthalmologySerializer

    def get_object(self, roll_number, date):
        try:
            return Ophthalmology.objects.get(roll_number__roll_no=roll_number, date=date)  
        except Ophthalmology.DoesNotExist:
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
        
        attendance_summary = Ophthalmology.objects.values(
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
           
            attendance_records = Ophthalmology.objects.filter(
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



# ENT Attendance logic

class ENTListCreateView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = ENT.objects.all()
    serializer_class = ENTSerializer

    def get_object(self, roll_number, date):
        try:
            return ENT.objects.get(roll_number__roll_no=roll_number, date=date)  
        except ENT.DoesNotExist:
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
        
        attendance_summary = ENT.objects.values(
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
           
            attendance_records = ENT.objects.filter(
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

class ObsAndGynListCreateView2(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
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

class ECAListCreateView3(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
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

