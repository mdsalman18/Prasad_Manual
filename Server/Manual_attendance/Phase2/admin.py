from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import *
from django.contrib import admin

class Phase2StudentResource(resources.ModelResource):
    class Meta:
        model = Phase2Student
        fields = ('roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email')
        import_id_fields = ['roll_no']

@admin.register(Phase2Student)
class Phase2StudentAdmin(ImportExportModelAdmin):
    resource_class = Phase2StudentResource
    list_display = ('roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email')
    search_fields = ('roll_no', 'name', 'email')




# CommunityMedicine Admin Code

@admin.register(CommunityMedicine)
class CommunityMedicineAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')


# Pathology Admin Code

@admin.register(Pathology)
class PathologyAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')


# Microbiology Admin Code

@admin.register(Microbiology)
class MicrobiologyAdmin(admin.ModelAdmin):
    list_display = ('roll_number', 'student_name', 'date', 'status')
    list_filter = ('roll_number','student_name', 'date', 'status')



# Pharmacology Admin Code

@admin.register(Pharmacology)
class PharmacologyAdmin(admin.ModelAdmin):
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