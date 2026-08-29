"""
Explanation:
User Input: The program first asks the user to input the number of grades. Then, it collects each grade in a loop.
List Handling: The grades are stored in a list.
Average Calculation: The calculate_average function computes the average of the grades.
CGPA Calculation: The calculate_cgpa function determines the CGPA based on the average grade.
Output: The program outputs the average grade and the corresponding CGPA.
"""


def calculate_average(grades):
    return sum(grades) / len(grades)


def calculate_cgpa(average):
    if average >= 80:
        return 5.0
    elif average >= 70:
        return 4.5
    elif average >= 60:
        return 4.0
    elif average >= 50:
        return 3.0
    elif average >= 40:
        return 2.0
    else:
        return 1.0


# get the number of grades from the user
num_grades = int(input('Enter the number of subjects: '))

grades = []
for i in range(1, num_grades + 1):
    grade = float(input(f"Enter grade {i}: "))
    grades.append(grade)

# Calculate the average grade
average = calculate_average(grades)
print(f"\nThe average grade is: {average:.2f}")

# Calculate the CGPA - Cumulative Grade Point Average
cgpa = calculate_cgpa(average)
print(f"The student's CGPA is: {cgpa:.1f}")

