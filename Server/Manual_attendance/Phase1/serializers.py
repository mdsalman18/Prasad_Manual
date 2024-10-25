from rest_framework import serializers
from .models import *

class Phase1StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase1Student
        fields = ['roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email']

class AnatomySerializer(serializers.ModelSerializer):
    class Meta:
        model = Anatomy
        fields = ['id', 'student', 'date', 'status']
