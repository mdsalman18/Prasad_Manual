from django.urls import path

from Phase2.views import *

urlpatterns = [
    path('students/', Phase2StudentListCreateView.as_view(), name='phase1-student-list-create'),
    path('students/<int:roll_number>/', StudentDetailView.as_view(), name='student_detail'),
    path('Phase2_re/', UploadFileView.as_view(), name='upload-file'),
      
      
]
