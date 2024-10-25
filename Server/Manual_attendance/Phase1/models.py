from django.db import models

class Phase1Student(models.Model):
    roll_no = models.IntegerField(unique=True)
    name = models.CharField(max_length=100)
    fathers_name = models.CharField(max_length=100)
    student_mobile = models.CharField(max_length=15)
    father_mobile = models.CharField(max_length=15)
    email = models.EmailField()

    def __str__(self):
        return f"{self.roll_no} - {self.name}"




class Anatomy(models.Model):
    STATUS_CHOICES = [
        ('P', 'Present'),
        ('A', 'Absent'),
        ('L', 'Leave'),
    ]
    
    student = models.ForeignKey(Phase1Student, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=1, choices=STATUS_CHOICES)


    class Meta:
        unique_together = ('student', 'date')
        
    def __str__(self):
        return f"{self.student.name} - {self.date} - {self.get_status_display()}"