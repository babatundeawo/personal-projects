import pygame
import random

# Initialize Pygame
pygame.init()

# Screen dimensions
SCREEN_WIDTH = 800  # Width of the game screen
SCREEN_HEIGHT = 600  # Height of the game screen
GROUND_HEIGHT = 100  # Height of the ground at the bottom of the screen

# Colors (using RGB values)
WHITE = (255, 255, 255)  # Color for white
BLACK = (0, 0, 0)  # Color for black

# Game settings
GRAVITY = 0.5  # Gravity pulling the bird down
FLAP_STRENGTH = -6  # Strength of the bird's flap (negative for upward movement)
PIPE_GAP = 150  # The gap between the top and bottom pipes
PIPE_WIDTH = 70  # Width of the pipes
PIPE_SPEED = 3  # Speed at which pipes move towards the bird
PIPE_SPAWN_INTERVAL = 3600  # Pipe spawn interval in milliseconds (3.6 seconds)

# Load images for the bird, pipes, and background
BIRD_IMG = pygame.image.load('bird.png')  # Bird image
PIPE_IMG = pygame.image.load('pipe.png')  # Pipe image
BG_IMG = pygame.image.load('background.png')  # Background image

# Bird class to manage bird's behavior
class Bird:
    def __init__(self):
        self.image = BIRD_IMG  # Bird's image
        self.rect = self.image.get_rect(center=(100, SCREEN_HEIGHT // 2))  # Bird's position (centered vertically)
        self.velocity = 0  # Vertical velocity (initially zero)

    # Function to make the bird flap (upward movement)
    def flap(self):
        self.velocity = FLAP_STRENGTH  # Set velocity to flap strength to move upward

    # Function to update the bird's position
    def update(self):
        self.velocity += GRAVITY  # Apply gravity to the velocity
        self.rect.y += self.velocity  # Update bird's vertical position based on velocity

    # Function to draw the bird on the screen
    def draw(self, screen):
        screen.blit(self.image, self.rect.topleft)

# Pipe class to manage the pipes' behavior
class Pipe:
    def __init__(self, x, y, inverted=False):
        self.inverted = inverted  # Whether the pipe is inverted (top pipe)
        self.image = PIPE_IMG  # The image of the pipe
        if inverted:  # If it's the top pipe, flip the image vertically
            self.image = pygame.transform.flip(self.image, False, True)
            self.rect = self.image.get_rect(topleft=(x, y - PIPE_GAP - self.image.get_height()))  # Position top pipe
        else:  # Bottom pipe
            self.rect = self.image.get_rect(topleft=(x, y))  # Position bottom pipe

    # Function to update the pipe's position (move it leftward)
    def update(self):
        self.rect.x -= PIPE_SPEED  # Move pipe left by PIPE_SPEED each frame

    # Function to draw the pipe on the screen
    def draw(self, screen):
        screen.blit(self.image, self.rect.topleft)

# Function to display Game Over message
def display_game_over(screen, score):
    font = pygame.font.SysFont(None, 55)  # Font size 55
    text = font.render(f"Game Over! Your score: {int(score)}", True, BLACK)  # Render score text
    screen.blit(text, (SCREEN_WIDTH // 4, SCREEN_HEIGHT // 2))  # Position the text on the screen
    instructions = pygame.font.SysFont(None, 35).render("Press R to replay or Q to quit.", True, BLACK)
    screen.blit(instructions, (SCREEN_WIDTH // 3, SCREEN_HEIGHT // 2 + 50))  # Display replay or quit instructions
    pygame.display.flip()  # Update the display

# Main game function
def main():
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))  # Set up the screen with the given dimensions
    clock = pygame.time.Clock()  # Clock to control the frame rate

    # Game loop function to run the game
    def run_game():
        bird = Bird()  # Create the bird object
        pipes = []  # List to store the pipes
        score = 0  # Initialize score

        # Set a timer to generate new pipes at regular intervals
        pygame.time.set_timer(pygame.USEREVENT, PIPE_SPAWN_INTERVAL)

        running = True  # Flag to keep the game running
        game_over = False  # Flag to indicate if the game is over
        while running:
            screen.blit(BG_IMG, (0, 0))  # Draw the background

            for event in pygame.event.get():
                if event.type == pygame.QUIT:  # If the user closes the game
                    return False  # Exit the game
                elif event.type == pygame.KEYDOWN:  # If the user presses a key
                    if event.key == pygame.K_SPACE and not game_over:  # If spacebar is pressed and the game is not over
                        bird.flap()  # Make the bird flap (move up)
                    if event.key == pygame.K_q:  # If "Q" is pressed, quit the game
                        return False  # Exit the game
                elif event.type == pygame.USEREVENT and not game_over:  # If the timer event is triggered
                    pipe_y = random.randint(SCREEN_HEIGHT // 2 - 200, SCREEN_HEIGHT // 2 + 200)  # Randomly place the pipes
                    pipes.append(Pipe(SCREEN_WIDTH, pipe_y))  # Create bottom pipe
                    pipes.append(Pipe(SCREEN_WIDTH, pipe_y, inverted=True))  # Create top pipe

            if not game_over:
                bird.update()  # Update the bird's position
                bird.draw(screen)  # Draw the bird on the screen

                # Update and draw pipes
                for pipe in pipes[:]:
                    pipe.update()  # Update pipe position
                    pipe.draw(screen)  # Draw the pipe on the screen

                    # Increment score when the bird passes a pipe (only bottom pipes)
                    if pipe.rect.centerx == bird.rect.centerx and not pipe.inverted:
                        score += 1

                    # Remove pipes that have moved off the screen
                    if pipe.rect.right < 0:
                        pipes.remove(pipe)

                # Collision detection
                for pipe in pipes:
                    if bird.rect.colliderect(pipe.rect):  # If bird collides with a pipe
                        game_over = True

                # Check if bird hits the ground or flies too high
                if bird.rect.top < 0 or bird.rect.bottom > SCREEN_HEIGHT - GROUND_HEIGHT:
                    game_over = True

            if game_over:  # If the game is over, display the "Game Over" message
                display_game_over(screen, score)

                # Wait for user input to either quit or replay
                while True:
                    for event in pygame.event.get():
                        if event.type == pygame.QUIT:  # If the user closes the game
                            return False  # Exit the game
                        elif event.type == pygame.KEYDOWN:  # If the user presses a key
                            if event.key == pygame.K_r:  # If "R" is pressed, replay the game
                                return True  # Restart the game
                            elif event.key == pygame.K_q:  # If "Q" is pressed, quit the game
                                return False  # Exit the game

            pygame.display.flip()  # Update the screen
            clock.tick(30)  # Control the frame rate (30 frames per second)

        pygame.quit()  # Quit Pygame
        return False  # In case the loop ends unexpectedly

    # Main game execution
    while True:
        if not run_game():  # If the game ends, either replay or quit
            break  # Exit the game

# Run the game
if __name__ == "__main__":
    main()  # Start the game
