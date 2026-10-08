"""
Concepts: Lists, Functions, User Input

Description:
In this project, you'll create a basic command-line to-do list application. Users can interact with the program to manage their tasks by adding new ones, removing completed tasks, or viewing the current list of tasks. The application will run in a loop, allowing continuous interaction until the user decides to quit.

The main concepts you'll practice include list manipulation (adding and removing items), writing and using functions, and capturing user input for various operations. This is an excellent project for understanding the flow of control in a program and the use of functions to modularize code.
"""


# Display the tasks
def display_tasks(tasks):
    print("To-Do List:")
    for task in tasks:
        print(f" - {task}")


# Add task to the tasks
def add_task(tasks, task):
    tasks.append(task)
    print(f"Task '{task}' has been added to the list")


# Remove task from the tasks
def remove_task(tasks, task):
    if task in tasks:
        tasks.remove(task)
        print(f"Task '{task}' has been removed from the list")
    else:
        print(f"Task '{task}' not found in the list")


# Initialize an empty list to store tasks
tasks = []

# Display options for the user
while True:
    # Display options for the user
    print("\nOptions:")
    print("1. View To-Do List")
    print("2. Add task to To-Do List")
    print("3. Remove task from To-Do List")
    print("4. Quit")

    choice = input("Enter your choice: ")

    # Handle user choice
    if choice == '1':
        display_tasks(tasks)
    elif choice == '2':
        task = input("Enter task to add: ").strip().lower()
        add_task(tasks, task)
    elif choice == '3':
        task = input("Enter task to remove: ").strip().lower()
        remove_task(tasks, task)
    elif choice == '4':
        break
    else:
        print("Invalid input. Please enter 1, 2, 3, or 4")

