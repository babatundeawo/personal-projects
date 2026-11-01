import random

def treasure_hunt():
    # Step 2: Create Player and Treasure
    player_position = random.randint(1, 10)
    treasure_position = random.randint(1, 10)

    # Step 6: Attempts Counter
    attempts = 0

    # Step 5: Repeat Until Found
    while True:
        # Step 3: User Input
        guess = int(input("Guess the treasure's position (between 1 and 10): "))

        # Increment attempts counter
        attempts += 1

        # Step 4: Check Guess
        if guess == treasure_position:
            print(f"Congratulations! You found the treasure in {attempts} attempts.")
            break
        elif guess < treasure_position:
            print("Too low! Try again.")
        else:
            print("Too high! Try again.")


    # Step 7: Play Again Option
    play_again = input("Do you want to play again? (yes/no): ").lower()
    if play_again == 'yes':
        treasure_hunt()


# Step 8: Comments and Documentation
"""
Simple Treasure Hunt Game in Python

Instructions:
1. The player needs to guess the position of the treasure.
2. Provide feedback on each guess - "Too high!" or "Too low!"
3. Display the number of attempts it took to find the treasure.
4. Optionally, allow the player to play again.

"""

# Step 1: Setting Up
treasure_hunt()
