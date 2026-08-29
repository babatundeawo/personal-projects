import tkinter as tk
import math


# Function to update the expression in the entry field
def press(key):
    current = entry.get()
    entry.delete(0, tk.END)
    entry.insert(0, current + str(key))


# Function to evaluate the expression and show the result
def evaluate():
    try:
        expr = entry.get()

        # Replace ^ with ** for exponentiation (Python uses ** for power)
        expr = expr.replace('^', '**')

        # Handle square root (√) by replacing with math.sqrt
        expr = expr.replace('√', 'math.sqrt')

        # Evaluate the mathematical expression
        result = eval(expr)

        # Show the result and limit the precision to 10 decimal places
        entry.delete(0, tk.END)
        entry.insert(0, f"{result:.10f}")
    except Exception as e:
        entry.delete(0, tk.END)
        entry.insert(0, "Error")


# Function to clear the expression field
def clear():
    entry.delete(0, tk.END)


# Function to handle memory operations
def memory_add():
    global memory
    memory += float(entry.get())
    entry.delete(0, tk.END)
    entry.insert(0, "M+")


def memory_subtract():
    global memory
    memory -= float(entry.get())
    entry.delete(0, tk.END)
    entry.insert(0, "M-")


def memory_recall():
    entry.delete(0, tk.END)
    entry.insert(0, str(memory))


# Function for trigonometric calculations
def sin_func():
    angle = float(entry.get())
    result = math.sin(math.radians(angle))
    entry.delete(0, tk.END)
    entry.insert(0, f"{result:.10f}")


def cos_func():
    angle = float(entry.get())
    result = math.cos(math.radians(angle))
    entry.delete(0, tk.END)
    entry.insert(0, f"{result:.10f}")


def tan_func():
    angle = float(entry.get())
    result = math.tan(math.radians(angle))
    entry.delete(0, tk.END)
    entry.insert(0, f"{result:.10f}")


# Function for logarithmic calculations
def log_func():
    number = float(entry.get())
    if number <= 0:
        entry.delete(0, tk.END)
        entry.insert(0, "Error")
    else:
        result = math.log10(number)
        entry.delete(0, tk.END)
        entry.insert(0, f"{result:.10f}")


def ln_func():
    number = float(entry.get())
    if number <= 0:
        entry.delete(0, tk.END)
        entry.insert(0, "Error")
    else:
        result = math.log(number)
        entry.delete(0, tk.END)
        entry.insert(0, f"{result:.10f}")


# Function for factorial
def factorial_func():
    try:
        number = int(entry.get())
        if number < 0:
            entry.delete(0, tk.END)
            entry.insert(0, "Error")
        else:
            result = math.factorial(number)
            entry.delete(0, tk.END)
            entry.insert(0, f"{result}")
    except ValueError:
        entry.delete(0, tk.END)
        entry.insert(0, "Error")


# Create the main window
root = tk.Tk()
root.title("Enhanced Scientific Calculator")

# Create the display entry field
entry = tk.Entry(root, width=30, borderwidth=5, font=("Arial", 14), justify="right")
entry.grid(row=0, column=0, columnspan=6)

# Initialize memory variable
memory = 0

# Button layout with additional operators
buttons = [
    ('7', 1, 0), ('8', 1, 1), ('9', 1, 2), ('/', 1, 3), ('√', 1, 4), ('sin', 1, 5),
    ('4', 2, 0), ('5', 2, 1), ('6', 2, 2), ('*', 2, 3), ('(', 2, 4), ('cos', 2, 5),
    ('1', 3, 0), ('2', 3, 1), ('3', 3, 2), ('-', 3, 3), (')', 3, 4), ('tan', 3, 5),
    ('0', 4, 0), ('C', 4, 1), ('=', 4, 2), ('+', 4, 3), ('^', 4, 4), ('log', 4, 5),
    ('M+', 5, 0), ('M-', 5, 1), ('MR', 5, 2), ('ln', 5, 3), ('!', 5, 4)
]

# Add buttons to the grid
for (text, row, col) in buttons:
    if text == 'C':
        button = tk.Button(root, text=text, width=10, height=3, font=("Arial", 14), command=clear)
    elif text == '=':
        button = tk.Button(root, text=text, width=10, height=3, font=("Arial", 14), command=evaluate)
    elif text == 'M+':
        button = tk.Button(root, text=text, width=10, height=3, font=("Arial", 14), command=memory_add)
    elif text == 'M-':
        button = tk.Button(root, text=text, width=10, height=3, font=("Arial", 14), command=memory_subtract)
    elif text == 'MR':
        button = tk.Button(root, text=text, width=10, height=3, font=("Arial", 14), command=memory_recall)
    elif text == 'sin':
        button = tk.Button(root, text=text, width=10, height=3, font=("Arial", 14), command=sin_func)
    elif text == 'cos':
        button = tk.Button(root, text=text, width=10, height=3, font=("Arial", 14), command=cos_func)
    elif text == 'tan':
        button = tk.Button(root, text=text, width=10, height=3, font=("Arial", 14), command=tan_func)
    elif text == 'log':
        button = tk.Button(root, text=text, width=10, height=3, font=("Arial", 14), command=log_func)
    elif text == 'ln':
        button = tk.Button(root, text=text, width=10, height=3, font=("Arial", 14), command=ln_func)
    elif text == '!':
        button = tk.Button(root, text=text, width=10, height=3, font=("Arial", 14), command=factorial_func)
    else:
        button = tk.Button(root, text=text, width=10, height=3, font=("Arial", 14), command=lambda key=text: press(key))

    button.grid(row=row, column=col)

# Run the application
root.mainloop()
