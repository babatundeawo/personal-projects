command = ""
started = False
while True:
    command = input("> ").lower()
    if command == "start":
        if started:
            print("Car is already started.")
        else:
            started = True
            print("Car started...")
    elif command == "stop":
        if not started:
            print("Car is already stopped.")
        else:
            started = False
            print("Car stopped.")
    elif command == "help":
        print("start - to start the car\n"
              "stop - to stop the car\n"
              "quit - to exit\n")
    elif command == "quit":
        break
    else:
        print("Sorry, I do not understand you.")

