from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import *
from django.contrib import admin

class Phase3_P2StudentResource(resources.ModelResource):
    class Meta:
        model = Phase3_P2Student
        fields = ('roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email')
        import_id_fields = ['roll_no']

@admin.register(Phase3_P2Student)
class Phase3_P2StudentAdmin(ImportExportModelAdmin):
    resource_class = Phase3_P2StudentResource
    list_display = ('roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email')
    search_fields = ('roll_no', 'name', 'email')




# Medicine Admin Code

@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')



# Surgery Admin Code

@admin.register(Surgery)
class SurgeryAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')




# Obs & Gyn Admin Code

@admin.register(ObsAndGyn)
class ObsAndGynAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')        



# Psychiatry Admin Code

@admin.register(Psychiatry)
class PsychiatryAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')


# Dermatology Admin Code

@admin.register(Dermatology)
class DermatologyAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')



# Radiology Admin Code

@admin.register(Radiology)
class RadiologyAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')




# Paediatrics Admin Code

@admin.register(Paediatrics)
class PaediatricsAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')


# Orthopaedics Admin Code

@admin.register(Orthopaedics)
class OrthopaedicsAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')



# ENT Admin Code

@admin.register(ENT)
class ENTAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')



# Anaesthsiology Admin Code

@admin.register(Anaesthsiology)
class AnaesthsiologyAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')



# Ophthalmology Admin Code

@admin.register(Ophthalmology)
class OphthalmologyAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')
