from datetime import datetime

# Prompt for currency symbol at the beginning
currency = input("Enter Currency symbol (e.g., $, ₦): ").strip()

# Create the file if it doesn't exist
try:
    with open("expensetracker.txt", "x") as txt:
        pass
except FileExistsError:
    print("Welcome back to the Expense Tracker")

# Load existing expenses from the file
with open("expensetracker.txt", "r") as txt:
    expenselist = txt.readlines()

expenses = [expense.strip() for expense in expenselist]


def add_expense():
    """Function to add an expense to the list and file."""
    try:
        expense_description = input("Enter expense description: ").strip()
        price = float(input("Enter expense amount: "))
        current_time = datetime.now()

        # Format and append the new expense
        expense_entry = f'{current_time.strftime("%Y-%m-%d")} {expense_description} {currency}{price:.2f}'
        expenses.append(expense_entry)

        # Append the expense to the file
        with open("expensetracker.txt", "a") as expensetracker:
            expensetracker.write(expense_entry + "\n")

        print(f"Expense '{expense_description}' of {currency}{price:.2f} added successfully.")

    except ValueError:
        print("Invalid input. Please enter a valid number for the price.")


def remove_expense():
    """Function to remove an expense by its index."""
    try:
        # Check if there are any expenses to remove
        if not expenses:
            print("No expenses to remove.")
            return

        # Display all expenses with numbering
        for i, expense in enumerate(expenses, 1):
            print(f"{i}. {expense}")

        expense_number = int(input("Enter the number of the expense to remove: "))

        if 1 <= expense_number <= len(expenses):
            removed_expense = expenses.pop(expense_number - 1)
            print(f"Expense '{removed_expense}' has been removed.")

            # Write the updated list back to the file
            with open("expensetracker.txt", "w") as file:
                for expense in expenses:
                    file.write(expense + "\n")
        else:
            print("Invalid expense number.")

    except ValueError:
        print("Invalid input. Please enter a number.")


def show_monthly_report():
    """Function to display all expenses for the current month."""
    current_month = datetime.now()
    print(f"\n{current_month.strftime('%B')} Report:")

    # Filter and display expenses for the current month
    month_expenses = [
        expense for expense in expenses
        if expense.startswith(current_month.strftime('%Y-%m'))
    ]

    if month_expenses:
        for expense in month_expenses:
            print(expense)
    else:
        print(f"No expenses recorded for {current_month.strftime('%B')}.")


# Main program loop
while True:
    print("\nCurrent Expenses:")
    if expenses:
        for i, expense in enumerate(expenses, 1):
            print(f"{i}. {expense}")
    else:
        print("No expenses recorded yet.")

    # Menu options
    print("\nOptions:")
    print("1. Add Expense")
    print("2. Remove Expense")
    print("3. Monthly Report")
    print("4. Exit")

    choice = input("Enter your choice (1/2/3/4): ").strip()

    if choice == '1':
        add_expense()

    elif choice == '2':
        remove_expense()

    elif choice == '3':
        show_monthly_report()

    elif choice == '4':
        print("Exiting system... Goodbye!")
        break

    else:
        print("Invalid input. Please choose a valid option (1/2/3/4).")
