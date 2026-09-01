# Library Management System

class Library:
    def __init__(self):
        self.books = {}

    def add_book(self, title, author):
        title = title.strip().capitalize()
        author = author.strip().capitalize()
        self.books[title] = author
        print(f"Added book '{title}' by '{author}'")

    def remove_book(self, title):
        title = title.strip().capitalize()
        if title in self.books:
            del self.books[title]
            print(f"Removed book '{title}'")
        else:
            print(f"Book '{title}' not found")

    def list_books(self):
        print("Available Library Books:")
        for title, author in self.books.items():
            print(f"{title} by {author}")

# Interactive section
library = Library()

while True:
    print("\nOptions: 1. Add Book  2. Remove Book  3. List Books  4. Exit")
    choice = input("Choose an option (1/2/3/4): ").strip()

    if choice == '1':
        title = input("Enter book title: ")
        author = input("Enter book author: ")
        library.add_book(title, author)

    elif choice == '2':
        title = input("Enter the title of the book to remove: ")
        library.remove_book(title)

    elif choice == '3':
        library.list_books()

    elif choice == '4':
        print("Exiting the system.")
        break

    else:
        print("Invalid option. Please try again.")
