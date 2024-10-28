from django.urls import path
from Phase1.views import *

urlpatterns = [
    path('students/', Phase1StudentListCreateView.as_view(), name='phase1-student-list-create'),
    path('students/<int:roll_number>/', StudentDetailView.as_view(), name='student_detail'),
    path('Phase1_re/', UploadFileView.as_view(), name='upload-file'),
    path('anatomy/', AnatomyListCreateView.as_view(), name='anatomy-list-create'),
    path('physicology/', PhysicologyListCreateView.as_view(), name='physicology-list-create'),
    path('biochemistry/', BiochemistryListCreateView.as_view(), name='biochemistry-list-create'),
    path('Community-Medicine/', CommunityMedicineListCreateView.as_view(), name='CommunityMedicine-list-create'),
    path('Foundation-Course/', FoundationCourseListCreateView.as_view(), name='FoundationCourse-list-create'),
    path('ECA/', ECAListCreateView.as_view(), name='ECA-list-create'),
      
      
]
