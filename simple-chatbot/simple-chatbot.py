"""
We're going to build a simple chatbot that can respond to greetings like "hello," "hi," or "hey." This chatbot will understand these words and give a friendly response back. Let's start by making the chatbot understand what to say when it hears these greetings
"""


def respond_to_greeting(greeting):
    if "hello" in greeting.lower():
        return "Hello! How can I help you today?"
    elif "hi" in greeting.lower():
        return "Hi there! What can i do for you?"
    elif "hey" in greeting.lower():
        return "Hey! How's it going?"
    else:
        return "Hello! I didn't catch that. Could you please repeat?"


while True:
    user_input = input("You: ")

    if any(word in user_input for word in ["exit", "bye", "quit"]):
        print("Chatbot: Goodbye!")
        break

    response = respond_to_greeting(user_input)
    print(f"Chatbot: {response}")
