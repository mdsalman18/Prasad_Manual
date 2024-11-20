from django.urls import path

from Manual_attendance.Phase1.views import *

urlpatterns = [
    path('students1/', Phase1StudentListCreateView.as_view(), name='phase1-student-list-create'),
    path('students1/<int:roll_number>/', StudentDetailView.as_view(), name='student_detail'),
    path('Phase1/', UploadFileView.as_view(), name='upload-file'),
    path('anatomy/', AnatomyListCreateView.as_view(), name='anatomy-list-create'),
    path('physiology/', PhysicologyListCreateView.as_view(), name='physicology-list-create'),
    path('biochemistry/', BiochemistryListCreateView.as_view(), name='biochemistry-list-create'),
    path('communitymedicine/', CommunityMedicineListCreateView.as_view(), name='CommunityMedicine-list-create'),
    path('foundationcourse/', FoundationCourseListCreateView.as_view(), name='FoundationCourse-list-create'),
    path('ecaI/', ECAListCreateView.as_view(), name='ECA-list-create'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('attendance/', AttendanceListCreateView.as_view(), name='attendance-list-create'),
    path('studentsall/', StudentRegistrationListCreateView.as_view(), name='student-registration-list-create')
]
