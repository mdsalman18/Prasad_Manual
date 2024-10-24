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
    student = models.OneToOneField(Phase1Student, on_delete=models.CASCADE, related_name='anatomy')
    lecture_1 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_2 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_3 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_4 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_5 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_6 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_7 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_8 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_9 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_10 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_11 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_12 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_13 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_14 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_15 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_16 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_17 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_18 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_19 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_20 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_21 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_22 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_23 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_24 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_25 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_26 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_27 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_28 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_29 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)
    lecture_30 = models.CharField(max_length=1, choices=[('P', 'Present'), ('A', 'Absent'), ('L', 'Leave')], blank=True)

    def __str__(self):
        return f"Attendance for {self.student.name}"
