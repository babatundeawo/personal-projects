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


# Get the user's question
user_question = input("You: ")


# Ask the LLM what it wants to do
response = chat(
    model="gemma3:1b",
    messages=[
        {
            "role": "system",
            "content": tool_description
        },
        {
            "role": "user",
            "content": user_question
        }
    ]
)


# Get the LLM's response
tool_request = response["message"]["content"]


print("\nLLM said:")
print(tool_request)


# Check whether the LLM requested the calculator
if "calculator(" in tool_request:

    print("\nThe LLM wants to use the calculator.")

    # Find the expression inside calculator(...)
    start = tool_request.find("calculator(") + len("calculator(")
    end = tool_request.find(")", start)

    if end != -1:

        expression = tool_request[start:end].strip()

        print("Expression:", expression)

        # Run the calculator
        result = calculator(expression)

        print("Calculator result:", result)


        # Send the result back to the LLM
        final_response = chat(
            model="gemma3:1b",
            messages=[
                {
                    "role": "system",
                    "content": "Give the user a clear final answer using the tool result."
                },
                {
                    "role": "user",
                    "content": f"The calculator returned {result}. The original user question was: {user_question}"
                }
            ]
        )


        # Display the final answer
        print("\nFinal answer:")
        print(final_response["message"]["content"])

    else:

        print("Could not find the end of the calculator request.")

else:

    print("\nThe LLM did not request a tool.")