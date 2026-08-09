from ollama import chat

question = input("Ask me anything: ")

response = chat(
    model="gemma3:1b",
    messages=[
        {
            "role": "user",
            "content": question
        }
    ]
)

print()
print("AI:")
print(response["message"]["content"])
