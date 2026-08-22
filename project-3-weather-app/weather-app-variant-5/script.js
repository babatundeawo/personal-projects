/**
 * Weather App - OpenWeatherMap Integration
 *
 * 1. Get a free API key at: https://openweathermap.org/api
 * 2. Replace YOUR_API_KEY_HERE below with your key
 * 3. Open index.html in a browser
 */

const API_KEY = 'YOUR_API_KEY_HERE'; // ← Put your OpenWeatherMap API key here
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const errorMsg = document.getElementById('errorMsg');
const weatherCard = document.getElementById('weatherCard');
const forecastSection = document.getElementById('forecastSection');
const forecastEl = document.getElementById('forecast');
const recentSearchesEl = document.getElementById('recentSearches');
const unitToggle = document.getElementById('unitToggle');
const themeToggle = document.getElementById('themeToggle');

// State
let currentUnit = localStorage.getItem('weather-unit') || 'metric'; // metric = °C, imperial = °F
let lastCity = null;
let lastCoords = null;

// ---------- Theme ----------
function loadTheme() {
  const theme = localStorage.getItem('weather-theme') || 'light';
  if (theme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('weather-theme', isDark ? 'dark' : 'light');
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// ---------- Units ----------
function updateUnitButton() {
  unitToggle.textContent = currentUnit === 'metric' ? '°C' : '°F';
}

function toggleUnit() {
  currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
  localStorage.setItem('weather-unit', currentUnit);
  updateUnitButton();
  // Re-fetch last location
  if (lastCoords) {
    fetchWeatherByCoords(lastCoords.lat, lastCoords.lon);
  } else if (lastCity) {
    fetchWeather(lastCity);
  }
}

// ---------- Recent Searches ----------
function getRecent() {
  return JSON.parse(localStorage.getItem('weather-recent') || '[]');
}

function saveRecent(city) {
  let recent = getRecent().filter(c => c.toLowerCase() !== city.toLowerCase());
  recent.unshift(city);
  recent = recent.slice(0, 5);
  localStorage.setItem('weather-recent', JSON.stringify(recent));
  renderRecent();
}

function renderRecent() {
  const recent = getRecent();
  recentSearchesEl.innerHTML = '';
  recent.forEach(city => {
    const tag = document.createElement('button');
    tag.className = 'recent-tag';
    tag.textContent = city;
    tag.addEventListener('click', () => {
      cityInput.value = city;
      fetchWeather(city);
    });
    recentSearchesEl.appendChild(tag);
  });
}

// ---------- UI Helpers ----------
function showLoading() {
  loadingEl.classList.remove('hidden');
  errorEl.classList.add('hidden');
  weatherCard.classList.add('hidden');
  forecastSection.classList.add('hidden');
}

function hideLoading() {
  loadingEl.classList.add('hidden');
}

function showError(msg) {
  hideLoading();
  errorMsg.textContent = msg;
  errorEl.classList.remove('hidden');
  weatherCard.classList.add('hidden');
  forecastSection.classList.add('hidden');
  // Reset weather body classes
  document.body.className = document.body.classList.contains('dark') ? 'dark' : '';
}

function setWeatherBackground(main) {
  // Remove previous weather classes
  document.body.classList.remove('clear', 'clouds', 'rain', 'drizzle', 'thunderstorm', 'snow', 'mist', 'fog', 'haze');
  const key = (main || '').toLowerCase();
  if (key) document.body.classList.add(key);
}

// ---------- Format Helpers ----------
function formatTemp(temp) {
  return Math.round(temp) + (currentUnit === 'metric' ? '°C' : '°F');
}

function formatWind(speed) {
  if (currentUnit === 'metric') {
    return Math.round(speed * 3.6) + ' km/h'; // m/s → km/h
  }
  return Math.round(speed) + ' mph';
}

function formatTime(unix, timezoneOffset) {
  // timezoneOffset is seconds from UTC
  const date = new Date((unix + timezoneOffset) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  });
}

function formatDateTime(unix, timezoneOffset) {
  const date = new Date((unix + timezoneOffset) * 1000);
  return date.toLocaleString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  });
}

function getDayName(unix, timezoneOffset) {
  const date = new Date((unix + timezoneOffset) * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
}

// ---------- API Calls ----------
async function fetchWeather(city) {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    showError('Please add your OpenWeatherMap API key in script.js');
    return;
  }

  const query = city.trim();
  if (!query) {
    cityInput.focus();
    return;
  }

  showLoading();
  lastCity = query;
  lastCoords = null;

  try {
    // Current weather
    const currentRes = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=${currentUnit}`
    );
    const currentData = await currentRes.json();

    if (currentData.cod === '404' || currentData.cod === 404) {
      showError(`City "${query}" not found. Try another name.`);
      return;
    }
    if (!currentRes.ok) {
      showError(currentData.message || 'Failed to fetch weather data');
      return;
    }

    // 5-day / 3-hour forecast
    const forecastRes = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=${currentUnit}`
    );
    const forecastData = await forecastRes.json();

    if (!forecastRes.ok) {
      // Still show current even if forecast fails
      displayCurrent(currentData);
      forecastSection.classList.add('hidden');
      hideLoading();
      saveRecent(currentData.name);
      return;
    }

    displayCurrent(currentData);
    displayForecast(forecastData);
    saveRecent(currentData.name);
    hideLoading();
  } catch (err) {
    console.error(err);
    showError('Network error. Check your connection and try again.');
  }
}

