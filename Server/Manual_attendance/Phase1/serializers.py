from rest_framework import serializers
from .models import *

class Phase1StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase1Student
        fields = ['roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email']

class AnatomySerializer(serializers.ModelSerializer):
    class Meta:
        model = Anatomy
        fields = ['student', 'lecture_1', 'lecture_2', 'lecture_3', 'lecture_4', 'lecture_5', 
                  'lecture_6', 'lecture_7', 'lecture_8', 'lecture_9', 'lecture_10',
                  'lecture_11', 'lecture_12', 'lecture_13', 'lecture_14', 'lecture_15',
                  'lecture_16', 'lecture_17', 'lecture_18', 'lecture_19', 'lecture_20',
                  'lecture_21', 'lecture_22', 'lecture_23', 'lecture_24', 'lecture_25',
                  'lecture_26', 'lecture_27', 'lecture_28', 'lecture_29', 'lecture_30']
