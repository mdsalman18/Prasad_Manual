from rest_framework import serializers
from .models import *
from Manual_attendance.Phase1.serializers import AttendanceBaseSerializer


# Phase2Student Serializer
class Phase2StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase2Student
        fields = ['roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email']


class CommunityMedicineSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = CommunityMedicine


class PathologySerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Pathology


class MicrobiologySerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Microbiology


class PharmacologySerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Pharmacology


class ForensicMedAndTCSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = ForensicMedAndTC


class MedicineSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Medicine


class SurgerySerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Surgery


class ObsAndGynSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = ObsAndGyn


class ECASerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = ECA
