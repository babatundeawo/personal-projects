# Define a list of contacts with tuples containing names and ages
contacts = [
    ('James', 42),
    ('Amy', 24),
    ('John', 31),
    ('Amanda', 63),
    ('Bob', 18)
]

# Prompt the user to enter a name
name = input("Enter a name: ")

# Initialize a flag to keep track of whether the name is found or not
found = False

# Iterate through the contacts list to find the matching name
for contact_name, age in contacts:
    if contact_name == name:  # Check if the current contact name matches the input name
        print(f"{name} is {age}")  # Print the name and corresponding age
        found = True  # Set the flag to True indicating the name is found
        break  # Exit the loop since the name is found

# If the name is not found, print a message indicating so
if not found:
    print(f"{name} not found")
