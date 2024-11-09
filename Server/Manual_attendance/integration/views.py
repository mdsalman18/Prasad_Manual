from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from datetime import datetime
from Phase1.models import Anatomy, Physicology, Biochemistry, CommunityMedicine, FoundationCourse, ECA, Phase1Student
from Phase2.models import CommunityMedicine as Phase2CommunityMedicine, Pathology, Microbiology, Pharmacology, ForensicMedAndTC, Medicine as Phase2Medicine, Surgery as Phase2Surgery, ObsAndGyn, ECA as Phase2ECA, Phase2Student
from Phase3_P1.models import CommunityMedicine as Phase3P1CommunityMedicine, Medicine as Phase3P1Medicine, Surgery as Phase3P1Surgery, Paediatrics, ForensicMedAndTC as Phase3P1ForensicMedAndTC, Orthopaedics, Ophthalmology, ENT, ObsAndGyn as Phase3P1ObsAndGyn, ECA as Phase3P1ECA, Phase3_P1Student
from Phase3_P2.models import Psychiatry, Medicine as Phase3P2Medicine, Surgery as Phase3P2Surgery, Dermatology, Radiology, Orthopaedics as Phase3P2Orthopaedics, Paediatrics as Phase3P2Paediatrics, ENT as Phase3P2ENT, Anaesthsiology, Ophthalmology as Phase3P2Ophthalmology, ObsAndGyn as Phase3P2ObsAndGyn, Phase3_P2Student

@api_view(['POST'])
def mark_attendance(request):
    """
    API to mark attendance for a student through facial recognition system.
    Marks attendance as 'Present' if student detected, 'Absent' if not.
    Also records student name from facial data.
    """
    try:
        # Extract required parameters
        roll_no = request.data.get('roll_no')
        phase = request.data.get('phase')
        date = request.data.get('date')  # Use 'date' directly instead of 'checked_in_time'
        subject_name = request.data.get('subject_name')

        if not roll_no or not phase or not date or not subject_name:
            return Response({"error": "Missing required parameters."}, status=status.HTTP_400_BAD_REQUEST)

        # Convert date to datetime object (you can use just the date without time part)
        try:
            date = datetime.strptime(date, "%Y-%m-%d").date()
        except ValueError:
            return Response({"error": "Invalid date format. Expected format: YYYY-MM-DD"}, status=status.HTTP_400_BAD_REQUEST)

        status_value = 'P'  # Assuming that student is present as they are detected by facial recognition

        # Map phases to their student and attendance models
        phase_models = {
            "Phase1": (Phase1Student, {
                "Anatomy": Anatomy, "Physicology": Physicology, "Biochemistry": Biochemistry,
                "Community Medicine": CommunityMedicine, "Foundation Course": FoundationCourse, "ECA": ECA
            }),
            "Phase2": (Phase2Student, {
                "Community Medicine": Phase2CommunityMedicine, "Pathology": Pathology, "Microbiology": Microbiology,
                "Pharmacology": Pharmacology, "Forensic Med & TC": ForensicMedAndTC, "Medicine": Phase2Medicine,
                "Surgery": Phase2Surgery, "Obs & Gyn": ObsAndGyn, "ECA": Phase2ECA
            }),
            "Phase3_P1": (Phase3_P1Student, {
                "Community Medicine": Phase3P1CommunityMedicine, "Medicine": Phase3P1Medicine, "Surgery": Phase3P1Surgery,
                "Paediatrics": Paediatrics, "Forensic Med & TC": Phase3P1ForensicMedAndTC, "Orthopaedics": Orthopaedics,
                "Ophthalmology": Ophthalmology, "ENT": ENT, "Obs & Gyn": Phase3P1ObsAndGyn, "ECA": Phase3P1ECA
            }),
            "Phase3_P2": (Phase3_P2Student, {
                "Psychiatry": Psychiatry, "Medicine": Phase3P2Medicine, "Surgery": Phase3P2Surgery,
                "Dermatology": Dermatology, "Radiology": Radiology, "Orthopaedics": Phase3P2Orthopaedics,
                "Paediatrics": Phase3P2Paediatrics, "ENT": Phase3P2ENT, "Anaesthsiology": Anaesthsiology,
                "Ophthalmology": Phase3P2Ophthalmology, "Obs & Gyn": Phase3P2ObsAndGyn
            })
        }

        # Retrieve the relevant models
        student_model, attendance_model_map = phase_models.get(phase, (None, None))
        if not student_model or not attendance_model_map:
            return Response({"error": "Invalid phase."}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch student by roll number
        student = student_model.objects.filter(roll_no=roll_no).first()
        if not student:
            return Response({"error": "Student not found."}, status=status.HTTP_404_NOT_FOUND)

        student_name = student.name  # Get student's name

        # Find the subject's attendance model
        attendance_model = attendance_model_map.get(subject_name)
        if not attendance_model:
            return Response({"error": f"Subject '{subject_name}' not found in phase {phase}."}, status=status.HTTP_400_BAD_REQUEST)

        # Check or create attendance record for date and update status
        attendance, created = attendance_model.objects.get_or_create(
            roll_number=student,
            date=date,
            defaults={'student_name': student_name, 'status': status_value}
        )
        if not created:
            attendance.status = status_value
            attendance.save()

        return Response({
            "message": "Attendance marked successfully.",
            "subject": subject_name,
            "status": status_value
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
