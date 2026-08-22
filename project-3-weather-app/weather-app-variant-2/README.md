# Station — Weather App

A responsive weather dashboard: search any city for current conditions and a 5-day forecast, or use your current location. Built with plain HTML, CSS and JavaScript (ES6) — no build step, no frameworks.

## Features

- Search weather by city name
- Current temperature, "feels like," humidity, wind speed and condition
- 5-day forecast (aggregated from OpenWeather's 3-hour forecast data)
- Local date/time and sunrise/sunset, calculated from the city's UTC offset
- Current-location weather via the Geolocation API
- °C / °F toggle
- Recently searched cities and a favorites list (both saved in `localStorage`)
- Loading spinner during requests, with a friendly "city not found" error
- Dark / light mode
- Background accent shifts subtly with the current weather condition
- **Demo mode**: if no API key is set (or a request fails), the app automatically shows sample data instead of breaking, so it's always browsable

## Setup

1. Get a free API key at [openweathermap.org/api](https://openweathermap.org/api) (the free tier covers current weather + 5-day forecast).
2. Open `script.js` and replace the placeholder near the top:

   ```js
   const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
   ```

   with your real key.
3. Open `index.html` in a browser — no server or build step required.

**Note on API keys in the browser:** this project calls the OpenWeather API directly from client-side JavaScript, which is fine for learning and personal projects, but it means your key is visible to anyone who views the page source. For anything public-facing, proxy the request through a small backend (Node/Express, for example) that holds the key server-side instead. Never commit a real key to a public GitHub repository.

## Project structure

```
weather-app/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── clear.svg
│   ├── cloudy.svg
│   ├── rain.svg
│   └── snow.svg
└── README.md
```

The four condition icons in `assets/` are reference copies of the same artwork used inline in `script.js` (inlining lets the icons be recoloured for dark/light mode).

## Not yet included

Left out to keep the base project focused — good next steps: hourly forecasts, an air quality index panel, an interactive weather map, voice search, and caching recent results for offline viewing.
