from rest_framework import serializers
from .models import *

class Phase1StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase1Student
        fields = ['roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email']




# Anatomy Serializer Code
class AnatomySerializer(serializers.ModelSerializer):
    class Meta:
        model = Anatomy
        fields = ['roll_number', 'student_name', 'date', 'status']



# Physicology Serializer Code

class PhysicologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Physicology
        fields = ['roll_number', 'student_name', 'date', 'status']



# Biochemistry Serializer Code

class BiochemistrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Biochemistry
        fields = ['roll_number', 'student_name', 'date', 'status']



# Community Medicine Serializer Code

class CommunityMedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityMedicine
        fields = ['roll_number', 'student_name', 'date', 'status']



# Foundation Course Serializer Code

class FoundationCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoundationCourse
        fields = ['roll_number', 'student_name', 'date', 'status']



# ECA Serializer Code

class ECASerializer(serializers.ModelSerializer):
    class Meta:
        model = ECA
        fields = ['roll_number', 'student_name', 'date', 'status']


