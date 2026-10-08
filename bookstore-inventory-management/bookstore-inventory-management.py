class Book:
    def __init__(self, title, author, ISBN):
        self.title = title
        self.author = author
        self.ISBN = ISBN  # ISBN is treated as a string for flexibility

    def display_info(self):
        """Display book details."""
        print(f"Title: '{self.title}', Author: {self.author}, ISBN: {self.ISBN}")


class Bookstore:
    def __init__(self):
        """Initialize an empty dictionary to store books by their ISBN."""
        self.books = {}

    def add_book(self, book):
        """Add a book to the bookstore."""
        if book.ISBN not in self.books:
            self.books[book.ISBN] = book
            print(f"'{book.title}' by {book.author} has been added to the bookstore.")
        else:
            print(f"Book with ISBN {book.ISBN} is already in the bookstore.")

    def remove_book(self, ISBN):
        """Remove a book from the bookstore by its ISBN."""
        if ISBN in self.books:
            removed_book = self.books.pop(ISBN)
            print(f"Removed '{removed_book.title}' by {removed_book.author} from the bookstore.")
        else:
            print(f"No book found with ISBN: {ISBN}")

    def list_books(self):
        """List all books in the bookstore."""
        if self.books:
            print("Book Collection:")
            for book in self.books.values():
                book.display_info()
        else:
            print("No books available in the bookstore.")


# Example usage:
bookstore = Bookstore()
book1 = Book("How to Create a Movie", "John Doe", "912835")
book2 = Book("Intro to Calculus", "Michael Davids", "875219")

# Adding books
bookstore.add_book(book2)
bookstore.add_book(book1)

# Listing books
bookstore.list_books()

# Removing a book
bookstore.remove_book("912835")

# Listing books after removal
bookstore.list_books()
