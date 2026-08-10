from ollama import chat
from tools import calculator


tool_description = """
You have access to a calculator tool.

Tool name:
calculator

Purpose:
Perform mathematical calculations.

Input:
A mathematical expression.

IMPORTANT:
When the user's question requires a calculation, DO NOT calculate the answer yourself.

Instead, respond using exactly this format:

TOOL: calculator
EXPRESSION: the mathematical expression

Example:

TOOL: calculator
EXPRESSION: 45*12
"""


response = chat(
    model="gemma3:1b",
    messages=[
        {
            "role": "system",
            "content": tool_description
        },
        {
            "role": "user",
            "content": "What is 45*12?"
        }
    ]
)


tool_request = response["message"]["content"]

print("LLM said:")
print(tool_request)


# Check whether the LLM requested the calculator
if "TOOL: calculator" in tool_request:

    print("\nThe LLM wants to use the calculator.")

    # Find the expression
    expression_line = None

    for line in tool_request.splitlines():

        if line.upper().startswith(("EXPRESSION:", "EXPRESION:")):

            expression_line = line.split(":", 1)[1].strip()

    if expression_line:

        print("Expression:", expression_line)

        result = calculator(expression_line)

        print("Calculator result:", result)

    else:

        print("Could not find the expression.")

else:

    print("\nThe LLM did not request a tool.")