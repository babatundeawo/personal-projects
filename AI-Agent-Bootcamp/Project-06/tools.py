def calculator(expression):
    try:
        expression = expression.replace("\\", "")
        return eval(expression)
    except Exception:
        return "Invalid mathematical expression."
