times_table = int(input("Enter the times table: "))
stop_value = int(input("Enter the stop value: "))

for i in range(1,times_table+1):
    print(f"Multiplication Table {i}")
    for j in range(1,stop_value+1):
        result = i * j
        print(f"{i} * {j} = {result}")
    print("")
