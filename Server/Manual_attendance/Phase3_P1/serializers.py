from rest_framework import serializers
from .models import *
from Manual_attendance.Phase1.serializers import AttendanceBaseSerializer

class Phase3_P1StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase3_P1Student
        fields = ['roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email']




# Community Medicine Serializer Code
class CommunityMedicineSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = CommunityMedicine


# Forensic Med And TC Serializer Code
class ForensicMedAndTCSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = ForensicMedAndTC


# Medicine Serializer Code
class MedicineSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Medicine


# Surgery Serializer Code
class SurgerySerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Surgery


# Paediatrics Serializer Code
class PaediatricsSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Paediatrics


# Orthopaedics Serializer Code
class OrthopaedicsSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Orthopaedics


# Ophthalmology Serializer Code
class OphthalmologySerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Ophthalmology


# ENT Serializer Code
class ENTSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = ENT


# Obs And Gyn Serializer Code
class ObsAndGynSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = ObsAndGyn


# ECA Serializer Code
class ECASerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = ECA
