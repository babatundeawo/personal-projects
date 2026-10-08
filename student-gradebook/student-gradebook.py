"""
Concepts: Dictionaries, Lists, Functions, Nested Loops
Description: Manage student grades and calculate average grades.
"""


def add_student(grades, name):
    grades[name] = []
    print(f"Student {name} has been added")


def add_grade(grades, name, grade):
    if name in grades:
        grades[name].append(grade)
        print(f"Grade {grade} added for {name}")
    else:
        print(f"Student {name} not found")


def calculate_average(grades, name):
    if name in grades and grades[name]:
        average = sum(grades[name]) / len(grades[name])
        return average
    else:
        return None


grades = {}

while True:
    print("\nOptions:")
    print("1. Add Student")
    print("2. Add Grade")
    print("3. Calculate Average")
    print("4. Quit")

    choice = input("Enter choice (1 - 4): ")

    if choice == '1':
        name = input("Enter student name: ").strip().lower()
        add_student(grades, name)
    elif choice == '2':
        name = input("Enter student name: ").strip().lower()
        grade = float(input("Enter grade: "))
        add_grade(grades, name, grade)
    elif choice == '3':
        name = input("Enter student name: ").strip().lower()
        average = calculate_average(grades, name)
        if average is not None:
            print(f"The average grade for {name} is {average:.2f}")
        else:
            print(f"No grades found for {name}")
    elif choice == '4':
        break
    else:
        print("Invalid choice")

