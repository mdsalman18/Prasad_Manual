from django.db import models


class Phase3_P1Student(models.Model):
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

    roll_number = models.ForeignKey(Phase3_P1Student, on_delete=models.CASCADE)
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




class CommunityMedicine(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')


class ForensicMedAndTC(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')


class Medicine(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')


class Surgery(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')


class Paediatrics(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')


class Orthopaedics(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')


class Ophthalmology(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')


class ENT(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')


class ObsAndGyn(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')


class ECA(AttendanceBase):
    class Meta:
        unique_together = ('roll_number', 'date')
