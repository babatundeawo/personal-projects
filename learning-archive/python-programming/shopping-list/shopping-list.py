"""
Concepts: Lists, Functions, User Input
Description: Manage a shopping list with options to add, remove, and view items.
"""

# Initialize total cost and shopping completion status
total_cost = 0
end_shopping = False

# List all the grocery items and their prices
grocery_items = ['apples', 'bananas']
grocery_prices = [2.99, 1.99]

# Welcome message and display the items
print("Welcome to the grocery store")
print("Here are the items in stock")
for i in range(len(grocery_items)):
    print(f"{grocery_items[i]} = ${grocery_prices[i]}")

# Ask if user wants to buy anything
user_response = input("Would you like to buy anything? (yes/no): ").strip().lower()
if user_response == 'yes':
    print("\nProceed into the store")

    # Function to handle purchase of items
    def buy_items(item, price):
        global total_cost
        total_cost += price
        print(f"You have bought {item}")
        index = grocery_items.index(item)
        grocery_items.pop(index)
        grocery_prices.pop(index)

    # Ask if the user wants to buy apples
    if 'apples' in grocery_items:
        user_response = input("Would you like to buy apples for $2.99? (yes/no): ").strip().lower()
        if user_response == 'yes':
            buy_items('apples', 2.99)

    # Ask if the user wants to buy bananas
    if 'bananas' in grocery_items:
        user_response = input("Would you like to buy bananas for $1.99? (yes/no): ").strip().lower()
        if user_response == 'yes':
            buy_items('bananas', 1.99)

    # Proceed to checkout
    print("Proceed to checkout")
    end_shopping = True

elif user_response == 'no':
    print("Have a good day")
else:
    print("Invalid input. Please enter 'yes' or 'no'.")

# Display checkout summary if purchases were made
if end_shopping:
    if total_cost == 0:
        print("You have bought nothing")
    else:
        print(f"Your total is ${total_cost:.2f}")
    print("Thanks for shopping with us")
