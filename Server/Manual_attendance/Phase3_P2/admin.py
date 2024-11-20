from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import *
from django.contrib import admin
from Manual_attendance.Phase1.admin import AttendanceBaseAdmin

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



@admin.register(Medicine)
class MedicineAdmin(AttendanceBaseAdmin):
    pass

@admin.register(Surgery)
class SurgeryAdmin(AttendanceBaseAdmin):
    pass

@admin.register(ObsAndGyn)
class ObsAndGynAdmin(AttendanceBaseAdmin):
    pass

@admin.register(Psychiatry)
class PsychiatryAdmin(AttendanceBaseAdmin):
    pass

@admin.register(Dermatology)
class DermatologyAdmin(AttendanceBaseAdmin):
    pass

@admin.register(Radiology)
class RadiologyAdmin(AttendanceBaseAdmin):
    pass

@admin.register(Paediatrics)
class PaediatricsAdmin(AttendanceBaseAdmin):
    pass

@admin.register(Orthopaedics)
class OrthopaedicsAdmin(AttendanceBaseAdmin):
    pass

@admin.register(ENT)
class ENTAdmin(AttendanceBaseAdmin):
    pass

@admin.register(Anaesthsiology)
class AnaesthsiologyAdmin(AttendanceBaseAdmin):
    pass

@admin.register(Ophthalmology)
class OphthalmologyAdmin(AttendanceBaseAdmin):
    pass
