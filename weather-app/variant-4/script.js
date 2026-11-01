// OpenWeatherMap API Configuration
const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your valid API Key

// Application State
let currentCelsiusTemp = null;
let currentCelsiusFeels = null;
let currentCelsiusHigh = null;
let currentCelsiusLow = null;
let forecastRawData = [];
let isCelsius = true;
let recentCities = JSON.parse(localStorage.getItem("recent_cities")) || ["London", "New York", "Tokyo"];

// DOM Elements
const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const locationBtn = document.getElementById("locationBtn");
const unitToggle = document.getElementById("unitToggle");
const themeToggle = document.getElementById("themeToggle");
const recentSearches = document.getElementById("recentSearches");
const recentTags = document.getElementById("recentTags");

const loader = document.getElementById("loader");
const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");
const weatherContainer = document.getElementById("weatherContainer");

// Current Weather DOM Nodes
const cityNameEl = document.getElementById("cityName");
const dateTimeEl = document.getElementById("dateTime");
const weatherBadge = document.getElementById("weatherBadge");
const weatherIcon = document.getElementById("weatherIcon");
const tempValue = document.getElementById("tempValue");
const tempUnit = document.getElementById("tempUnit");
const feelsLike = document.getElementById("feelsLike");
const tempHigh = document.getElementById("tempHigh");
const tempLow = document.getElementById("tempLow");
const weatherDescription = document.getElementById("weatherDescription");

// Metrics DOM Nodes
const humidity = document.getElementById("humidity");
const humidityBar = document.getElementById("humidityBar");
const windSpeed = document.getElementById("windSpeed");
const windDirection = document.getElementById("windDirection");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const visibilityStatus = document.getElementById("visibilityStatus");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const forecastContainer = document.getElementById("forecastContainer");

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  renderRecentSearches();
  
  // Load initial weather (default city or last searched)
  const defaultCity = recentCities[0] || "London";
  fetchWeatherByCity(defaultCity);
});

// Event Listeners
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = cityInput.value.trim();
  if (query) {
    fetchWeatherByCity(query);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    showLoading();
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => showError("Location access denied or unavailable.")
    );
  } else {
    showError("Geolocation is not supported by your browser.");
  }
});

