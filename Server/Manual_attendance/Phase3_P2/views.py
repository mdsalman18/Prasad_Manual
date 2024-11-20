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
from Manual_attendance.Phase1.views import AttendanceBaseView

class Phase3_P2StudentListCreateView(generics.ListCreateAPIView):
    queryset = Phase3_P2Student.objects.all()
    serializer_class = Phase3_P2StudentSerializer


class StudentDetailView(APIView):
    def get(self, request, roll_number):
        try:
            
            roll_number = int(roll_number)  
            student = Phase3_P2Student.objects.get(roll_number=roll_number)
            serializer = Phase3_P2StudentSerializer(student)
            return Response(serializer.data)
        except ValueError:
            return Response({"error": "Invalid roll number"}, status=400)
        except Phase3_P2Student.DoesNotExist:
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
                    existing_student = Phase3_P2Student.objects.filter(roll_no=student_data['roll_no']).first()
                    if existing_student:
                        # Update existing student
                        serializer = Phase3_P2StudentSerializer(existing_student, data=student_data, partial=True)
                    else:
                        # Create a new student
                        serializer = Phase3_P2StudentSerializer(data=student_data)

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




# Medicine Attendance logic
class MedicineListCreateView3(AttendanceBaseView):
    model = Medicine
    serializer_class = MedicineSerializer


# Surgery Attendance logic
class SurgeryListCreateView3(AttendanceBaseView):
    model = Surgery
    serializer_class = SurgerySerializer


# Obs And Gyn Attendance logic
class ObsAndGynListCreateView3(AttendanceBaseView):
    model = ObsAndGyn
    serializer_class = ObsAndGynSerializer


# Psychiatry Attendance logic
class PsychiatryListCreateView(AttendanceBaseView):
    model = Psychiatry
    serializer_class = PsychiatrySerializer


# Dermatology Attendance logic
class DermatologyListCreateView(AttendanceBaseView):
    model = Dermatology
    serializer_class = DermatologySerializer


# Radiology Attendance logic
class RadiologyListCreateView(AttendanceBaseView):
    model = Radiology
    serializer_class = RadiologySerializer


# Paediatrics Attendance logic
class PaediatricsListCreateView2(AttendanceBaseView):
    model = Paediatrics
    serializer_class = PaediatricsSerializer


# Orthopaedics Attendance logic
class OrthopaedicsListCreateView2(AttendanceBaseView):
    model = Orthopaedics
    serializer_class = OrthopaedicsSerializer


# ENT Attendance logic
class ENTListCreateView2(AttendanceBaseView):
    model = ENT
    serializer_class = ENTSerializer


# Anaesthsiology Attendance logic
class AnaesthsiologyListCreateView(AttendanceBaseView):
    model = Anaesthsiology
    serializer_class = AnaesthsiologySerializer


# Ophthalmology Attendance logic
class OphthalmologyListCreateView2(AttendanceBaseView):
    model = Ophthalmology
    serializer_class = OphthalmologySerializer

   
