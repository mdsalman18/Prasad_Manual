import pandas as pd
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
import io
from Manual_attendance.Phase1.views import AttendanceBaseView

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





class CommunityMedicineListCreateView2(AttendanceBaseView):
    model = CommunityMedicine
    serializer_class = CommunityMedicineSerializer


class PathologyListCreateView(AttendanceBaseView):
    model = Pathology
    serializer_class = PathologySerializer


class MicrobiologyListCreateView(AttendanceBaseView):
    model = Microbiology
    serializer_class = MicrobiologySerializer


class PharmacologyListCreateView(AttendanceBaseView):
    model = Pharmacology
    serializer_class = PharmacologySerializer


class ForensicMedAndTCListCreateView1(AttendanceBaseView):
    model = ForensicMedAndTC
    serializer_class = ForensicMedAndTCSerializer


class MedicineListCreateView1(AttendanceBaseView):
    model = Medicine
    serializer_class = MedicineSerializer


class SurgeryListCreateView1(AttendanceBaseView):
    model = Surgery
    serializer_class = SurgerySerializer


class ObsAndGynListCreateView1(AttendanceBaseView):
    model = ObsAndGyn
    serializer_class = ObsAndGynSerializer


class ECAListCreateView2(AttendanceBaseView):
    model = ECA
    serializer_class = ECASerializer
