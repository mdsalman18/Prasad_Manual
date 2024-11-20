from import_export import resources
from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import *
from Manual_attendance.Phase1.admin import AttendanceBaseAdmin

# Resource for Phase2Student
class Phase2StudentResource(resources.ModelResource):
    class Meta:
        model = Phase2Student
        fields = ('roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email')
        import_id_fields = ['roll_no']

# Phase2Student Admin with ImportExport functionality
@admin.register(Phase2Student)
class Phase2StudentAdmin(ImportExportModelAdmin):
    resource_class = Phase2StudentResource
    list_display = ('roll_no', 'name', 'fathers_name', 'student_mobile', 'father_mobile', 'email')
    search_fields = ('roll_no', 'name', 'email')


# CommunityMedicine Admin
@admin.register(CommunityMedicine)
class CommunityMedicineAdmin(AttendanceBaseAdmin):
    pass

# Pathology Admin
@admin.register(Pathology)
class PathologyAdmin(AttendanceBaseAdmin):
    pass

# Microbiology Admin
@admin.register(Microbiology)
class MicrobiologyAdmin(AttendanceBaseAdmin):
    pass

# Pharmacology Admin
@admin.register(Pharmacology)
class PharmacologyAdmin(AttendanceBaseAdmin):
    pass

# ForensicMedAndTC Admin
@admin.register(ForensicMedAndTC)
class ForensicMedAndTCAdmin(AttendanceBaseAdmin):
    pass

# Medicine Admin
@admin.register(Medicine)
class MedicineAdmin(AttendanceBaseAdmin):
    pass

# Surgery Admin
@admin.register(Surgery)
class SurgeryAdmin(AttendanceBaseAdmin):
    pass

# ObsAndGyn Admin
@admin.register(ObsAndGyn)
class ObsAndGynAdmin(AttendanceBaseAdmin):
    pass

# ECA Admin
@admin.register(ECA)
class ECAAdmin(AttendanceBaseAdmin):
    pass
