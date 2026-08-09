def needs_calculator(question):

    operators = ["+", "-", "*", "/", "%"]

    math_words = [
        "plus",
        "minus",
        "multiplied",
        "times",
        "divided",
        "percent",
    ]

    question = question.lower()

    for operator in operators:
        if operator in question:
            return True

    for word in math_words:
        if word in question:
            return True

    return False