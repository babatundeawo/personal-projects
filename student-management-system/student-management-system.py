# Student Management System

class Student:
    def __init__(self, name, age, student_id):
        self.name = name.strip().capitalize()
        self.age = age
        self.student_id = student_id.strip().upper()

    def display_info(self):
        print(f"Name: {self.name}, Age: {self.age}, Student ID: {self.student_id}")

class School:
    def __init__(self):
        self.students = {}

    def add_student(self, student):
        self.students[student.student_id] = student
        print(f"Added student {student.name}")

    def remove_student(self, student_id):
        student_id = student_id.strip().upper()
        if student_id in self.students:
            removed_student = self.students.pop(student_id)
            print(f"Removed student {removed_student.name}")
        else:
            print(f"Student ID {student_id} not found")

    def list_students(self):
        print("School Students:")
        for student in self.students.values():
            student.display_info()

# Interactive section
school = School()

while True:
    print("\nOptions: 1. Add Student  2. Remove Student  3. List Students  4. Exit")
    choice = input("Choose an option (1/2/3/4): ").strip()

    if choice == '1':
        name = input("Enter student's name: ")
        age = input("Enter student's age: ")
        student_id = input("Enter student's ID: ")
        student = Student(name, age, student_id)
        school.add_student(student)

    elif choice == '2':
        student_id = input("Enter the ID of the student to remove: ")
        school.remove_student(student_id)

    elif choice == '3':
        school.list_students()

    elif choice == '4':
        print("Exiting the system.")
        break

    else:
        print("Invalid option. Please try again.")


