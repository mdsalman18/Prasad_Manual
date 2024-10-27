from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import *
from django.contrib import admin

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


# Anatomy Admin Code

@admin.register(Anatomy)
class AnatomyAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')


# Physicology Admin Code

@admin.register(Physicology)
class PhysicologyAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')



# Biochemistry Admin Code

@admin.register(Biochemistry)
class BiochemistryAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')



# CommunityMedicine Admin Code

@admin.register(CommunityMedicine)
class CommunityMedicineAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')


# FoundationCourse Admin Code

@admin.register(FoundationCourse)
class FoundationCourseAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')



# ECA Admin Code

@admin.register(ECA)
class ECAAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')