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

# List all students or create a new one
class Phase1StudentListCreateView(generics.ListCreateAPIView):
    queryset = Phase1Student.objects.all()
    serializer_class = Phase1StudentSerializer

# Retrieve, update, or delete a specific student
class StudentDetailView(APIView):
    def get(self, request, roll_number):
        try:
            # Make sure roll_number is being treated as an integer
            roll_number = int(roll_number)  # Convert to int just in case
            student = Phase1Student.objects.get(roll_number=roll_number)
            serializer = Phase1StudentSerializer(student)
            return Response(serializer.data)
        except ValueError:
            return Response({"error": "Invalid roll number"}, status=400)
        except Phase1Student.DoesNotExist:
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
                    existing_student = Phase1Student.objects.filter(roll_no=student_data['roll_no']).first()
                    if existing_student:
                        # Update existing student
                        serializer = Phase1StudentSerializer(existing_student, data=student_data, partial=True)
                    else:
                        # Create a new student
                        serializer = Phase1StudentSerializer(data=student_data)

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



# Anatomy  Attendance logic

class AnatomyListCreateView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Anatomy.objects.all()
    serializer_class = AnatomySerializer

    def get_object(self, roll_number, date):
        try:
            return Anatomy.objects.get(roll_number__roll_no=roll_number, date=date)  # Adjusted for ForeignKey lookup
        except Anatomy.DoesNotExist:
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





# Physicology  Attendance logic

class PhysicologyListCreateView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Physicology.objects.all()
    serializer_class = PhysicologySerializer

    def get_object(self, roll_number, date):
        try:
            return Physicology.objects.get(roll_number__roll_no=roll_number, date=date)  
        except Physicology.DoesNotExist:
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




# Biochemistry  Attendance logic

class BiochemistryListCreateView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Biochemistry.objects.all()
    serializer_class = BiochemistrySerializer

    def get_object(self, roll_number, date):
        try:
            return Biochemistry.objects.get(roll_number__roll_no=roll_number, date=date)  
        except Biochemistry.DoesNotExist:
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




# Community Medicine  Attendance logic

class CommunityMedicineListCreateView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = CommunityMedicine.objects.all()
    serializer_class = CommunityMedicineSerializer

    def get_object(self, roll_number, date):
        try:
            return CommunityMedicine.objects.get(roll_number__roll_no=roll_number, date=date)  
        except CommunityMedicine.DoesNotExist:
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



# Community Medicine  Attendance logic

class FoundationCourseListCreateView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = FoundationCourse.objects.all()
    serializer_class = FoundationCourseSerializer

    def get_object(self, roll_number, date):
        try:
            return FoundationCourse.objects.get(roll_number__roll_no=roll_number, date=date)  
        except FoundationCourse.DoesNotExist:
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





# Community Medicine  Attendance logic

class ECAListCreateView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
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












