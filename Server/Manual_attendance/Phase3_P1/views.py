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





class CommunityMedicineListCreateView3(AttendanceBaseView):
    model = CommunityMedicine
    serializer_class = CommunityMedicineSerializer


class ForensicMedAndTCListCreateView2(AttendanceBaseView):
    model = ForensicMedAndTC
    serializer_class = ForensicMedAndTCSerializer


class MedicineListCreateView2(AttendanceBaseView):
    model = Medicine
    serializer_class = MedicineSerializer


class SurgeryListCreateView2(AttendanceBaseView):
    model = Surgery
    serializer_class = SurgerySerializer


class PaediatricsListCreateView(AttendanceBaseView):
    model = Paediatrics
    serializer_class = PaediatricsSerializer


class OrthopaedicsListCreateView(AttendanceBaseView):
    model = Orthopaedics
    serializer_class = OrthopaedicsSerializer


class OphthalmologyListCreateView(AttendanceBaseView):
    model = Ophthalmology
    serializer_class = OphthalmologySerializer


class ENTListCreateView(AttendanceBaseView):
    model = ENT
    serializer_class = ENTSerializer


class ObsAndGynListCreateView2(AttendanceBaseView):
    model = ObsAndGyn
    serializer_class = ObsAndGynSerializer


class ECAListCreateView3(AttendanceBaseView):
    model = ECA
    serializer_class = ECASerializer
