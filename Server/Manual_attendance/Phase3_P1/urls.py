from django.urls import path

from Phase3_P1.views import *

urlpatterns = [
    path('students/', Phase3_P1StudentListCreateView.as_view(), name='phase1-student-list-create'),
    path('students/<int:roll_number>/', StudentDetailView.as_view(), name='student_detail'),
    path('Phase3-P1re/', UploadFileView.as_view(), name='upload-file'),
      
      
]
