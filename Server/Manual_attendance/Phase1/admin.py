from import_export import resources
from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import *


# Phase1Student Resource for Import-Export
class Phase1StudentResource(resources.ModelResource):
    class Meta:
        model = Phase1Student
        fields = ('roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email')
        import_id_fields = ['roll_no']


@admin.register(Phase1Student)
class Phase1StudentAdmin(ImportExportModelAdmin):
    resource_class = Phase1StudentResource
    list_display = ('roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email')
    search_fields = ('roll_no', 'name', 'email')


# Base Admin Class for Subject Models
class AttendanceBaseAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number', 'student_name', 'date', 'status')


# Subject Admin Classes (inheriting from the Base Admin)
@admin.register(Anatomy)
class AnatomyAdmin(AttendanceBaseAdmin):
    pass


@admin.register(Physicology)
class PhysicologyAdmin(AttendanceBaseAdmin):
    pass


@admin.register(Biochemistry)
class BiochemistryAdmin(AttendanceBaseAdmin):
    pass


@admin.register(CommunityMedicine)
class CommunityMedicineAdmin(AttendanceBaseAdmin):
    pass


@admin.register(FoundationCourse)
class FoundationCourseAdmin(AttendanceBaseAdmin):
    pass


@admin.register(ECA)
class ECAAdmin(AttendanceBaseAdmin):
    pass



@admin.register(StudentRegistration)
class StudentRegistrationAdmin(admin.ModelAdmin):
    list_display = ('phase', 'roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email')  
    search_fields = ('name', 'roll_no', 'phase')  
    

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('date', 'phase', 'subject_name','time_slot', 'roll_no', 'name', 'status')
    search_fields = ('date', 'phase','subject_name', 'roll_no', 'name')  
    list_filter = ('date', 'phase', 'roll_no')  
    