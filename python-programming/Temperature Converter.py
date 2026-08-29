"""
Concepts: Data Conversion, Functions

Description: Convert temperatures between Celsius and Fahrenheit and vice versa.
"""


def celsius_to_fahrenheit(celsius):
    return (celsius * 9 / 5) + 32


def fahrenheit_to_celsius(fahrenheit):
    return (fahrenheit - 32) * 5 / 9


def get_temperature(prompt):
    while True:
        try:
            temp = float(input(prompt))
            return temp
        except ValueError:
            print("Invalid input! Please enter a numerical value.")


def get_conversion_choice():
    while True:
        choice = input("What would you like to convert? Enter 'c' for Celsius and 'f' for Fahrenheit: ")
        if choice in ['c', 'f']:
            return choice
        else:
            print("Invalid choice. Please enter 'c' or 'f'.")


try:
    choice = get_conversion_choice()
    if choice.lower() == 'c':
        temp_celsius = get_temperature("Enter temperature in Celsius: ")
        temp_fahrenheit = celsius_to_fahrenheit(temp_celsius)
        print(f"{temp_celsius} Celsius is {temp_fahrenheit} Fahrenheit.")

    elif choice.lower() == 'f':
        temp_fahrenheit = get_temperature("Enter temperature in Fahrenheit: ")
        temp_celsius = fahrenheit_to_celsius(temp_fahrenheit)
        print(f"{temp_fahrenheit} Fahrenheit is {temp_celsius} Celsius.")

except Exception as e:
    print(f"An error occurred: {e}")
