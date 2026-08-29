import random
secret_number = random.randint(1, 100)
your_guess = 0
attempts = 0

while your_guess != secret_number:
    your_guess = int(input("Guess the correct number between 0 and 100: "))
    attempts += 1
    if your_guess > secret_number:
        print("Too high, guess lower")
    if your_guess < secret_number:
        print("Too low, guess higher")

print(f"You guessed right in {attempts} attempts")
if attempts == 1:
    print("You are a genius")

