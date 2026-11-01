"""
This project introduces functions, user inputs, and conditional statements.

Goal: Create a simple calculator that can perform addition, subtraction, multiplication, and division.
"""


def add(x, y):
    return x + y


def subtract(x, y):
    return x - y


def multiply(x, y):
    return x * y


def divide(x, y):
    if y == 0:
        return "Error! Division by zero."
    return x / y


def calculator():
    print("Welcome to the Simple Calculator")
    print("Select operation: ")
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Divide")

    while True:
        operator = input("Enter your choice (1/2/3/4): ")

        if operator in ['1', '2', '3', '4']:
            num1 = float(input("Enter first number: "))
            num2 = float(input("Enter second number: "))

            if operator == '1':
                print(f"Result: {add(num1, num2)}")
            elif operator == '2':
                print(f"Result: {subtract(num1, num2)}")
            elif operator == '3':
                print(f"Result: {multiply(num1, num2)}")
            elif operator == '4':
                print(f"Result: {divide(num1, num2)}")
        else:
            print("Invalid input! Please enter a valid choice.")

        next_calculation = input("Do you want to perform another calculation? (yes/no): ")

        if next_calculation.lower() == 'no':
            break


# Run the calculator
calculator()

"""
Explanation:

Define functions for addition, subtraction, multiplication, and division.
Create a calculator function to handle user interaction.
Use a while loop to continuously ask the user for their choice of operation.
Perform the selected operation and display the result.
Ask the user if they want to perform another calculation and break the loop if they don't.
"""
