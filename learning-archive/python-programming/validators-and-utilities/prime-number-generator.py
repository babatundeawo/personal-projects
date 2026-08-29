def is_prime(x):
    """Check if a number is prime."""
    if x < 2:
        return False
    elif x == 2:
        return True
    for num in range(2, x):
        if x % num == 0:
            return False
    return True


def prime_generator(a, b):
    """Generate prime numbers within the range (a, b)."""
    for i in range(a, b):
        if is_prime(i):
            yield i


# Get user input for the range of prime numbers
first = int(input("Enter beginning number: "))
second = int(input("Enter last number: "))

# Print the list of prime numbers generated within the specified range
print(list(prime_generator(first, second)))