unitToggle.addEventListener("click", () => {
  if (currentCelsiusTemp === null) return;
  isCelsius = !isCelsius;
  unitToggle.textContent = isCelsius ? "°C" : "°F";
  tempUnit.textContent = isCelsius ? "°C" : "°F";
  updateTemperatureDisplays();
  renderForecast();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// API Fetch Functions
async function fetchWeatherByCity(city) {
  showLoading();
  try {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (!currentRes.ok) {
      if (currentRes.status === 404) throw new Error("City not found. Check spelling.");
      if (currentRes.status === 401) throw new Error("Invalid API Key provided.");
      throw new Error("Failed to load weather data.");
    }

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    addRecentCity(currentData.name);
    displayWeatherData(currentData, forecastData);
  } catch (err) {
    showError(err.message);
  }
}

async function fetchWeatherByCoords(lat, lon) {
  showLoading();
  try {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (!currentRes.ok) throw new Error("Unable to fetch location weather.");

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    addRecentCity(currentData.name);
    displayWeatherData(currentData, forecastData);
  } catch (err) {
    showError(err.message);
  }
}

// Display Data
function displayWeatherData(current, forecast) {
  hideLoading();

  // Update Temperatures
  currentCelsiusTemp = current.main.temp;
  currentCelsiusFeels = current.main.feels_like;
  currentCelsiusHigh = current.main.temp_max;
  currentCelsiusLow = current.main.temp_min;
  updateTemperatureDisplays();

  // Basic Details
  cityNameEl.textContent = `${current.name}, ${current.sys.country}`;
  dateTimeEl.textContent = formatDate(new Date(), current.timezone);
  weatherBadge.textContent = current.weather[0].main;
  weatherDescription.textContent = current.weather[0].description;
  
  const iconCode = current.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  // Apply Theme Accent based on Main Weather Condition
  applyDynamicBackground(current.weather[0].main);

  // Metrics
  humidity.textContent = `${current.main.humidity}%`;
  humidityBar.style.width = `${current.main.humidity}%`;
  
  windSpeed.textContent = `${current.wind.speed} m/s`;
  windDirection.textContent = `Deg: ${current.wind.deg}°`;

  pressure.textContent = `${current.main.pressure} hPa`;
  
  const visKm = (current.visibility / 1000).toFixed(1);
  visibility.textContent = `${visKm} km`;
  visibilityStatus.textContent = visKm > 8 ? "Excellent" : visKm > 4 ? "Moderate" : "Poor";

  sunrise.textContent = formatTime(current.sys.sunrise, current.timezone);
  sunset.textContent = formatTime(current.sys.sunset, current.timezone);

  // Forecast Processing (Pick 1 sample entry per day at ~12:00 PM)
  forecastRawData = forecast.list.filter(item => item.dt_txt.includes("12:00:00"));
  renderForecast();

  weatherContainer.classList.remove("hidden");
}

function updateTemperatureDisplays() {
  tempValue.textContent = Math.round(toCurrentUnit(currentCelsiusTemp));
  feelsLike.textContent = Math.round(toCurrentUnit(currentCelsiusFeels));
  tempHigh.textContent = Math.round(toCurrentUnit(currentCelsiusHigh));
  tempLow.textContent = Math.round(toCurrentUnit(currentCelsiusLow));
}

function renderForecast() {
  forecastContainer.innerHTML = "";
  forecastRawData.forEach(item => {
    const card = document.createElement("div");
    card.className = "forecast-card";
    
    const date = new Date(item.dt * 1000);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const temp = Math.round(toCurrentUnit(item.main.temp));
    const icon = item.weather[0].icon;

    card.innerHTML = `
      <span class="forecast-day">${dayName}</span>
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="icon" class="forecast-icon">
      <span class="forecast-temp">${temp}°</span>
    `;
    forecastContainer.appendChild(card);
  });
}

// Helpers
function toCurrentUnit(celsius) {
  return isCelsius ? celsius : (celsius * 9) / 5 + 32;
}

function applyDynamicBackground(condition) {
  document.body.classList.remove("weather-clear", "weather-rain", "weather-clouds", "weather-snow");
  const cond = condition.toLowerCase();
  if (cond.includes("clear")) document.body.classList.add("weather-clear");
  else if (cond.includes("rain") || cond.includes("drizzle")) document.body.classList.add("weather-rain");
  else if (cond.includes("cloud")) document.body.classList.add("weather-clouds");
  else if (cond.includes("snow")) document.body.classList.add("weather-snow");
}

function formatDate(date, timezoneOffset) {
  const localTime = new Date(date.getTime() + (timezoneOffset * 1000) + (date.getTimezoneOffset() * 60000));
  return localTime.toLocaleDateString("en-US", {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatTime(timestamp, timezoneOffset) {
  const date = new Date((timestamp + timezoneOffset + (new Date().getTimezoneOffset() * 60)) * 1000);
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function addRecentCity(cityName) {
  if (!recentCities.includes(cityName)) {
    recentCities.unshift(cityName);
    if (recentCities.length > 4) recentCities.pop();
    localStorage.setItem("recent_cities", JSON.stringify(recentCities));
    renderRecentSearches();
  }
}

function renderRecentSearches() {
  if (recentCities.length === 0) {
    recentSearches.classList.add("hidden");
    return;
  }
  recentSearches.classList.remove("hidden");
  recentTags.innerHTML = "";
  recentCities.forEach(city => {
    const btn = document.createElement("button");
    btn.className = "tag-btn";
    btn.textContent = city;
    btn.onclick = () => fetchWeatherByCity(city);
    recentTags.appendChild(btn);
  });
}

function showLoading() {
  loader.classList.remove("hidden");
  errorMessage.classList.add("hidden");
  weatherContainer.classList.add("hidden");
}

function hideLoading() {
  loader.classList.add("hidden");
}

function showError(msg) {
  hideLoading();
  weatherContainer.classList.add("hidden");
  errorText.textContent = msg;
  errorMessage.classList.remove("hidden");
}
