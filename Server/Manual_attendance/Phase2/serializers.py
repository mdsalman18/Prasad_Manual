from rest_framework import serializers
from .models import *

class Phase2StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase2Student
        fields = ['roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email']



# Community Medicine Serializer Code
class CommunityMedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityMedicine
        fields = ['roll_number', 'student_name', 'date', 'status']



# Pathology Serializer Code

class PathologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pathology
        fields = ['roll_number', 'student_name', 'date', 'status']



# Microbiology Serializer Code

class MicrobiologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Microbiology
        fields = ['roll_number', 'student_name', 'date', 'status']



# Pharmacology Serializer Code

class PharmacologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacology
        fields = ['roll_number', 'student_name', 'date', 'status']




# Forensic Med And TC Serializer Code

class ForensicMedAndTCSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForensicMedAndTC
        fields = ['roll_number', 'student_name', 'date', 'status']



# Medicine  Serializer Code

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = ['roll_number', 'student_name', 'date', 'status']



# Surgery  Serializer Code

class SurgerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Surgery
        fields = ['roll_number', 'student_name', 'date', 'status']



# Obs And Gyn Serializer Code

class ObsAndGynSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObsAndGyn
        fields = ['roll_number', 'student_name', 'date', 'status']


# ECA Serializer Code

class ECASerializer(serializers.ModelSerializer):
    class Meta:
        model = ECA
        fields = ['roll_number', 'student_name', 'date', 'status']

