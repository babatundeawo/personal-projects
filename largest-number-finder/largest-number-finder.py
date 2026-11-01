numbers = [2, 8, 4, 7, 1, 5, 13]

max = numbers[0]
for number in numbers:
    if number > max:
        max = number

print(f"Largest number: {max}")
