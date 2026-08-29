# Initialize an empty dictionary to store candidates and their vote counts
candidates = {}

while True:
    print("\nOptions")
    print("1. Add Candidate")
    print("2. Remove Candidate")
    print("3. Vote")
    print("4. List Candidates")
    print("5. End Voting")

    choice = input("Enter choice (1/2/3/4/5): ")

    if choice == '1':
        name = input("Enter Candidate Name: ").strip().lower()
        if name in candidates:
            print(f"Candidate '{name}' already exists.")
        else:
            candidates[name] = 0
            print(f"Candidate '{name}' has been added.")

    elif choice == '2':
        name = input("Enter Candidate Name: ").strip().lower()
        if name in candidates:
            candidates.pop(name)
            print(f"Candidate '{name}' has been removed.")
        else:
            print(f"Candidate '{name}' not found.")

    elif choice == '3':
        name = input("Enter Candidate Name: ").strip().lower()
        if name in candidates:
            candidates[name] += 1
            print(f"Vote recorded for '{name}'.")
        else:
            print(f"Candidate '{name}' not found. Vote not counted.")

    elif choice == '4':
        if candidates:
            print("\nCandidates and their votes:")
            for candidate, votes in candidates.items():
                print(f"{candidate.capitalize()}: {votes} votes")
        else:
            print("No candidates available.")

    elif choice == '5':
        if candidates:
            maximum = max(candidates.values())
            winners = [candidate for candidate, votes in candidates.items() if votes == maximum]
            winners_str = ", ".join(winners)
            print(f"The winner(s): {winners_str.capitalize()} with {maximum} votes!")
        else:
            print("No candidates to determine a winner.")
        break

    else:
        print("Invalid Input. Please try again.")
