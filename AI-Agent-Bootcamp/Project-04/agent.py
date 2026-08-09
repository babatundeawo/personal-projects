from ollama import chat
from tools import calculator
from brain import needs_calculator


calculator_count = 0
chat_count = 0


while True:

    question = input("\nYou: ")

    if question.lower() == "exit":
        print("\nTool Usage")
        print("Calculator:", calculator_count)
        print("AI Chat:", chat_count)
        break

    if needs_calculator(question):

        calculator_count += 1

        print("\n🤖 Agent Decision:")
        print("This looks like a mathematical question.")
        print("Using Calculator Tool...")

        expression = (
            question
            .replace("What is", "")
            .replace("what is", "")
            .replace("?", "")
            .strip()
        )

        answer = calculator(expression)

        print("Answer:", answer)

    else:

        chat_count += 1

        response = chat(
            model="gemma3:1b",
            messages=[
                {
                    "role": "user",
                    "content": question
                }
            ]
        )

        print(response["message"]["content"])