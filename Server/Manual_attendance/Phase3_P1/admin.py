from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import *
from django.contrib import admin

class Phase3_P1StudentResource(resources.ModelResource):
    class Meta:
        model = Phase3_P1Student
        fields = ('roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email')
        import_id_fields = ['roll_no']

@admin.register(Phase3_P1Student)
class Phase3_P1StudentAdmin(ImportExportModelAdmin):
    resource_class = Phase3_P1StudentResource
    list_display = ('roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email')
    search_fields = ('roll_no', 'name', 'email')



# CommunityMedicine Admin Code

@admin.register(CommunityMedicine)
class CommunityMedicineAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')


# Forensic Med & TC Admin Code

@admin.register(ForensicMedAndTC)
class ForensicMedAndTCAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')


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



# Ophthalmology Admin Code

@admin.register(Ophthalmology)
class OphthalmologyAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')



# ENT Admin Code

@admin.register(ENT)
class ENTAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')




# Obs & Gyn Admin Code

@admin.register(ObsAndGyn)
class ObsAndGynAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')        



# ECA Admin Code

@admin.register(ECA)
class ECAAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')  