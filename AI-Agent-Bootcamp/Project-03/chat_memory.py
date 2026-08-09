from ollama import chat

messages = []

print("=" * 40)
print("AI Chat with Memory")
print("=" * 40)

while True:
    question = input("\nYou: ")
    normalized = question.strip().lower()

    if normalized in {"exit", "quit"}:
        break

    if normalized == "clear":
        messages = []
        print("Conversation cleared.")
        continue

    if normalized == "history":
        print("\n----- HISTORY -----")
        for message in messages:
            print(message["role"].upper())
            print(message["content"])
            print()
        continue

    messages.append({"role": "user", "content": question})

    response = chat(model="gemma3:1b", messages=messages)
    answer = response["message"]["content"]

    print("\nAI:", answer)

    messages.append({"role": "assistant", "content": answer})
    print(f"\nConversation Length: {len(messages)} messages")
