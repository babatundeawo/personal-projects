try:
    # Taking integer input from the user
    num = int(input("Enter a number: "))

    # Check if number is even or odd
    if num % 2 == 0:
        print(f"{num} is even")
    else:
        print(f"{num} is odd")

except ValueError:
    print("Invalid entry")
