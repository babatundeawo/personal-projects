from ollama import chat
from tools import calculator


# ==========================================
# LLM DECISION PROMPT
# ==========================================

decision_prompt = """
You are the decision maker for an AI agent.

Your job is to determine what the user wants.

You have two possible decisions.

1. CALCULATE

Choose CALCULATE if the user is asking you to perform
a mathematical calculation.

Examples:

"What is 45 * 12?"
CALCULATE

"Calculate 100 / 4"
CALCULATE

"What is 25 + 75?"
CALCULATE


2. ANSWER

Choose ANSWER for everything else.

Examples:

"Tell me a joke."
ANSWER

"What is the capital of Nigeria?"
ANSWER

"Give me five reasons to learn AI."
ANSWER


IMPORTANT:

Return ONLY ONE word.

Either:

CALCULATE

or:

ANSWER

Do not explain your decision.
Do not include anything else.
"""


# ==========================================
# AGENT LOOP
# ==========================================

while True:

    # Get user input
    user_question = input("\nYou: ")


    # Check for exit
    if user_question.lower() == "exit":

        print("Goodbye!")

        break


    # ==========================================
    # STEP 1 — ASK LLM FOR INTENT
    # ==========================================

    decision_response = chat(
        model="gemma3:1b",
        messages=[
            {
                "role": "system",
                "content": decision_prompt
            },
            {
                "role": "user",
                "content": user_question
            }
        ]
    )


    # Get the decision
    decision = decision_response["message"]["content"].strip().upper()


    print("\nLLM decision:")
    print(decision)


    # ==========================================
    # STEP 2 — CALCULATE
    # ==========================================

    if decision == "CALCULATE":

        print("\nThe agent decided to use the calculator.")


        # Ask LLM to extract ONLY the expression
        expression_response = chat(
            model="gemma3:1b",
            messages=[
                {
                    "role": "system",
                    "content": """
Extract the mathematical expression from the user's question.

Return ONLY the mathematical expression.

Examples:

User:
What is 45 * 12?

Return:
45 * 12


User:
Calculate 100 / 4

Return:
100 / 4


Do not calculate the answer.
Do not explain anything.
Return only the expression.
"""
                },
                {
                    "role": "user",
                    "content": user_question
                }
            ]
        )


        expression = expression_response["message"]["content"].strip()


        print("Expression:", expression)


        # ==========================================
        # STEP 3 — RUN CALCULATOR
        # ==========================================

        result = calculator(expression)


        print("Calculator result:", result)


        # ==========================================
        # STEP 4 — ASK LLM FOR FINAL RESPONSE
        # ==========================================

        final_response = chat(
            model="gemma3:1b",
            messages=[
                {
                    "role": "system",
                    "content": """
Give the user a short, clear final answer.

The calculation has already been performed.

Do not perform another calculation.
Use the calculator result provided.
"""
                },
                {
                    "role": "user",
                    "content": f"""
User question:

{user_question}

Calculator result:

{result}
"""
                }
            ]
        )


        print("\nAgent:")
        print(final_response["message"]["content"])


    # ==========================================
    # STEP 5 — NORMAL ANSWER
    # ==========================================

    elif decision == "ANSWER":

        response = chat(
            model="gemma3:1b",
            messages=[
                {
                    "role": "user",
                    "content": user_question
                }
            ]
        )


        print("\nAgent:")
        print(response["message"]["content"])


    # ==========================================
    # INVALID DECISION
    # ==========================================

    else:

        print("\nAgent error.")
        print("The LLM returned an invalid decision.")