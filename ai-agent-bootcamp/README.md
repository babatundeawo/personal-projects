# AI Agent Bootcamp

A self-paced series of Python exercises, building up from first principles
to a working AI agent: plain scripting → talking to a local LLM → giving
that LLM memory → giving it tools → letting it decide when to use them.
Each `Project-0N/` folder is one step in that progression. This is
in-progress work, referenced from the main [Projects page](../projects.html)
as **Build-004 · In Progress**, and kept separate from the three shipped
builds in the root of the repo.

**Requirements:** Python 3, and for `Project-02` onward, [Ollama](https://ollama.com)
running locally with the `gemma3:1b` model pulled (`ollama pull gemma3:1b`) —
these scripts talk to Ollama's local API via the `ollama` Python package
(`pip install ollama`).

## Tasks

- **[Project-00 — Python fundamentals](./Project-00)**
  Warm-up exercises with no AI involved yet: variables, `input()`, and
  conditionals.
  - [`hello.py`](./Project-00/hello.py) — basic `print()` output
  - [`variables.py`](./Project-00/variables.py) — declaring and printing variables
  - [`user_input.py`](./Project-00/user_input.py) — reading input and greeting the user
  - [`even_odd.py`](./Project-00/even_odd.py) — even/odd check with the modulo operator
  - [`age_checker.py`](./Project-00/age_checker.py) — adult/minor check from user input
  - [`password.py`](./Project-00/password.py) — simple hardcoded-password gate
  - [`student_card.py`](./Project-00/student_card.py) — collects several inputs and prints a formatted card

- **[Project-01 — Student assistant](./Project-01/student_assistant.py)**
  First mini-program: collects a name, age and favourite subject, then
  branches on age (university-eligible or not) and prints a formatted
  profile — combining everything from Project-00 into one script.

- **[Project-02 — First AI chat](./Project-02/ai_chat.py)**
  The first script that actually talks to an LLM: sends a single question
  to a local `gemma3:1b` model via Ollama's `chat()` call and prints the
  reply.

- **[Project-03 — Chat loop + memory](./Project-03)**
  Turns the one-shot chat into a real chatbot.
  - [`chat_loop.py`](./Project-03/chat_loop.py) — a `while True` loop that keeps
    chatting until the user types "exit"/"quit"
  - [`chat_memory.py`](./Project-03/chat_memory.py) — the same loop, but now
    appends every message to a running `messages` list so the model has
    conversation history/context, not just the latest question

- **[Project-04 — A calculator tool](./Project-04)**
  Introduces the idea of a "tool" the agent can call, separate from the
  chat itself.
  - [`calculator_tool.py`](./Project-04/calculator_tool.py) — a standalone
    `calculator(expression)` function
  - [`test.py`](./Project-04/test.py) — exercises the tool with valid and
    invalid expressions (including divide-by-nothing and non-numeric input)
  - [`old/`](./Project-04/old) — earlier drafts kept for reference, including
    a safer AST-based calculator (`simple_agent.py`) that only allows
    arithmetic operators instead of raw `eval()`

- **[Project-05 — Deciding when to use the tool](./Project-05)**
  The agent now has to *decide* whether a question needs the calculator
  or just a normal chat reply.
  - [`brain.py`](./Project-05/brain.py) — `needs_calculator(question)`, a
    keyword/operator heuristic that flags math questions
  - [`tools.py`](./Project-05/tools.py) — the calculator, now with a
    try/except guard instead of a bare `eval()`
  - [`agent.py`](./Project-05/agent.py) — the chat loop wired up to `brain.py`
    and `tools.py`, counting how often each path (calculator vs. chat) is used
  - [`brain_test.py`](./Project-05/brain_test.py) — quick sanity checks for
    `needs_calculator()` against math and non-math questions

- **[Project-06 — LLM-driven decisions](./Project-06)**
  Replaces the keyword heuristic from Project-05 with the LLM itself
  deciding what the user wants.
  - [`agent.py`](./Project-06/agent.py) — prompts the model with a
    decision prompt to classify the request before routing it
  - [`tools.py`](./Project-06/tools.py) — the calculator tool plus a
    `looks_like_math(text)` helper

More tasks will be added here as the bootcamp continues.
