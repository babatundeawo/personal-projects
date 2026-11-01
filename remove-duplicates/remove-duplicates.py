numbers = [2, 7, 5, 3, 10, 5, 6, 2, 11, 10]

new_numbers = []
for number in numbers:
    if number not in new_numbers:
        new_numbers.append(number)

print(new_numbers)
