# Weather App — Project 3

Beginner-to-intermediate weather application using HTML, CSS and vanilla JavaScript.

## Features
- Search weather by city
- Current temperature, feels-like temperature, humidity, wind and UV index
- Weather condition and icon
- Five-day forecast
- Local date/time
- Celsius/Fahrenheit toggle
- Current-location weather with Geolocation API
- Recent searches using Local Storage
- Error/loading states
- Dark mode
- Responsive mobile layout

## API
This starter uses **Open-Meteo**, which requires no browser-exposed API key:
- Geocoding API: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast API: `https://api.open-meteo.com/v1/forecast`

This is deliberate so the project runs immediately. If you switch to an authenticated provider such as OpenWeather, never commit a secret API key into frontend JavaScript. Use a backend/serverless function to keep credentials private.

## Structure
```text
weather-app/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
```

## Run
Open `index.html` in a modern browser, or use VS Code Live Server.

Geolocation normally works on `localhost` or HTTPS.

## Suggested upgrades
Hourly forecast, sunrise/sunset, favorite cities, rain probability, AQI, animated icons, weather-based backgrounds, caching, weather alerts, React version, and a backend proxy.
