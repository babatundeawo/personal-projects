import requests

# OpenWeatherMap API Key
API_KEY = "65c28638e75c85f2749a0fa2038b9c36"


def get_weather_data(city):
    """Fetches weather data for the given city from the OpenWeatherMap API."""
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)

    if response.status_code == 200:
        return response.json()  # Return the data if the request was successful
    else:
        return None  # Return None for any failure (city not found or other issues)


def display_weather_info(city, data):
    """Displays weather information including temperature in both °C and °F and a weather description."""
    temperature_celsius = data['main']['temp']
    temperature_fahrenheit = temperature_celsius * 9 / 5 + 32
    weather_description = data['weather'][0]['description']

    print(f"\nWeather in {city.title()}:")
    print(f"Temperature: {temperature_celsius:.1f}°C / {temperature_fahrenheit:.1f}°F")
    print(f"Condition: {weather_description.capitalize()}")


def main():
    """Main program loop to continuously get weather updates for cities."""
    while True:
        city = input("\nEnter the city name (or type 'exit' to quit): ").strip()

        if city.lower() == 'exit':
            print("Exiting the weather app. Goodbye!")
            break

        weather_data = get_weather_data(city)

        if weather_data:
            display_weather_info(city, weather_data)
        else:
            print("City not found or an error occurred. Please try again.")


# Start the weather application
if __name__ == "__main__":
    main()
