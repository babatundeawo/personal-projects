import json
import matplotlib.pyplot as plt
from datetime import datetime
import numpy as np

# Part 1: Collect and Store Data
students = [
    {"name": "Alice", "subject": "Math", "grade": 85, "attendance": 92},
    {"name": "Bob", "subject": "Science", "grade": 78, "attendance": 88},
    {"name": "Charlie", "subject": "Math", "grade": 95, "attendance": 97},
    {"name": "Daisy", "subject": "Science", "grade": 62, "attendance": 70},
    {"name": "Ella", "subject": "Math", "grade": 70, "attendance": 82}
]


# Part 2: Data Manipulation and Basic Analysis

# Calculate the average grade for each subject
def average_grade(subject):
    subject_grades = [student["grade"] for student in students if student["subject"] == subject]
    return sum(subject_grades) / len(subject_grades) if subject_grades else 0


# Find the student with the highest and lowest grade
def top_bottom_students():
    top_student = max(students, key=lambda x: x["grade"])
    bottom_student = min(students, key=lambda x: x["grade"])
    return top_student, bottom_student


# Count students who scored above a certain threshold (e.g., 70%)
def count_above_threshold(threshold):
    return len([student for student in students if student["grade"] > threshold])


# Identify students with low attendance (< 75%)
def low_attendance_students():
    return [student["name"] for student in students if student["attendance"] < 75]


# Part 3: Data Visualization with Matplotlib

# Average grade per subject (Bar Chart)
def plot_avg_grades():
    subjects = list(set(student["subject"] for student in students))  # Get unique subjects
    avg_grades = [average_grade(subject) for subject in subjects]  # Calculate average grades

    plt.bar(subjects, avg_grades, color='skyblue')
    plt.xlabel('Subjects')
    plt.ylabel('Average Grade')
    plt.title('Average Grade per Subject')
    plt.show()

# Attendance improvement needed (Pie Chart)
def plot_attendance_pie():
    low_attendance = len(low_attendance_students())
    high_attendance = len(students) - low_attendance
    sizes = [low_attendance, high_attendance]
    labels = ['Needs Improvement', 'Satisfactory']

    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140, colors=['lightcoral', 'lightgreen'])
    plt.title('Attendance Status')
    plt.show()


# Scatter plot for Grades vs. Attendance
def plot_grades_vs_attendance():
    grades = [student["grade"] for student in students]
    attendance = [student["attendance"] for student in students]

    plt.scatter(attendance, grades, color='purple', marker='o')
    plt.xlabel('Attendance (%)')
    plt.ylabel('Grade')
    plt.title('Grades vs Attendance')
    plt.grid(True)
    plt.show()


# Part 4: Student Class with Inheritance

class Student:
    def __init__(self, name, subject, grade, attendance):
        self.name = name
        self.subject = subject
        self.grade = grade
        self.attendance = attendance

    def is_passing(self):
        return self.grade >= 70 and self.attendance >= 75


class HonorsStudent(Student):
    def is_honors(self):
        return self.grade > 90 and self.attendance > 90


# Part 5: File Handling

# Save student data to JSON
def save_data_to_json(filename="students.json"):
    with open(filename, "w") as f:
        json.dump(students, f)


# Load student data from JSON
def load_data_from_json(filename="students.json"):
    try:
        with open(filename, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print("No saved data found.")
        return []


# Part 6: Generate Summary Report

def generate_summary_report():
    today_date = datetime.today().strftime('%Y-%m-%d')
    report = f"Summary Report - {today_date}\n\n"

    # Students needing attendance improvement
    report += "Students Needing Attendance Improvement:\n"
    for student in low_attendance_students():
        report += f"- {student}\n"

    # Top and bottom students
    top_student, bottom_student = top_bottom_students()
    report += f"\nTop Student: {top_student['name']} ({top_student['grade']}%)\n"
    report += f"Bottom Student: {bottom_student['name']} ({bottom_student['grade']}%)\n"

    # Count honors students
    honors_count = len(
        [s for s in students if HonorsStudent(s["name"], s["subject"], s["grade"], s["attendance"]).is_honors()])
    report += f"\nNumber of Honors Students: {honors_count}\n"

    # Save report to file
    with open("summary_report.txt", "w") as f:
        f.write(report)


# Execute the main analysis

# Step 1: Calculate and display average grades per subject
print("Average Grades per Subject:")
for subject in set(student["subject"] for student in students):
    print(f"{subject}: {average_grade(subject):.2f}")

# Step 2: Display top and bottom students
top_student, bottom_student = top_bottom_students()
print(f"\nTop Student: {top_student['name']} with grade {top_student['grade']}%")
print(f"Bottom Student: {bottom_student['name']} with grade {bottom_student['grade']}%")

# Step 3: Plot graphs
plot_avg_grades()
plot_attendance_pie()
plot_grades_vs_attendance()

# Step 4: Save and Load Data (example usage)
save_data_to_json()
loaded_students = load_data_from_json()

# Step 5: Generate Summary Report
generate_summary_report()
print("\nSummary report saved as 'summary_report.txt'.")
