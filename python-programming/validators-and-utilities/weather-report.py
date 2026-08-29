"""
This program lets you store and retrieve weather information for different cities. You can add weather data (like temperature and condition) for a city, and then you can ask for a weather report for any city you've added. The program keeps running in a loop until you choose to quit.
"""


def add_weather_data(weather, city, temp, condition):
    weather[city] = {'Temperature': temp, 'Condition': condition}
    print(f"Weather data for {city} added")


def get_weather_report(weather, city):
    if city in weather:
        print(f"Weather in {city}")
        print(f"Temperature: {weather[city]['Temperature']}C")
        print(f"Condition: {weather[city]['Condition']}")
    else:
        print(f"No weather data available for {city}")


weather_data = {}

while True:
    print("\nOptions:")
    print("1. Add weather data")
    print("2. Get weather report")
    print("3. Quit")

    choice = input("Enter choice: ")

    if choice == '1':
        city = input("Enter city: ").strip().capitalize()
        temp = float(input("Enter temperature: "))
        condition = input("Enter weather condition: ").strip().capitalize()
        add_weather_data(weather_data, city, temp, condition)
    elif choice == '2':
        city = input("Enter city: ").strip().capitalize()
        get_weather_report(weather_data, city)
    elif choice =='3':
        print("Goodbye!")
        break
    else:
        print("Invalid choice")
