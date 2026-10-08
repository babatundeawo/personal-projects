prices = [10, 20, 30]

#Method 1
total_price = 0
for price in prices:
    total_price = total_price + price
print(f"Total: ${total_price}")

#Method 2
total_price = sum(prices)
print(f"Total: ${total_price}")
