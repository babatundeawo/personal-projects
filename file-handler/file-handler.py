# Open the file "test.txt" in write mode and create the file if it doesn't exist
with open("test.txt", "w") as test:
    test.write("The Lord is good all the time.")  # Write a string to the file

# Open the file "test.txt" in read mode
with open("test.txt", "r") as reading_test:
    print(reading_test.read())  # Read and print the content of the file

import os  # Import the os module to interact with the file system

# Check if "test.txt" exists, if so, remove it; otherwise, print a message
if os.path.exists("test.txt"):
    os.remove("test.txt")  # Remove the file if it exists
else:
    print("The file does not exist")
