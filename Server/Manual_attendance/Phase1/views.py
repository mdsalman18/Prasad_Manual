import pandas as pd
from rest_framework import generics
from .models import Anatomy, Phase1Student
from .serializers import AnatomySerializer, Phase1StudentSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
import io


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
                decoded_file = file.read().decode('utf-8')  # Adjust if needed (e.g., 'latin1')
                io_string = io.StringIO(decoded_file)
                df = pd.read_csv(io_string)

                for _, row in df.iterrows():
                    # Prepare student data based on CSV columns
                    student_data = {
                        'roll_number': int(row.get('roll_no')),  # Adjusted to match your model
                        'name': row.get('name'),
                        'father_name': row.get('fathers_name'),  # Ensure this matches your model
                        'student_mobile': row.get('student_mobile'),
                        'father_mobile': row.get('father_mobile'),
                        'email': row.get('email')
                    }
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





class AnatomyAttendanceView(APIView):
    def post(self, request, *args, **kwargs):
        roll_no = request.data.get('roll_no')  # Use 'roll_no' here
        attendance_data = request.data.get('attendance')

        # Validate roll_no
        try:
            student = Phase1Student.objects.get(roll_no=roll_no)  # Use 'roll_no' here
        except Phase1Student.DoesNotExist:
            return Response({"error": "Student not found."}, status=status.HTTP_404_NOT_FOUND)

        # Get or create Anatomy record for the student
        anatomy_record, created = Anatomy.objects.get_or_create(student=student)

        # Update attendance for each lecture
        for lecture, status in attendance_data.items():
            if hasattr(anatomy_record, lecture):
                setattr(anatomy_record, lecture, status)
            else:
                return Response({"error": f"{lecture} is not a valid lecture."}, status=status.HTTP_400_BAD_REQUEST)
        
        anatomy_record.save()

        return Response({"message": "Attendance updated successfully!"}, status=status.HTTP_200_OK)  # Use status.HTTP_200_OK