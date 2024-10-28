from django.urls import path

from Phase3_P1.views import *

urlpatterns = [
    path('students/', Phase3_P1StudentListCreateView.as_view(), name='phase1-student-list-create'),
    path('students/<int:roll_number>/', StudentDetailView.as_view(), name='student_detail'),
    path('Phase3-P1re/', UploadFileView.as_view(), name='upload-file'),
    path('CommunityMedicine3/', CommunityMedicineListCreateView.as_view(), name='CommunityMedicine-list-create'),
    path('ForensicMedAndTC2/', ForensicMedAndTCListCreateView.as_view(), name='ForensicMedAndTC-list-create'),
    path('Medicine2/', MedicineListCreateView.as_view(), name='Medicine-list-create'),
    path('Surgery2/', SurgeryListCreateView.as_view(), name='Surgery-list-create'),
    path('Paediatrics/', PaediatricsListCreateView.as_view(), name='Paediatrics-list-create'),
    path('Orthopaedics/', OrthopaedicsListCreateView.as_view(), name='Orthopaedics-list-create'),
    path('Ophthalmology/', OphthalmologyListCreateView.as_view(), name='Ophthalmology-list-create'),
    path('ENT/', ENTListCreateView.as_view(), name='ENT-list-create'),
    path('ObsAndGyn2/', ObsAndGynListCreateView.as_view(), name='ObsAndGyn-list-create'),
    path('ECA3/', ECAListCreateView.as_view(), name='ECA-list-create'),
      
      
      
]
