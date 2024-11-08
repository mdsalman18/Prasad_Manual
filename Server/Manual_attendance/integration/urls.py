from django.urls import path
from . import views

urlpatterns = [
    path('facial/', views.mark_attendance, name='facial'),
]
