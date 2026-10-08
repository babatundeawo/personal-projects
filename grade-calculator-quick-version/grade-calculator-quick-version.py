try:
    # Taking input from the user
    score = int(input("Enter a score between 0 and 100: "))

    # Checking if score is within the valid range
    if 0 <= score <= 100:
        # Determining the grade based on score
        if 90 <= score <= 100:
            grade = "A"
        elif 80 <= score <= 89:
            grade = "B"
        elif 70 <= score <= 79:
            grade = "C"
        elif 60 <= score <= 69:
            grade = "D"
        else:
            grade = "F"

        # Printing the corresponding grade
        print(f"The grade for a score of {score} is {grade}")
    else:
        print("invalid entry. Enter a score between 0 and 100")
except ValueError:
    print("Invalid entry. Please enter a numeric value.")