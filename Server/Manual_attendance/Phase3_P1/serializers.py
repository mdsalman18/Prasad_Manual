from rest_framework import serializers
from .models import *

class Phase3_P1StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase3_P1Student
        fields = ['roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email']

