from datetime import datetime


class Task:
    def __init__(self, description, deadline):
        """Initialize a task with a description and deadline."""
        try:
            self.description = description
            self.deadline = datetime.strptime(deadline, "%Y-%m-%d")
        except ValueError:
            print("Incorrect date format. Please use YYYY-MM-DD.")
            raise

    def display_info(self):
        """Display task description and deadline."""
        print(f"Task: {self.description}, Deadline: {self.deadline.date()}")


class ToDoList:
    def __init__(self):
        """Initialize an empty to-do list."""
        self.tasks = []

    def add_task(self, task):
        """Add a task to the to-do list."""
        self.tasks.append(task)
        print(f"Task '{task.description}' with deadline {task.deadline.date()} has been added.")

    def remove_task(self, keyword):
        """Remove a task from the list by keyword in its description."""
        removed = False
        for task in self.tasks:
            if keyword.lower() in task.description.lower():
                self.tasks.remove(task)
                print(f"Removed task '{task.description}'.")
                removed = True
                break
        if not removed:
            print(f"No task with keyword '{keyword}' found.")

    def list_tasks(self):
        """List all tasks in the to-do list."""
        if not self.tasks:
            print("\nTo-Do List is empty.")
        else:
            print("\nTo-Do List:")
            for task in self.tasks:
                task.display_info()


# Main program loop
todo_list = ToDoList()

while True:
    print("\nOptions:")
    print("1. Add task")
    print("2. Remove task")
    print("3. List tasks")
    print("4. Exit")

    choice = input("Enter choice (1/2/3/4): ")

    if choice == '1':
        description = input("Enter task description: ")
        deadline = input("Enter task deadline (YYYY-MM-DD): ")
        try:
            task = Task(description, deadline)
            todo_list.add_task(task)
        except ValueError:
            print("Task not added due to invalid date format.")
    elif choice == '2':
        keyword = input("Enter a keyword to search for task to remove: ")
        todo_list.remove_task(keyword)
    elif choice == '3':
        todo_list.list_tasks()
    elif choice == '4':
        print("Exiting To-Do List.")
        break
    else:
        print("Invalid input. Please choose a valid option (1/2/3/4).")
