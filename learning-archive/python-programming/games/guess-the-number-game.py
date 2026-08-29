"""
This project teaches how to use variables, user inputs, if-else statements, loops, and functions.

Goal: The computer randomly selects a number between 1 and 100, and the user has to guess it. The program will guide the user by indicating whether their guess is too high, too low, or correct.
"""

import random


def guess_number():
    number_to_guess = random.randint(1, 100)
    attempts = 0
    guess = None

    print("Welcome to 'Guess the Number'")
    print("I have selected a number between 1 and 100. can you guess it?")

    while guess != number_to_guess:
        try:
            guess = int(input("Enter your guess: "))
            attempts += 1

            if guess < number_to_guess:
                print("Too low! Try again.")
            elif guess > number_to_guess:
                print("Too high! Try again.")
        except ValueError:
            print("Invalid input. Please enter a number between 1 and 100.")

    print(f"Congratulations! You guessed the number in {attempts} attempts.")


# Run the game
guess_number()

"""
Explanation:
Import the random module to generate a random number.
Define the guess_number function that contains the game logic.
Use random.randint(1, 100) to generate a random number between 1 and 100.
Use a while loop to keep asking the user for their guess until they guess correctly.
Guide the user by indicating whether their guess is too low or too high.
Congratulate the user when they guess correctly and display the number of attempts.
"""