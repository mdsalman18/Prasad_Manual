from django.db import models
from django.core.exceptions import ValidationError


class Phase1Student(models.Model):
    roll_no = models.IntegerField(unique=True, primary_key=True)
    name = models.CharField(max_length=100)
    fathers_name = models.CharField(max_length=100)
    student_mobile = models.CharField(max_length=15)
    father_mobile = models.CharField(max_length=15)
    email = models.EmailField(blank=True)

    def __str__(self):
        return str(self.roll_no) 


class AttendanceBase(models.Model):
    STATUS_CHOICES = [
        ('P', 'Present'),
        ('A', 'Absent'),
        ('L', 'Leave'),
    ]

    roll_number = models.ForeignKey(Phase1Student, on_delete=models.CASCADE)
    student_name = models.CharField(max_length=100, editable=False)
    date = models.DateField()
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)

    def save(self, *args, **kwargs):
        # Automatically populate student_name from the related student record
        if self.roll_number:
            self.student_name = self.roll_number.name
        super().save(*args, **kwargs)

    class Meta:
        abstract = True  # This class is abstract and won't create a database table

    def __str__(self):
        return f"{self.student_name} - {self.date} - {self.get_status_display()}"


# Subject Models using the base class

class Anatomy(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')


class Physicology(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')


class Biochemistry(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')


class CommunityMedicine(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')


class FoundationCourse(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')


class ECA(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')



class StudentRegistration(models.Model):
    phase = models.CharField(max_length=20)
    roll_no = models.IntegerField()
    name = models.CharField(max_length=100)
    fathers_name = models.CharField(max_length=100)
    student_mobile = models.CharField(max_length=15)
    father_mobile = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)

    class Meta:
        # Define a composite primary key (Phase + roll_no)
        unique_together = ('phase', 'roll_no')

    def __str__(self):
        return f'{self.phase}'


class Attendance(models.Model):
    DATE_CHOICES = [
        ('P', 'Present'),
        ('A', 'Absent'),
    ]
    
    date = models.DateField()
    phase = models.ForeignKey(StudentRegistration, related_name='attendances', on_delete=models.CASCADE)
    subject_name = models.CharField(max_length=100)
    time_slot = models.CharField(max_length=20)
    roll_no = models.IntegerField()
    name = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=1, choices=DATE_CHOICES)
    
    class Meta:
        
        unique_together = ('date', 'phase', 'roll_no', 'subject_name')

    def save(self, *args, **kwargs):
        if not self.name:
            try:
                student = StudentRegistration.objects.get(phase=self.phase, roll_no=self.roll_no)
                self.name = student.name  
            except StudentRegistration.DoesNotExist:
                raise ValidationError("No student found with the given phase and roll number.")
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.name} ({self.roll_no}) - {self.subject_name} - {self.status}'