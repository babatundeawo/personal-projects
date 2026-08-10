from ollama import chat
from tools import calculator


# Tell the LLM what tool is available
tool_description = """
You have access to a calculator tool.

Tool name:
calculator

Purpose:
Perform mathematical calculations.

When the user asks a mathematical question, do NOT calculate the answer yourself.

Instead, respond using ONLY this format:

calculator(expression)

Example:

calculator(45*12)
"""


# Send the request to the LLM
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


# Get the LLM's text response
tool_request = response["message"]["content"]


print("LLM said:")
print(tool_request)


# Check whether the LLM requested the calculator
if "calculator(" in tool_request:

    print("\nThe LLM wants to use the calculator.")

    start = tool_request.find("calculator(") + len("calculator(")
    end = tool_request.find(")", start)

    if end != -1:

        expression = tool_request[start:end].strip()

        print("Expression:", expression)

        result = calculator(expression)

        print("Calculator result:", result)

        final_response = chat(
            model="gemma3:1b",
            messages=[
                {
                    "role": "system",
                    "content": "Give the user a clear final answer using the tool result."
                },
                {
                    "role": "user",
                    "content": f"The calculator returned {result}. The original question was: What is 45*12?"
                }
            ]
        )

        print("\nFinal answer:")
        print(final_response["message"]["content"])

    else:

        print("Could not find the end of the calculator request.")

else:

    print("\nThe LLM did not request a tool.")