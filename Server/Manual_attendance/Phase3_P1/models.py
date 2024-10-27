from django.db import models

class Phase3_P1Student(models.Model):
    roll_no = models.IntegerField(unique=True, primary_key=True)
    name = models.CharField(max_length=100)
    fathers_name = models.CharField(max_length=100)
    student_mobile = models.CharField(max_length=15)
    father_mobile = models.CharField(max_length=15)
    email = models.EmailField()

    def __str__(self):
        return str(self.roll_no) 
