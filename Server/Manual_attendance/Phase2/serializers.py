from rest_framework import serializers
from .models import *

class Phase2StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase2Student
        fields = ['roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email']

