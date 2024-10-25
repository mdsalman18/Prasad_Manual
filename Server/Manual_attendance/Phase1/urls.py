from django.urls import path

from Phase1.views import *

urlpatterns = [
    path('', Phase1StudentListCreateView.as_view(), name='phase1-student-list-create'),
    path('students/<int:roll_number>/', StudentDetailView.as_view(), name='student_detail'),
    path('upload-file/', UploadFileView.as_view(), name='upload-file'),
    path('anatomy/', AttendanceListCreateView.as_view(), name='anatomy-list-create'),
      
      
]
