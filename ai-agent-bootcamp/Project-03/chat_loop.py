from ollama import chat

print("=" * 30)
print("      AI CHATBOT")
print("=" * 30)

while True:
    question = input("\nYou: ")

    if question.lower() == "exit" or question.lower() == "quit":
        print("Goodbye!")
        break

    response = chat(
        model="gemma3:1b",
        messages=[
            {
                "role": "user",
                "content": question
            }
        ]
    )

    print("\nAI:")
    print(response["message"]["content"])
