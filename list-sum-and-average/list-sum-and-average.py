#List Sum and Average
count = int(input("How many numbers do you want to calculate: "))

my_list = []
for i in range(count):
    my_list.append(int(input("Enter number: ")))

total = sum(my_list)
average = total / len(my_list)

print(f"Total: {total}")
print(f"Average: {average:.2f}")
