from rest_framework import serializers
from .models import *
from Manual_attendance.Phase1.serializers import AttendanceBaseSerializer

class Phase3_P2StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase3_P2Student
        fields = ['roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email']




# Medicine Serializer Code
class MedicineSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Medicine


# Surgery Serializer Code
class SurgerySerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Surgery


# Obs And Gyn Serializer Code
class ObsAndGynSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = ObsAndGyn


# Psychiatry Serializer Code
class PsychiatrySerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Psychiatry


# Dermatology Serializer Code
class DermatologySerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Dermatology


# Radiology Serializer Code
class RadiologySerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Radiology


# Paediatrics Serializer Code
class PaediatricsSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Paediatrics


# Orthopaedics Serializer Code
class OrthopaedicsSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Orthopaedics


# ENT Serializer Code
class ENTSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = ENT


# Anaesthsiology Serializer Code
class AnaesthsiologySerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Anaesthsiology


# Ophthalmology Serializer Code
class OphthalmologySerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Ophthalmology
