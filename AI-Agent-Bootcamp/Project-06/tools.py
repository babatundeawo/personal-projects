def calculator(expression):
    try:
        return eval(expression)
    except Exception:
        return "Invalid mathematical expression."


print(calculator("45*12"))
print(calculator("100/4"))
print(calculator("25+75"))