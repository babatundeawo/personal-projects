"""
This program simulates a simple banking system where a BankAccount class manages an account holder's balance and tracks transactions such as deposits and withdrawals. The program is designed using Object-Oriented Programming (OOP) concepts, including classes, methods, and lists.
"""

class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.transactions = []

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            self.transactions.append(f"Deposited {amount}")
            print(f"Deposited {amount}. New balance: {self.balance}")
        else:
            print("Deposit amount must be positive")

    def withdraw(self, amount):
        if amount > 0:
            if self.balance >= amount:
                self.balance -= amount
                self.transactions.append(f"Withdrew {amount}")
                print(f"Withdrew {amount}. New balance: {self.balance}")
            else:
                print("Insufficient funds")
        else:
            print("Withdrawal amount must be positive")

    def display_balance(self):
        print(f"Account owner: {self.owner}, Balance: {self.balance}")

    def display_transaction(self):
        print(f"Transaction history for {self.owner}")
        for transaction in self.transactions:
           print(transaction)


# Interactive usage
owner_name = input("Enter account owner's name: ")
initial_balance = float(input(f"Enter initial balance for {owner_name}: "))
account = BankAccount(owner_name, initial_balance)

while True:
    print("\nOptions:")
    print("1. Deposit money")
    print("2. Withdraw money")
    print("3. Display balance")
    print("4. Display transactions")
    print("5. Quit interactive banking")

    choice = input("Choose an option: ")

    if choice == '1':
        amount = float(input("Enter amount to deposit: "))
        account.deposit(amount)
    elif choice == '2':
        amount = float(input("Enter amount to wihdraw: "))
        account.withdraw(amount)
    elif choice == '3':
        account.display_balance()
    elif choice == '4':
        account.display_transaction()
    elif choice == '5':
        print("Goodbye!")
        break
    else:
        print("Invalid input! Please try again.")