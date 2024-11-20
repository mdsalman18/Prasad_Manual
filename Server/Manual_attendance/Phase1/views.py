import pandas as pd
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
import io
from django.db.models import Count, Case, When
from rest_framework.permissions import AllowAny
from django.db import IntegrityError

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




# Base View code for using all the subjects 

class AttendanceBaseView(generics.GenericAPIView):
    model = None  
    serializer_class = None 

    def get_object(self, roll_number, date):
     
        try:
            return self.model.objects.get(roll_number=roll_number, date=date)
        except self.model.DoesNotExist:
            return None

    def handle_attendance_data(self, attendance_data):
        response_data = []
        success = False

        for data in attendance_data:
            roll_number = data.get('roll_number')
            date = data.get('date')
            status_value = data.get('status')

            # Check if the attendance record exists
            attendance_record = self.get_object(roll_number, date)

            if attendance_record:
                response_data.append(self.update_attendance(attendance_record, data))
            else:
                response_data.append(self.create_attendance(data))

            success = True if any("status" in item for item in response_data) else False

        return response_data, success

    def update_attendance(self, attendance_record, data):
       
        serializer = self.get_serializer(attendance_record, data=data, partial=True)
        if serializer.is_valid():
            try:
                serializer.save()  # Save the updated record
                return {"roll_number": data.get('roll_number'), "status": "updated", "data": serializer.data}
            except IntegrityError:
                return {"roll_number": data.get('roll_number'), "error": "Failed to update attendance."}
        return {"roll_number": data.get('roll_number'), "error": serializer.errors}

    def create_attendance(self, data):
        
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            try:
                serializer.save()  # Save the new record
                return {"roll_number": data.get('roll_number'), "status": "created", "data": serializer.data}
            except IntegrityError:
                return {"roll_number": data.get('roll_number'), "error": "Attendance record already exists."}
        return {"roll_number": data.get('roll_number'), "error": serializer.errors}

    def get_attendance_summary(self):
        
        attendance_summary = self.model.objects.values(
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

            attendance_records = self.model.objects.filter(
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

        return response_data

    def post(self, request, *args, **kwargs):
      
        attendance_data = request.data.get('attendance_list', [])
        response_data, success = self.handle_attendance_data(attendance_data)
        return Response(response_data, status=status.HTTP_201_CREATED if success else status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        
        response_data = self.get_attendance_summary()
        return Response(response_data, status=status.HTTP_200_OK)
    


# Subject wise View set
class AnatomyListCreateView(AttendanceBaseView):
    model = Anatomy
    serializer_class = AnatomySerializer

class PhysicologyListCreateView(AttendanceBaseView):
    model = Physicology
    serializer_class = PhysicologySerializer

class BiochemistryListCreateView(AttendanceBaseView):
    model = Biochemistry
    serializer_class = BiochemistrySerializer

class CommunityMedicineListCreateView(AttendanceBaseView):
    model = CommunityMedicine
    serializer_class = CommunityMedicineSerializer

class FoundationCourseListCreateView(AttendanceBaseView):
    model = FoundationCourse
    serializer_class = FoundationCourseSerializer

class ECAListCreateView(AttendanceBaseView):
    model = ECA
    serializer_class = ECASerializer




# Code for Staff Signup and login 

class SignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = (AllowAny,)

class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            # You can generate tokens or use Django's built-in token authentication here
            return Response({"success": "Logged in successfully!","username": user.username , "fullname" : f"{user.first_name} {user.last_name}" }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    






class StudentRegistrationListCreateView(generics.ListCreateAPIView):
    queryset = StudentRegistration.objects.all()   
    serializer_class = StudentRegistrationSerializer  

import logging
from django.db import IntegrityError, transaction
from django.db.models import Count, Case, When
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics, mixins
from .models import Attendance, StudentRegistration
from .serializers import AttendanceSerializer

# Set up logging
logger = logging.getLogger(__name__)

class AttendanceListCreateView(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    def get_object(self, roll_number, date, phase, subject_name, time_slot):
       
        try:
            return Attendance.objects.get(
                roll_no=roll_number,
                date=date,
                phase__phase=phase,
                subject_name=subject_name,
                time_slot=time_slot
            )
        except Attendance.DoesNotExist:
            return None

    def post(self, request, *args, **kwargs):
   
        attendance_data = request.data.get('attendance_list', [])

    # Check if the attendance_list is empty or invalid
        if not attendance_data:
            return Response({"error": "No attendance data provided."}, status=status.HTTP_400_BAD_REQUEST)

        response_data = []
        success = False

        for data in attendance_data:
            roll_number = data.get('roll_no')
            date = data.get('date')
            phase = data.get('phase')  # phase as a string, e.g. "Phase1-2024"
            subject_name = data.get('subject_name')
            time_slot = data.get('time_slot')
            status_value = data.get('status')

            # Validate required fields
            if not roll_number or not date or not phase or not subject_name or not status_value or not time_slot:
                response_data.append({"error": "Missing required fields."})
                continue

            # Ensure the student exists in the database, treating phase as a string
            try:
                student = StudentRegistration.objects.get(roll_no=roll_number, phase=phase)
            except StudentRegistration.DoesNotExist:
                response_data.append({"error": f"Student with roll number {roll_number} and phase {phase} not found."})
                continue

            # Ensure attendance for the same subject can't be marked more than once on the same day for the same phase
            existing_record = self.get_object(roll_number, date, phase, subject_name, time_slot)

            if existing_record:
                response_data.append(self.update_attendance(existing_record, data))
            else:
                # Check if attendance for the same student on the same day is already marked for another subject
                other_subject_record = Attendance.objects.filter(
                    roll_no=roll_number,
                    date=date,
                    phase=phase  # phase as a string
                ).exclude(subject_name=subject_name)

                if other_subject_record.exists():
                    # Attendance for other subjects exists, so we allow new attendance for the current subject
                    response_data.append(self.create_attendance(data))
                else:
                    # Allow marking attendance for this subject as no attendance exists for the same student on the same date
                    response_data.append(self.create_attendance(data))

            success = any("status" in item for item in response_data)

        return Response(
            response_data,
            status=status.HTTP_201_CREATED if success else status.HTTP_400_BAD_REQUEST
        )


    def update_attendance(self, attendance_record, data):
        """
        Update the attendance record if it exists.
        """
        serializer = self.get_serializer(attendance_record, data=data, partial=True)
        if serializer.is_valid():
            try:
                serializer.save()  # Save the updated record
                logger.info(f"Attendance updated for {data.get('roll_no')} - {data.get('subject_name')}")
                return {"roll_number": data.get('roll_no'), "status": "updated", "data": serializer.data}
            except IntegrityError as e:
                logger.error(f"Failed to update attendance for {data.get('roll_no')}: {str(e)}")
                return {"roll_number": data.get('roll_no'), "error": f"Failed to update attendance: {str(e)}"}
        else:
            logger.error(f"Invalid data for {data.get('roll_no')}: {serializer.errors}")
            return {"roll_number": data.get('roll_no'), "error": serializer.errors}

    def create_attendance(self, data):
        """
        Create a new attendance record.
        """
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            try:
                serializer.save()  # Save the new record
                logger.info(f"Attendance created for {data.get('roll_no')} - {data.get('subject_name')}")
                return {"roll_number": data.get('roll_no'), "status": "created", "data": serializer.data}
            except IntegrityError as e:
                logger.error(f"Error creating attendance for {data.get('roll_no')}: {str(e)}")
                return {"roll_number": data.get('roll_no'), "error": f"Failed to create attendance: {str(e)}"}
        else:
            logger.error(f"Invalid data for {data.get('roll_no')}: {serializer.errors}")
            return {"roll_number": data.get('roll_no'), "error": serializer.errors}

    @transaction.atomic
    def get(self, request, *args, **kwargs):
        """
        Handle GET request to retrieve attendance summary, including subject and phase info.
        """
        response_data = self.get_attendance_summary()
        return Response(response_data, status=status.HTTP_200_OK)

    def get_attendance_summary(self):
        """
        Get the summary of attendance with counts of presents and absents for each subject.
        """
        attendance_summary = self.queryset.values(
            'roll_no',
            'phase__phase',
            'subject_name',
            'time_slot'
        ).annotate(
            present_count=Count(Case(When(status="P", then=1))),
            absent_count=Count(Case(When(status="A", then=1)))
        )

        response_data = []
        for record in attendance_summary:
            roll_number = record['roll_no']
            phase = record['phase__phase']
            subject_name = record['subject_name']
            time_slot = record['time_slot']
            present_count = record['present_count']
            absent_count = record['absent_count']
            total_classes = present_count + absent_count

            attendance_percentage = (present_count / total_classes * 100) if total_classes > 0 else 0

            # Get detailed attendance records for the summary
            attendance_records = self.queryset.filter(
                roll_no=roll_number,
                phase__phase=phase,
                subject_name=subject_name,
                time_slot=time_slot
            ).order_by('date').values_list('date', 'status')

            dates = [entry[0] for entry in attendance_records]
            statuses = [entry[1] for entry in attendance_records]

            response_data.append({
                "roll_number": roll_number,
                "phase": phase,
                "subject_name": subject_name,
                "time_slot": time_slot,
                "present_count": present_count,
                "absent_count": absent_count,
                "total_classes": total_classes,
                "attendance_percentage": round(attendance_percentage, 2),
                "dates": dates,
                "statuses": statuses
            })

        return response_data
