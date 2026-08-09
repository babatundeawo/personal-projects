name = input("Enter your name: ")
age = int(input("ERnter your age in years (e.g. 10): "))
fav_subject = input("What is your favorite subject: ")

print("Welcome", name)
if age >= 18:
  print("You are eligible for university admission.")
else:
  print("Keep studying! You're getting there.")

print("===== STUDENT PROFILE =====")
print()
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Favorite Subject: {fav_subject}")
print()
print("===========================")