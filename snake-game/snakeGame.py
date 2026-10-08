import random
import pygame

pygame.init()

# Define colors
white = (255, 255, 255)  # White color for the background
yellow = (255, 255, 102)  # Yellow color for text
black = (0, 0, 0)  # Black color for the snake
red = (213, 50, 80)  # Red color for game over text
green = (0, 255, 0)  # Green color for food
blue = (50, 153, 213)  # Blue color for game over background

# Screen dimensions
dis_width = 800  # Width of the screen
dis_height = 600  # Height of the screen

# Create the display window
dis = pygame.display.set_mode((dis_width, dis_height))
pygame.display.set_caption('Snake Game by Babatunde')  # Set the window title

# Load the background image
bg_image = pygame.image.load('background.png')  # Make sure you have 'background.png' in your working directory

clock = pygame.time.Clock()  # Create a clock object to control the frame rate

snake_block = 10  # Size of each block of the snake
snake_speed = 15  # Speed of the snake

# Fonts for displaying text
font_style = pygame.font.SysFont("bahnschrift", 25)
score_font = pygame.font.SysFont("comicsansms", 35)

# Function to draw the snake
def our_snake(snake_block, snake_list):
    for x in snake_list:
        pygame.draw.rect(dis, black, [x[0], x[1], snake_block, snake_block])

# Function to display a message
def message(msg, color):
    mesg = font_style.render(msg, True, color)  # Create the message with the given color
    dis.blit(mesg, [dis_width / 6, dis_height / 3])  # Draw the message on the screen

# Main game loop function
def gameLoop():
    game_over = False  # Game over flag
    game_close = False  # Flag to check if the player lost

    # Initial position of the snake's head
    x1 = dis_width / 2
    y1 = dis_height / 2

    # Initial movement direction of the snake (no movement)
    x1_change = 0
    y1_change = 0

    # List to keep track of the snake's body
    snake_List = []
    Length_of_snake = 1  # Snake initially has length 1

    # Random position for the food
    foodx = round(random.randrange(0, dis_width - snake_block) / 10.0) * 10.0
    foody = round(random.randrange(0, dis_height - snake_block) / 10.0) * 10.0

    # Main game loop
    while not game_over:

        # Game over screen handling
        while game_close == True:
            dis.fill(blue)  # Fill the screen with blue
            message("You Lost! Press Q-Quit or C-Play Again", red)  # Display the game over message
            pygame.display.update()  # Update the screen

            # Check for key presses to either quit or play again
            for event in pygame.event.get():
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_q:  # If Q is pressed, quit the game
                        game_over = True
                        game_close = False
                    if event.key == pygame.K_c:  # If C is pressed, restart the game
                        gameLoop()

        # Event handling for snake movement and quitting
        for event in pygame.event.get():
            if event.type == pygame.QUIT:  # If the user closes the window
                game_over = True
            if event.type == pygame.KEYDOWN:  # If a key is pressed, move the snake
                if event.key == pygame.K_LEFT:  # Move left
                    x1_change = -snake_block
                    y1_change = 0
                elif event.key == pygame.K_RIGHT:  # Move right
                    x1_change = snake_block
                    y1_change = 0
                elif event.key == pygame.K_UP:  # Move up
                    y1_change = -snake_block
                    x1_change = 0
                elif event.key == pygame.K_DOWN:  # Move down
                    y1_change = snake_block
                    x1_change = 0

        # Check if the snake hits the wall (game over)
        if x1 >= dis_width or x1 < 0 or y1 >= dis_height or y1 < 0:
            game_close = True

        # Update the snake's position
        x1 += x1_change
        y1 += y1_change

        dis.blit(bg_image, (0, 0))  # Display the background before anything else
        pygame.draw.rect(dis, green, [foodx, foody, snake_block, snake_block])  # Draw the food

        # Create the new head of the snake
        snake_Head = []
        snake_Head.append(x1)
        snake_Head.append(y1)
        snake_List.append(snake_Head)  # Add the new head to the snake's body

        # Remove the tail if the snake is longer than its current length
        if len(snake_List) > Length_of_snake:
            del snake_List[0]

        # Check if the snake collides with itself
        for x in snake_List[:-1]:
            if x == snake_Head:
                game_close = True

        # Draw the snake on the screen
        our_snake(snake_block, snake_List)
        pygame.display.update()

        # Check if the snake eats the food
        if x1 == foodx and y1 == foody:
            foodx = round(random.randrange(0, dis_width - snake_block) / 10.0) * 10.0  # New food position
            foody = round(random.randrange(0, dis_height - snake_block) / 10.0) * 10.0  # New food position
            Length_of_snake += 1  # Increase the snake's length

        clock.tick(snake_speed)  # Control the game speed (frame rate)

    pygame.quit()  # Quit Pygame
    quit()  # Close the program

# Run the game
gameLoop()
