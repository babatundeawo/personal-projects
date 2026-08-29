class Workout:
    def __init__(self, name, hours, calories):
        self.name = name
        self.hours = hours
        self.calories = calories

    def display(self):
        print(f"Workout: {self.name}")
        print(f"Calories Burned: {self.calories}")
        print(f"Duration: {self.hours} Hours")


class WorkoutManager:
    def __init__(self):
        self.workouts = []

    def add_workout(self, name, calories, hours):
        workout = Workout(name, hours, calories)
        self.workouts.append(workout)
        print(f"Workout '{name}' added successfully.")

    def remove_workout(self, name):
        for i, workout in enumerate(self.workouts):
            if workout.name.lower() == name.lower():
                del self.workouts[i]
                print(f"Workout '{name}' removed successfully.")
                return
        print("Workout does not exist.")

    def display_workouts(self):
        if not self.workouts:
            print("No workouts to display.")
            return
        for workout in self.workouts:
            workout.display()
            print()  # Adding an extra line for better separation


def main():
    manager = WorkoutManager()

    while True:
        print("\nOptions")
        print("1. Add a Workout")
        print("2. Remove a Workout")
        print("3. Display Workouts")
        print("4. Quit")

        choice = input("Choose an option (1/2/3/4): ")

        if choice == '1':
            name = input("Enter the workout name: ")
            calories = input("Enter the number of calories burned: ")
            hours = input("Enter the duration of the workout (in hours): ")
            manager.add_workout(name, calories, hours)
        elif choice == '2':
            name = input("Enter the workout name to remove: ")
            manager.remove_workout(name)
        elif choice == '3':
            manager.display_workouts()
        elif choice == '4':
            print("Goodbye")
            break
        else:
            print("Invalid Input")


if __name__ == "__main__":
    main()
