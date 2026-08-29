# Election Management Program

# Dictionary to store candidate names and their corresponding votes
election = {}

def add_candidate(name, votes):
    """Add a candidate to the election with their initial vote count."""
    # Convert votes to an integer for accurate calculations
    election[name] = int(votes)
    print(f"Candidate {name} is now running in the election.")

def update_votes(name, votes):
    """Update the votes for an existing candidate."""
    # Check if the candidate exists in the election dictionary
    if name in election:
        # Update the vote count, converting votes to an integer
        election[name] = int(votes)
        print(f"Candidate {name} updated.")
        print(f"New vote count: {votes}")
    else:
        print(f"Candidate {name} does not exist.")

def prediction():
    """Predict the outcome of the election based on current votes."""
    if not election:  # Check if there are no candidates
        print("No candidates currently running.")
        return

    # Calculate the total number of votes
    total_votes = sum(election.values())
    print(f"There are a total of {total_votes} votes in this election.")

    # Determine the candidate with the highest votes
    winner = max(election, key=election.get)
    print(f"Candidate {winner} will win the election with a total of {election[winner]} votes.")

# Main loop for user interaction
while True:
    print("\nOptions")
    print("1. Add a Candidate")
    print("2. Update Votes")
    print("3. See prediction")
    print("4. Exit")

    choice = input("Enter a choice between (1/2/3/4): ")

    if choice == '1':
        name = input("Enter the name of your candidate: ")
        votes = input("Enter the number of votes they currently have: ")
        add_candidate(name, votes)
    elif choice == '2':
        name = input("Enter the name of your candidate: ")
        votes = input("Enter the number of votes they now have: ")
        update_votes(name, votes)
    elif choice == '3':
        prediction()
    elif choice == '4':
        print("Goodbye!")
        break
    else:
        print("Invalid Input. Please choose a valid option.")
