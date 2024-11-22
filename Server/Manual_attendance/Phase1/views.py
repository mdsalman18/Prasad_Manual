import pandas as pd
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import io
from rest_framework.permissions import AllowAny
from django.db import IntegrityError,transaction
from rest_framework.exceptions import ParseError
import re


# Single student Registration code
class StudentRegistrationListCreateView(generics.ListCreateAPIView):
    queryset = StudentRegistration.objects.all()   
    serializer_class = StudentRegistrationSerializer


# Code for marking the Attendance of the student 
class AttendanceListCreateView(generics.GenericAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    def post(self, request, *args, **kwargs):
        if request.content_type == 'application/json':
            try:
                # Extract the attendance list from the request data
                attendance_data = request.data.get('attendance_list', [])

                # Ensure attendance_data is a list
                if not isinstance(attendance_data, list):
                    raise ParseError("Invalid format: 'attendance_list' must be an array.")

                if not attendance_data:
                    raise ParseError("No attendance data provided.")

            except KeyError:
                raise ParseError("Missing 'attendance_list' key in JSON.")
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Handle non-JSON requests here if necessary (as in the original code)
            roll_number = request.POST.get('roll_no')
            phase = request.POST.get('phase')
            date = request.POST.get('date')
            time_slot = request.POST.get('time_slot')
            status_value = request.POST.get('status')
            subject_name = request.POST.get('subject_name')

            attendance_data = [{
                "roll_no": roll_number,
                "phase": phase,
                "date": date,
                "time_slot": time_slot,
                "status": status_value,
                "subject_name": subject_name
            }]

        # Check if attendance data exists and contains the necessary fields
        if not attendance_data or not any(attendance_data[0].values()):
            return Response({"error": "No attendance data provided."}, status=status.HTTP_400_BAD_REQUEST)

        response_data = []
        success = False

        # Iterate over each attendance record
        for data in attendance_data:
            roll_number = data.get('roll_no')
            phase = data.get('phase')
            date = data.get('date')
            time_slot = data.get('time_slot')
            status_value = data.get('status')
            subject_name = data.get('subject_name')

            if not roll_number or not phase or not date or not time_slot or not status_value or not subject_name:
                response_data.append({
                    "error": "Missing required fields (roll_no, phase, date, time_slot, status, or subject_name)"
                })
                continue

            # Check if student exists
            try:
                student = StudentRegistration.objects.get(roll_no=roll_number, phase=phase)
            except StudentRegistration.DoesNotExist:
                response_data.append({
                    "error": f"Student with roll number {roll_number} and phase {phase} not found."
                })
                continue

            # Check if the combination of roll_no, phase, date, time_slot already exists
            existing_record = Attendance.objects.filter(
                roll_no=roll_number, 
                phase=phase, 
                date=date, 
                time_slot=time_slot
            ).first()

            if existing_record:
                # If the status is different, update it
                if existing_record.status != status_value:
                    existing_record.status = status_value
                    existing_record.save()
                    response_data.append({
                        "roll_no": roll_number,
                        "status": "updated",
                        "data": data
                    })
                    success = True
                else:
                    # If the status is the same, raise an error for no change
                    response_data.append({
                        "error": f"Attendance record with the same time slot already exists for roll number {roll_number}, phase {phase}, date {date}, and subject {subject_name}."
                    })
                    continue

            # Check if an attendance record already exists for the same combination excluding time_slot
            existing_record_without_time_slot = Attendance.objects.filter(
                roll_no=roll_number, 
                phase=phase, 
                date=date, 
                subject_name=subject_name
            ).first()

            if existing_record_without_time_slot:
                # If time_slot has changed, create a new entry instead of updating
                serializer = AttendanceSerializer(data=data)
                if serializer.is_valid():
                    try:
                        serializer.save()
                        response_data.append({
                            "roll_no": roll_number,
                            "status": "created",
                            "data": serializer.data
                        })
                        success = True
                    except IntegrityError:
                        response_data.append({"error": "Attendance record could not be created."})
                else:
                    response_data.append({"error": serializer.errors})
            else:
                # If no existing record found, create a new one
                serializer = AttendanceSerializer(data=data)
                if serializer.is_valid():
                    try:
                        serializer.save()
                        response_data.append({
                            "roll_no": roll_number,
                            "status": "created",
                            "data": serializer.data
                        })
                        success = True
                    except IntegrityError:
                        response_data.append({"error": "Attendance record could not be created."})
                else:
                    response_data.append({"error": serializer.errors})

        return Response(
            response_data,
            status=status.HTTP_201_CREATED if success else status.HTTP_400_BAD_REQUEST
        )
    def get(self, request, *args, **kwargs):

        students = StudentRegistration.objects.all()

        def custom_sort_key(student):
            phase_match = re.match(r"(Phase\d+)[_-](\d+)-(\d+)", student.phase)
            phase_number = int(phase_match.group(2)) if phase_match else 0
            return (phase_number, student.roll_no)

        sorted_students = sorted(students, key=custom_sort_key)

        grouped_by_phase = {}
        for student in sorted_students:
            if student.phase not in grouped_by_phase:
                grouped_by_phase[student.phase] = []
            grouped_by_phase[student.phase].append(student)

        response_data = []

        for phase, phase_students in grouped_by_phase.items():
            phase_data = []

            for student in phase_students:
                attendance_records = Attendance.objects.filter(roll_no=student.roll_no, phase=student.phase).order_by('date')
                
                present_count = attendance_records.filter(status="P").count()
                absent_count = attendance_records.filter(status="A").count()
                total_classes = present_count + absent_count
                attendance_percentage = (present_count / total_classes * 100) if total_classes > 0 else 0
                dates = [record.date for record in attendance_records]
                statuses = [record.status for record in attendance_records]
                time_slots = [record.time_slot for record in attendance_records]
                subject_names = [record.subject_name for record in attendance_records]

                phase_data.append({
                    "roll_no": student.roll_no,
                    "phase": student.phase,
                    "student_name": student.name,
                    "fathers_name": student.fathers_name,
                    "present_count": present_count,
                    "absent_count": absent_count,
                    "total_classes": total_classes,
                    "attendance_percentage": round(attendance_percentage, 2),
                    "dates": dates,
                    "statuses": statuses,
                    "time_slots":time_slots,
                    "subject_names": subject_names,
                })

            response_data.append({
                "phase": phase,
                "students": phase_data
            })

        return Response(response_data, status=status.HTTP_200_OK)



# Code for Uploading CSV file for Bulk student registration 
class UploadStudentRegistrationView(APIView):
    
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')

        if file is None:
            return Response({"error": "No file was uploaded."}, status=status.HTTP_400_BAD_REQUEST)

       
        if file.name.endswith('.csv'):
            try:
               
                decoded_file = file.read().decode('utf-8')
                io_string = io.StringIO(decoded_file)
                df = pd.read_csv(io_string)

                # Start a transaction to ensure atomicity
                with transaction.atomic():
                    for _, row in df.iterrows():
                        # Prepare student data based on CSV columns
                        student_data = {
                            'phase': row.get('phase'),
                            'roll_no': row.get('roll_no'),
                            'name': row.get('name'),
                            'fathers_name': row.get('fathers_name'),
                            'student_mobile': row.get('student_mobile'),
                            'father_mobile': row.get('father_mobile'),
                            'email': row.get('email')
                        }
                        
                       
                        existing_student = StudentRegistration.objects.filter(phase=student_data['phase'], roll_no=student_data['roll_no']).first()
                        
                        if existing_student:
                           
                            serializer = StudentRegistrationSerializer(existing_student, data=student_data, partial=True)
                        else:
                            
                            serializer = StudentRegistrationSerializer(data=student_data)

                        if serializer.is_valid():
                            serializer.save() 
                        else:
                            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                return Response({"message": "Student registrations uploaded successfully!"}, status=status.HTTP_201_CREATED)

            except UnicodeDecodeError:
                return Response({"error": "File encoding is not supported. Please upload a UTF-8 encoded CSV."}, status=status.HTTP_400_BAD_REQUEST)
            except IntegrityError as e:
               
                return Response({"error": f"Integrity error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Invalid file format. Please upload a CSV file."}, status=status.HTTP_400_BAD_REQUEST)



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
    




