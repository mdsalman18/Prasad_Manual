from django.urls import path

from Phase3_P1.views import *

urlpatterns = [
    path('students3/', Phase3_P1StudentListCreateView.as_view(), name='phase1-student-list-create'),
    path('students3/<int:roll_number>/', StudentDetailView.as_view(), name='student_detail'),
    path('Phase3-P1/', UploadFileView.as_view(), name='upload-file'),
    path('communitymedicine3/', CommunityMedicineListCreateView3.as_view(), name='CommunityMedicine-list-create'),
    path('forensicmedandtc2/', ForensicMedAndTCListCreateView2.as_view(), name='ForensicMedAndTC-list-create'),
    path('medicine2/', MedicineListCreateView2.as_view(), name='Medicine-list-create'),
    path('surgery2/', SurgeryListCreateView2.as_view(), name='Surgery-list-create'),
    path('paediatrics/', PaediatricsListCreateView.as_view(), name='Paediatrics-list-create'),
    path('orthopaedics/', OrthopaedicsListCreateView.as_view(), name='Orthopaedics-list-create'),
    path('ophthalmology/', OphthalmologyListCreateView.as_view(), name='Ophthalmology-list-create'),
    path('ent/', ENTListCreateView.as_view(), name='ENT-list-create'),
    path('obsandgyn2/', ObsAndGynListCreateView2.as_view(), name='ObsAndGyn-list-create'),
    path('ecaIII/', ECAListCreateView3.as_view(), name='ECA-list-create'), 

]
