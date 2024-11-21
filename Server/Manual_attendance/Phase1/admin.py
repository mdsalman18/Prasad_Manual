from import_export import resources
from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import *


class StudentRegistrationResource(resources.ModelResource):
    class Meta:
        model = StudentRegistration
        fields = ('phase', 'roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email')
        import_id_fields = ['phase', 'roll_no'] 

@admin.register(StudentRegistration)
class StudentRegistrationAdmin(ImportExportModelAdmin):
    resource_class = StudentRegistrationResource  
    list_display = ('phase', 'roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email')
    search_fields = ('phase','roll_no', 'name', 'email')
   

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('date', 'phase', 'subject_name', 'time_slot', 'roll_no', 'name', 'status')
    search_fields = ('date', 'phase', 'subject_name', 'roll_no', 'name')  
    list_filter = ('date', 'phase', 'roll_no')  
   