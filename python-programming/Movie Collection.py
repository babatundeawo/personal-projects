class Movie:
    # Initialize a movie object with title, director, and year attributes
    def __init__(self, title, director, year):
        self.title = title.strip().capitalize()
        self.director = director.strip().capitalize()
        self.year = year

    # Display movie information
    def display_info(self):
        print(f"Title: {self.title}, Director: {self.director}, Year of Production: {self.year}")


class MovieCollection:
    # Initialize a collection of movies using a dictionary
    def __init__(self):
        self.movies = {}

    # Add a movie to the collection
    def add_movie(self, movie):
        self.movies[movie.title] = movie
        print(f"Added movie {movie.title}")

    # Remove a movie from the collection by title
    def remove_movie(self, title):
        title = title.strip().capitalize()
        if title in self.movies:
            removed_movie = self.movies.pop(title)
            print(f"Removed movie {removed_movie}")
        else:
            print(f"Movie '{title}' not found")

    # List all movies in the collection
    def list_movies(self):
        print("Movie Collection:")
        for movie in self.movies.values():
            movie.display_info()


# Main program loop to manage movie collection
collection = MovieCollection()

while True:
    print("\nMenu:")
    print("1. Add Movie")
    print("2. Remove Movie")
    print("3. List Movies")
    print("4. Quit")

    choice = input("Enter your choice (1/2/3/4): ")

    if choice == '1':
        title = input("Enter movie title: ")
        director = input("Enter movie director: ")
        year = input("Enter the year of production: ")
        movie = Movie(title, director, year)
        collection.add_movie(movie)
    elif choice == '2':
        title = input("Enter the title of the movie to remove: ")
        collection.remove_movie(title)
    elif choice == '3':
        collection.list_movies()
    elif choice == '4':
        print("Exiting the program")
        break
    else:
        print("Invalid choice. Please try again.")