async function fetchWeatherByCoords(lat, lon) {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    showError('Please add your OpenWeatherMap API key in script.js');
    return;
  }

  showLoading();
  lastCoords = { lat, lon };
  lastCity = null;

  try {
    const currentRes = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${currentUnit}`
    );
    const currentData = await currentRes.json();

    if (!currentRes.ok) {
      showError(currentData.message || 'Failed to fetch weather for your location');
      return;
    }

    const forecastRes = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${currentUnit}`
    );
    const forecastData = await forecastRes.json();

    displayCurrent(currentData);
    if (forecastRes.ok) {
      displayForecast(forecastData);
    } else {
      forecastSection.classList.add('hidden');
    }
    saveRecent(currentData.name);
    hideLoading();
  } catch (err) {
    console.error(err);
    showError('Network error. Check your connection and try again.');
  }
}

// ---------- Display ----------
function displayCurrent(data) {
  const { name, sys, main, weather, wind, visibility, dt, timezone } = data;
  const w = weather[0];

  document.getElementById('cityName').textContent = `${name}${sys.country ? ', ' + sys.country : ''}`;
  document.getElementById('localDateTime').textContent = formatDateTime(dt, timezone);
  document.getElementById('temperature').textContent = formatTemp(main.temp);
  document.getElementById('description').textContent = w.description;
  document.getElementById('feelsLike').textContent = `Feels like ${formatTemp(main.feels_like)}`;
  document.getElementById('humidity').textContent = `${main.humidity}%`;
  document.getElementById('wind').textContent = formatWind(wind.speed);
  document.getElementById('visibility').textContent = visibility
    ? (visibility / 1000).toFixed(1) + ' km'
    : '—';
  document.getElementById('pressure').textContent = `${main.pressure} hPa`;
  document.getElementById('sunrise').textContent = formatTime(sys.sunrise, timezone);
  document.getElementById('sunset').textContent = formatTime(sys.sunset, timezone);

  const icon = document.getElementById('weatherIcon');
  icon.src = `https://openweathermap.org/img/wn/${w.icon}@2x.png`;
  icon.alt = w.description;

  setWeatherBackground(w.main);

  weatherCard.classList.remove('hidden');
  errorEl.classList.add('hidden');
}

function displayForecast(data) {
  // Group 3-hour forecasts into daily (take midday-ish or first of each day)
  const daily = {};
  const timezone = data.city.timezone;

  data.list.forEach(item => {
    const dayKey = getDayName(item.dt, timezone);
    // Prefer items around 12:00
    if (!daily[dayKey] || Math.abs(new Date((item.dt + timezone) * 1000).getUTCHours() - 12) <
        Math.abs(new Date((daily[dayKey].dt + timezone) * 1000).getUTCHours() - 12)) {
      daily[dayKey] = item;
    }
  });

  // Take next 5 distinct days (skip today if already shown in current)
  const days = Object.values(daily).slice(0, 5);

  forecastEl.innerHTML = '';
  days.forEach(item => {
    const dayName = getDayName(item.dt, timezone);
    const icon = item.weather[0].icon;
    const max = Math.round(item.main.temp_max);
    const min = Math.round(item.main.temp_min);
    const unit = currentUnit === 'metric' ? '°' : '°';

    const card = document.createElement('div');
    card.className = 'forecast-day';
    card.innerHTML = `
      <div class="day">${dayName}</div>
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${item.weather[0].description}">
      <div class="temp-range">
        <span class="max">${max}${unit}</span>
        <span class="min"> ${min}${unit}</span>
      </div>
    `;
    forecastEl.appendChild(card);
  });

  forecastSection.classList.remove('hidden');
}

// ---------- Geolocation ----------
function getLocationWeather() {
  if (!navigator.geolocation) {
    showError('Geolocation is not supported by your browser');
    return;
  }

  showLoading();
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
    },
    (err) => {
      hideLoading();
      let msg = 'Unable to get your location';
      if (err.code === 1) msg = 'Location permission denied';
      if (err.code === 2) msg = 'Location unavailable';
      if (err.code === 3) msg = 'Location request timed out';
      showError(msg);
    },
    { timeout: 10000 }
  );
}

// ---------- Event Listeners ----------
searchBtn.addEventListener('click', () => fetchWeather(cityInput.value));

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    fetchWeather(cityInput.value);
  }
});

locationBtn.addEventListener('click', getLocationWeather);
unitToggle.addEventListener('click', toggleUnit);
themeToggle.addEventListener('click', toggleTheme);

// ---------- Init ----------
loadTheme();
updateUnitButton();
renderRecent();

// Optional: auto-load last city or a default
const recent = getRecent();
if (recent.length > 0) {
  // Don't auto-fetch on load to avoid unnecessary API calls / key errors
  // User can click a recent tag
}
