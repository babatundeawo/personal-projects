# 🌤️ Weather Application

A modern, responsive weather app that fetches real-time data from the OpenWeatherMap API. Built with pure HTML, CSS, and JavaScript (ES6). Perfect for learning API integration, async/await, and dynamic UI updates.

## ✨ Features

- 🌍 **Search by city** – Enter any city name worldwide
- 📍 **Current location** – One-click geolocation weather
- 🌡️ **Temperature** with feels-like
- 💧 **Humidity**, 🌬️ **Wind speed**, Visibility, Pressure
- 🌅 **Sunrise & Sunset** times (local)
- 🕒 **Local date & time** for the city
- 📅 **5-Day Forecast** with daily highs/lows and icons
- 🌡️ **°C / °F toggle**
- 🌙 **Dark mode**
- 🎨 **Dynamic background** that changes with weather condition
- 🔍 **Recent searches** (saved in Local Storage)
- ⏳ **Loading spinner** & clear error messages
- 📱 **Fully responsive** mobile design
- 🖼️ Weather icons from OpenWeatherMap

## 📂 Project Structure

```
weather-app/
├── index.html
├── style.css
├── script.js
├── assets/          # Optional custom icons (API icons used by default)
└── README.md
```

## 🔑 Setup – Get Your Free API Key

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key (Current Weather Data + 5 Day / 3 Hour Forecast)
4. Open `script.js` and replace:

```js
const API_KEY = 'YOUR_API_KEY_HERE';
```

with your actual key.

> Free tier allows plenty of calls for personal/portfolio use.  
> **Never commit real API keys to public repositories.**

## 🚀 How to Run

1. Add your API key in `script.js`
2. Open `index.html` in a modern browser  
   *or* serve locally:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```

## 🛠 Technologies

- HTML5
- CSS3 (Custom Properties, Flexbox/Grid, backdrop-filter, dynamic themes)
- JavaScript ES6 (async/await, Fetch API, Local Storage, Geolocation API)
- OpenWeatherMap API
- Font Awesome 6 (icons)

## 📚 Skills Demonstrated

- Consuming REST APIs
- Fetch API + Async/Await
- JSON parsing & error handling
- DOM manipulation & dynamic rendering
- Local Storage for preferences & history
- Geolocation API
- Responsive design & CSS theming
- Unit conversion (°C ↔ °F)
- Timezone-aware date/time formatting

## 🌟 Bonus Features Included

- Dark mode toggle
- Current location weather
- Local time display
- Sunrise / Sunset
- 5-day forecast
- Temperature unit toggle
- Recent city searches
- Weather-based background colors
- Loading spinner
- Visibility & pressure
- Clean error states

## 📱 Responsive

Works smoothly on desktop, tablet, and mobile. Forecast cards adapt on very small screens.

## 🎯 Challenges Completed

1. Loading spinner while fetching
2. Save recently searched cities
3. Background changes with weather condition
4. Unit toggle (°C / °F)
5. Geolocation support
6. Sunrise & sunset times
7. Proper error handling for invalid cities / network issues
8. Dark mode with persistence
9. Timezone-correct local time
10. Clean, maintainable code structure

---

Built as a beginner-to-intermediate portfolio project for learning real-world API integration.
