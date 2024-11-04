from django.urls import path

from Phase3_P2.views import *

urlpatterns = [
    path('students4/', Phase3_P2StudentListCreateView.as_view(), name='phase1-student-list-create'),
    path('students4/<int:roll_number>/', StudentDetailView.as_view(), name='student_detail'),
    path('Phase3-P2/', UploadFileView.as_view(), name='upload-file'),
    path('medicine3/', MedicineListCreateView3.as_view(), name='Medicine-list-create'),
    path('surgery3/', SurgeryListCreateView3.as_view(), name='Surgery-list-create'),
    path('obsandgyn3/', ObsAndGynListCreateView3.as_view(), name='ObsAndGyn-list-create'),
    path('psychiatry/', PsychiatryListCreateView.as_view(), name='Psychiatry-list-create'),
    path('dermatology/', DermatologyListCreateView.as_view(), name='Dermatology-list-create'),
    path('radiology/', RadiologyListCreateView.as_view(), name='Radiology-list-create'),
    path('paediatrics2/', PaediatricsListCreateView2.as_view(), name='Paediatrics-list-create'),
    path('orthopaedics2/', OrthopaedicsListCreateView2.as_view(), name='Orthopaedics-list-create'),
    path('ent2/', ENTListCreateView2.as_view(), name='ENT-list-create'),
    path('anaesthsiology/', AnaesthsiologyListCreateView.as_view(), name='Anaesthsiology-list-create'),
    path('ophthalmology2/', OphthalmologyListCreateView2.as_view(), name='Ophthalmology-list-create'),
]
