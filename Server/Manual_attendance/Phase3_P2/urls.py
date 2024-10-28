from django.urls import path

from Phase3_P2.views import *

urlpatterns = [
    path('students/', Phase3_P2StudentListCreateView.as_view(), name='phase1-student-list-create'),
    path('students/<int:roll_number>/', StudentDetailView.as_view(), name='student_detail'),
    path('Phase3-P2re/', UploadFileView.as_view(), name='upload-file'),
    path('Medicine3/', MedicineListCreateView.as_view(), name='Medicine-list-create'),
    path('Surgery3/', SurgeryListCreateView.as_view(), name='Surgery-list-create'),
    path('ObsAndGyn3/', ObsAndGynListCreateView.as_view(), name='ObsAndGyn-list-create'),
    path('Psychiatry/', PsychiatryListCreateView.as_view(), name='Psychiatry-list-create'),
    path('Dermatology/', DermatologyListCreateView.as_view(), name='Dermatology-list-create'),
    path('Radiology/', RadiologyListCreateView.as_view(), name='Radiology-list-create'),
    path('Paediatrics2/', PaediatricsListCreateView.as_view(), name='Paediatrics-list-create'),
    path('Orthopaedics2/', OrthopaedicsListCreateView.as_view(), name='Orthopaedics-list-create'),
    path('ENT2/', ENTListCreateView.as_view(), name='ENT-list-create'),
    path('Anaesthsiology/', AnaesthsiologyListCreateView.as_view(), name='Anaesthsiology-list-create'),
    path('Ophthalmology2/', OphthalmologyListCreateView.as_view(), name='Ophthalmology-list-create'),
    
      
      
]
