def calculator(expression):
    try:
        expression = expression.replace("\\", "")
        return eval(expression)
    except Exception:
        return "Invalid mathematical expression."


def looks_like_math(text):
    operators = ["+", "-", "*", "/"]

    has_operator = any(operator in text for operator in operators)

    has_number = any(character.isdigit() for character in text)

    return has_operator and has_number