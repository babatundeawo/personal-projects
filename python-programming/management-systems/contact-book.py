"""
Concepts: Dictionaries, Functions, User Input

Description: In this project, you'll build a simple contact book application where users can store and manage their
contact details. Users can add new contacts, view the list of existing contacts, and remove contacts that are no
longer needed. The contact details are stored using a dictionary, where each contact's name is the key,
and their phone number is the value.

The project allows you to practice using dictionaries, handling user input, and structuring your code with functions.
It demonstrates how data can be stored in key-value pairs and manipulated based on user interaction."""


# Display the contacts
def display_contacts(contacts):
    print("Contacts:")
    for name, number in contacts.items():
        print(f"{name}: {number}")


# Add contacts
def add_contact(contacts, name, number):
    contacts[name] = number
    print(f"Contact {name} added")


# Remove contacts
def remove_contact(contacts, name):
    if name in contacts:
        del contacts[name]
        print(f"Contact {name} has been removed")
    else:
        print(f"Contact {name} not found")


# Initialize an empty dictionary to store contacts
contacts = {}

# Continually prompt user for input
while True:
    print("\nOptions:")
    print("1. View contacts")
    print("2. Add new contact")
    print("3. Remove contact")
    print("4. Quit")

    choice = input("Enter choice: ")

    # Handling user choices
    if choice == '1':
        display_contacts(contacts)
    elif choice == '2':
        name = input("Enter contact name: ").strip().lower()
        number = input("Enter contact number: ").strip()
        add_contact(contacts, name, number)
    elif choice == '3':
        name = input("Enter contact name to remove: ").strip().lower()
        remove_contact(contacts, name)
    elif choice == '4':
        break
    else:
        print("Invalid choice. Please enter 1, 2, 3, or 4")

