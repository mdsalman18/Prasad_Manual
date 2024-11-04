from django.urls import path

from Phase2.views import *

urlpatterns = [
    path('students2/', Phase2StudentListCreateView.as_view(), name='phase1-student-list-create'),
    path('students2/<int:roll_number>/', StudentDetailView.as_view(), name='student_detail'),
    path('Phase2/', UploadFileView.as_view(), name='upload-file'),
    path('communitymedicine2/', CommunityMedicineListCreateView2.as_view(), name='CommunityMedicine-list-create'),
    path('pathology/', PathologyListCreateView.as_view(), name='Pathology-list-create'),
    path('microbiology/', MicrobiologyListCreateView.as_view(), name='Microbiology-list-create'),
    path('pharmacology/', PharmacologyListCreateView.as_view(), name='Pharmacology-list-create'),
    path('forensicmedandtc1/', ForensicMedAndTCListCreateView1.as_view(), name='ForensicMedAndTC-list-create'),
    path('medicine1/', MedicineListCreateView1.as_view(), name='Medicine-list-create'),
    path('surgery1/', SurgeryListCreateView1.as_view(), name='Surgery-list-create'),
    path('obsandgyn1/', ObsAndGynListCreateView1.as_view(), name='ObsAndGyn-list-create'),
    path('eca2/', ECAListCreateView2.as_view(), name='ECA-list-create'),

]
