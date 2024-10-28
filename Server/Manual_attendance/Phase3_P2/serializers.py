from rest_framework import serializers
from .models import *

class Phase3_P2StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase3_P2Student
        fields = ['roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email']





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


# Psychiatry Serializer Code
class PsychiatrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Psychiatry
        fields = ['roll_number', 'student_name', 'date', 'status']



# Dermatology Serializer Code

class DermatologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Dermatology
        fields = ['roll_number', 'student_name', 'date', 'status']



# Radiology Serializer Code

class RadiologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Radiology
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



# ENT Serializer Code

class ENTSerializer(serializers.ModelSerializer):
    class Meta:
        model = ENT
        fields = ['roll_number', 'student_name', 'date', 'status']


# Anaesthsiology Serializer Code

class AnaesthsiologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Anaesthsiology
        fields = ['roll_number', 'student_name', 'date', 'status']


# Pharmacology Serializer Code

class OphthalmologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ophthalmology
        fields = ['roll_number', 'student_name', 'date', 'status']



