def get_name():
    while True:
        try:
            name = input("Enter your name: ")
            if not name.strip():
                raise ValueError("Name cannot be empty.")
            return name
        except ValueError as e:
            print(f"Invalid input: {e}")

def get_age():
    while True:
        try:
            age = int(input("Enter your age: "))
            if age < 0:
                raise ValueError("Age cannot be negative.")
            return age
        except ValueError as e:
            print(f"Invalid input: {e}")

name = get_name()
age = get_age()

print(f"Your name is {name} and you are {age} years old.")
