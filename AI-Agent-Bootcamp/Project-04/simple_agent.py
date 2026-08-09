import ast
import operator as op

from ollama import chat

_ALLOWED_OPERATORS = {
    ast.Add: op.add,
    ast.Sub: op.sub,
    ast.Mult: op.mul,
    ast.Div: op.truediv,
    ast.Pow: op.pow,
    ast.Mod: op.mod,
    ast.FloorDiv: op.floordiv,
    ast.USub: op.neg,
    ast.UAdd: op.pos,
}


def _evaluate_node(node):
    if isinstance(node, ast.Constant):
        if isinstance(node.value, (int, float)):
            return node.value
        raise ValueError("Only numeric constants are allowed")

    if isinstance(node, ast.BinOp):
        operator = _ALLOWED_OPERATORS.get(type(node.op))
        if operator is None:
            raise ValueError("Unsupported operator")
        return operator(_evaluate_node(node.left), _evaluate_node(node.right))

    if isinstance(node, ast.UnaryOp):
        operator = _ALLOWED_OPERATORS.get(type(node.op))
        if operator is None:
            raise ValueError("Unsupported unary operator")
        return operator(_evaluate_node(node.operand))

    raise ValueError("Unsupported expression")


def calculator(expression: str):
    parsed = ast.parse(expression, mode="eval")
    return _evaluate_node(parsed.body)


def print_help():
    print("\nCommands:")
    print("  calc <expression>   Evaluate a numeric expression")
    print("  exit                Quit the program")
    print("  help                Show this message")


def main():
    print("Simple agent started. Type 'help' for commands.")

    while True:
        user = input("\nYou: ").strip()
        if not user:
            continue

        command = user.lower()
        if command == "exit":
            break
        if command == "help":
            print_help()
            continue

        if user.startswith("calc "):
            expression = user[5:].strip()
            if not expression:
                print("Calculator: please provide an expression after 'calc'")
                continue
            try:
                result = calculator(expression)
            except (SyntaxError, ValueError, ZeroDivisionError):
                print("Invalid mathematical expression.")
            except Exception as exc:
                print("Calculator error:", exc)
            else:
                print("Calculator:", result)
            continue

        try:
            response = chat(
                model="gemma3:1b",
                messages=[{"role": "user", "content": user}],
            )
        except Exception as exc:
            print("Chat error:", exc)
            continue

        print(response["message"]["content"])


if __name__ == "__main__":
    main()