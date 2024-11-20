from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


# Phase1Student Serializer Code
class Phase1StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase1Student
        fields = ['roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email']


class AttendanceBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = None  
        fields = ['roll_number', 'student_name', 'date', 'status']  



class AnatomySerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Anatomy  


class PhysicologySerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Physicology  


class BiochemistrySerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = Biochemistry 


class CommunityMedicineSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = CommunityMedicine  


class FoundationCourseSerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = FoundationCourse  


class ECASerializer(AttendanceBaseSerializer):
    class Meta(AttendanceBaseSerializer.Meta):
        model = ECA  


# Staff Login and SignUp Code
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class SignupSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'confirm_password')

    def create(self, validated_data):
        if validated_data['password'] != validated_data.pop('confirm_password'):
            raise serializers.ValidationError({"password": "Passwords do not match."})

        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def validate(self, data):
        username_or_email = data.get('username')
        password = data.get('password')
        user = None
        if '@' in username_or_email:
            try:
                user_obj = User.objects.get(email=username_or_email)
                user = authenticate(username=user_obj.username, password=password)
            except User.DoesNotExist:
                raise serializers.ValidationError("User with this email does not exist.")
        else:
            user = authenticate(**data)

        if user is None:
            raise serializers.ValidationError("Invalid credentials.")

        return user



class StudentRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentRegistration
        fields = ['phase', 'roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email']



class AttendanceSerializer(serializers.ModelSerializer):
    name = serializers.CharField(read_only=True) 

    class Meta:
        model = Attendance
        fields = ['date', 'phase', 'subject_name','time_slot', 'roll_no', 'name', 'status']

    