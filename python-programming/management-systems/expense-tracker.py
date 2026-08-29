class Expense:
    def __init__(self, name, amount, category):
        self.name = name.strip().capitalize()
        self.amount = float(amount)
        self.category = category.strip().capitalize()

    def display_info(self):
        print(f"Expense: {self.name}, Amount: {self.amount}, Category: {self.category}")

class ExpenseTracker:
    def __init__(self):
        self.expenses = []

    def add_expense(self, expense):
        self.expenses.append(expense)
        print(f"Added expense {expense.name}")

    def remove_expense(self, name):
        name = name.strip().capitalize()
        for expense in self.expenses:
            if expense.name == name:
                self.expenses.remove(expense)
                print(f"Removed expense {name}")
                return
        print(f"Expense {name} not found")

    def list_expenses(self):
        print("Expenses:")
        for expense in self.expenses:
            expense.display_info()

# Interactive section
tracker = ExpenseTracker()

while True:
    print("\nOptions: 1. Add Expense  2. Remove Expense  3. List Expenses  4. Exit")
    choice = input("Choose an option (1/2/3/4): ").strip()

    if choice == '1':
        name = input("Enter expense name: ")
        amount = input("Enter expense amount: ")
        category = input("Enter expense category: ")
        expense = Expense(name, amount, category)
        tracker.add_expense(expense)

    elif choice == '2':
        name = input("Enter the name of the expense to remove: ")
        tracker.remove_expense(name)

    elif choice == '3':
        tracker.list_expenses()

    elif choice == '4':
        print("Exiting the tracker.")
        break

    else:
        print("Invalid option. Please try again.")
