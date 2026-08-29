try:
    # Try creating the file if it doesn't exist
    with open("todo_list.txt", "x") as txt:
        pass
except FileExistsError:
    print("Welcome back to the To-Do List Application")

# Finally, open the file for reading and load tasks
with open("todo_list.txt", "r") as txt:
    tasklist = [task.strip() for task in txt.readlines()]
tasks = list(tasklist)


def add_to_ToDoList(tasks):
    """Function to add tasks to the To-Do list"""
    while True:
        task = input("Enter Task. Enter 'exit' when done: ").strip().lower()
        if task == 'exit':
            break
        elif task not in tasks:
            tasks.append(task)
            print(f"Task '{task}' has been added")
        else:
            print(f"Task '{task}' is already in the To-Do List")

    # Write the updated tasks back to the file
    with open("todo_list.txt", "w") as ToDoList:
        for task in tasks:
            ToDoList.write(f"{task}\n")


def remove_from_ToDoList(task_number):
    """Function to remove a task from the To-Do list"""
    try:
        task = tasks.pop(task_number - 1)
        print(f"Removed task '{task}'")
    except IndexError:
        print("Invalid task number")
    except ValueError:
        print("Please enter a valid task number.")


# Main loop
while True:
    print("\nCurrent Tasks:")
    if tasks:
        for index, task in enumerate(tasks, 1):
            print(f"{index}. {task}")
    else:
        print("No tasks in the To-Do List.")

    print("\nOptions")
    print("1. Add Task")
    print("2. Remove Task")
    print("3. List Tasks")
    print("4. Exit")

    choice = input("Enter choice (1/2/3/4): ").strip()

    if choice == '1':
        add_to_ToDoList(tasks)

    elif choice == '2':
        try:
            task_number = int(input('Enter task number to remove: '))
            remove_from_ToDoList(task_number)
        except ValueError:
            print("Please enter a valid number.")

    elif choice == '3':
        for index, task in enumerate(tasks, 1):
            print(f"{index}. {task}")

    elif choice == '4':
        print("Exiting System...")
        break

    else:
        print("Invalid Input")
