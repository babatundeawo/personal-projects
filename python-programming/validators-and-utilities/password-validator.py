"""
Concepts: String Functions, Conditional Statements

Description: Validate a password based on certain criteria.
"""


def validate_password(password):
    if len(password) < 8:
        return "Password must be at least 8 characters long"
    elif not any(char.isdigit() for char in password):
        return "Password must contain at least one digit"
    elif not any(char.isupper() for char in password):
        return "Password must contain at least one uppercase letter"
    elif not any(char.islower() for char in password):
        return "Password must contain at least one lowercase letter"
    else:
        return "Password is valid"


while True:
    password = input("Enter a password: ")
    validation_result = validate_password(password)
    print(validation_result)
    if validation_result == "Password is valid":
        break
