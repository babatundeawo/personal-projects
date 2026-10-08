class Song:
    def __init__(self, title, artist, duration=0):
        """Initialize a song with title, artist, and duration in seconds."""
        self.title = title.strip().capitalize()
        self.artist = artist.strip().capitalize()
        self.duration = duration  # Duration in seconds

    def display_info(self):
        """Display song title, artist, and formatted duration."""
        minutes = self.duration // 60  # Calculate minutes
        seconds = self.duration % 60     # Calculate remaining seconds
        print(f"Title: '{self.title}', Artist: {self.artist}, Duration: {minutes}:{seconds:02d}")


class Playlist:
    def __init__(self):
        """Initialize an empty playlist."""
        self.playlist = []

    def add_song(self, song):
        """Add a song to the playlist."""
        self.playlist.append(song)
        print(f"Song '{song.title}' has been added to the playlist.")

    def remove_song(self, title):
        """Remove a song from the playlist by title."""
        title = title.strip().capitalize()
        for song in self.playlist:
            if song.title == title:
                self.playlist.remove(song)
                print(f"Removed song '{title}' from the playlist.")
                return
        print(f"Song '{title}' not found in the playlist.")

    def list_songs(self):
        """List all songs in the playlist."""
        if not self.playlist:
            print("The playlist is empty.")
        else:
            print("Current Playlist:")
            for song in self.playlist:
                song.display_info()


# Main program for managing the playlist
playlist = Playlist()
song1 = Song("Orange", "Bob", 290)
song2 = Song("Blue", "Sam", 859)
playlist.add_song(song2)
playlist.add_song(song1)
playlist.list_songs()
playlist.remove_song("BlUe")
playlist.list_songs()
