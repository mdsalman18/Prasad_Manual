from django.core.exceptions import ValidationError
from django.db import models

class StudentRegistration(models.Model):
    phase = models.CharField(max_length=20)
    roll_no = models.IntegerField()
    name = models.CharField(max_length=100)
    fathers_name = models.CharField(max_length=100)
    student_mobile = models.CharField(max_length=15)
    father_mobile = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)

    class Meta:
        unique_together = ('phase', 'roll_no')

    def __str__(self):
        return f'{self.phase} - {self.name}'
    
        
class Attendance(models.Model):
    DATE_CHOICES = [
        ('P', 'Present'),
        ('A', 'Absent'),
    ]
    
    date = models.DateField()
    phase = models.CharField(max_length=20)  # Store phase as a string like 'Phase1-2024'
    subject_name = models.CharField(max_length=100)
    time_slot = models.CharField(max_length=20)
    roll_no = models.IntegerField()
    name = models.CharField(max_length=100)  # Student name is optional here
    status = models.CharField(max_length=1, choices=DATE_CHOICES)
    
    class Meta:
        unique_together = ('date', 'phase', 'roll_no','time_slot')

    def save(self, *args, **kwargs):
        # Check if the student exists in StudentRegistration
        try:
            student = StudentRegistration.objects.get(phase=self.phase, roll_no=self.roll_no)
            # If the name is not provided in the attendance, auto-populate it
            if not self.name:
                self.name = student.name
        except StudentRegistration.DoesNotExist:
            # Raise an error if the student does not exist
            raise ValidationError(f"Student with phase '{self.phase}' and roll number '{self.roll_no}' does not exist.")
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.name} ({self.roll_no}) - {self.subject_name} - {self.status}'