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


@admin.register(Anatomy)
class AnatomyAdmin(admin.ModelAdmin):
    list_display = ['student'] + [f'lecture_{i}' for i in range(1, 31)] 

