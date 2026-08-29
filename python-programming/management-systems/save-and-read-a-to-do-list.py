class ToDoList:
    def __init__(self, filename='todo_list.txt'):
        self.filename = filename

    def add_task(self, task):
        with open(self.filename, 'a') as file:
            file.write(task + '\n')  # Ensure each task is on a new line
            print(f"Task '{task}' added successfully.")

    def display_tasks(self):
        try:
            with open(self.filename, 'r') as file:
                tasks = file.readlines()
                if tasks:
                    print("\nYour tasks:")
                    for i, task in enumerate(tasks, start=1):
                        print(f"{i}. {task.strip()}")
                else:
                    print("No tasks found.")
        except FileNotFoundError:
            print("No tasks found. Please add some tasks first.")


def main():
    todo_list = ToDoList()

    while True:
        task = input("Enter a task (or type 'exit' to quit): ")
        if task.lower() == 'exit':
            break
        todo_list.add_task(task)

    todo_list.display_tasks()


if __name__ == "__main__":
    main()
