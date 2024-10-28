from rest_framework import serializers
from .models import *

class Phase3_P1StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase3_P1Student
        fields = ['roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email']





# Community Medicine Serializer Code
class CommunityMedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityMedicine
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



# Paediatrics Serializer Code

class PaediatricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paediatrics
        fields = ['roll_number', 'student_name', 'date', 'status']



# Orthopaedics Serializer Code

class OrthopaedicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orthopaedics
        fields = ['roll_number', 'student_name', 'date', 'status']



# Pharmacology Serializer Code

class OphthalmologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ophthalmology
        fields = ['roll_number', 'student_name', 'date', 'status']



# ENT Serializer Code

class ENTSerializer(serializers.ModelSerializer):
    class Meta:
        model = ENT
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

