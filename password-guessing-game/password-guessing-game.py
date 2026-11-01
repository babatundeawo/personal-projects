password = "age"
password_hint = "What goes up but never comes down?"
guess = ""
attempts = 0

while guess != password:
    if attempts >= 3:
        print(password_hint)
    guess = input("Guess the password: ")
    attempts = attempts + 1


print("You are logged in...")
