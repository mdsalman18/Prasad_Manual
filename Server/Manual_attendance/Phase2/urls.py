from django.urls import path

from Phase2.views import *

urlpatterns = [
    path('students/', Phase2StudentListCreateView.as_view(), name='phase1-student-list-create'),
    path('students/<int:roll_number>/', StudentDetailView.as_view(), name='student_detail'),
    path('Phase2_re/', UploadFileView.as_view(), name='upload-file'),
    path('CommunityMedicine2/', CommunityMedicineListCreateView.as_view(), name='CommunityMedicine-list-create'),
    path('Pathology/', PathologyListCreateView.as_view(), name='Pathology-list-create'),
    path('Microbiology/', MicrobiologyListCreateView.as_view(), name='Microbiology-list-create'),
    path('Pharmacology/', PharmacologyListCreateView.as_view(), name='Pharmacology-list-create'),
    path('ForensicMedAndTC1/', ForensicMedAndTCListCreateView.as_view(), name='ForensicMedAndTC-list-create'),
    path('Medicine1/', MedicineListCreateView.as_view(), name='Medicine-list-create'),
    path('Surgery1/', SurgeryListCreateView.as_view(), name='Surgery-list-create'),
    path('ObsAndGyn/', ObsAndGynListCreateView.as_view(), name='ObsAndGyn-list-create'),
    path('ECA2/', ECAListCreateView.as_view(), name='ECA-list-create'),
      
      
]
