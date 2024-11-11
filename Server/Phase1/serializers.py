from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

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



# Staff Login and SignUp code
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