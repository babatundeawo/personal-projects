import random

def mystical_word_game():
    # Step 2: Choose a Secret Incantation
    mystical_word = random.choice(["unicorn", "wizard", "fairy", "dragon", "elixir"])

    # Step 3: Wizard's Riddle
    print("Welcome to the Mystical Word Game! Solve the wizard's riddle:")
    print("I am a creature with a single twisted horn. What am I?")

    # Step 6: Scroll of Wisdom
    attempts = 0

    # Step 5: Repeat Until Unraveled
    while True:
        # Step 4: User Incantation
        guess = input("Cast your magical guess: ").lower()

        # Increment attempts counter
        attempts += 1

        # Step 5: Check the Spell
        if guess == mystical_word:
            print(f"Congratulations! You've unraveled the magic word '{mystical_word}' in {attempts} attempts.")
            break
        else:
            print("Your spell is close, but the word is hidden deeper in the forest!")


    # Step 7: Begin a New Quest
    play_again = input("Do you wish to embark on another mystical journey? (yes/no): ").lower()
    if play_again == 'yes':
        mystical_word_game()


# Step 8: Begin the Mystical Quest
mystical_word_game()

# Step 9: Whispers of Magic in Comments
"""
Mystical Word Guessing Game in Python

Instructions:
1. Guess the mystical word based on a wizard's riddle.
2. Provide mystical clues for incorrect guesses.
3. Record the number of attempts in a Scroll of Wisdom.
4. Optionally, allow the player to choose the category of the mystical word.

"""
