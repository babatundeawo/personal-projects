from ollama import chat

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

print(response["message"]["content"])