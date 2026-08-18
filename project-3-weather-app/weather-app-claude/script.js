// ============================================
// Configuration
// ============================================
// Get a free key at https://openweathermap.org/api (see README.md for setup).
// Never commit a real key to a public repo — for production, proxy requests
// through a small backend instead of calling the API directly from the browser.
const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const STORAGE_RECENT = 'weather-app-recent';
const STORAGE_FAVORITES = 'weather-app-favorites';
const STORAGE_THEME = 'weather-app-theme';
const STORAGE_UNIT = 'weather-app-unit';

let unit = localStorage.getItem(STORAGE_UNIT) || 'C';
let currentData = null; // last fetched raw weather payload, kept for unit re-render

// ============================================
// DOM refs
// ============================================
const panel = document.getElementById('stationPanel');
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const locateBtn = document.getElementById('locateBtn');
const searchError = document.getElementById('searchError');
const loader = document.getElementById('loader');
const readout = document.getElementById('readout');
const forecastSection = document.getElementById('forecast');
const modeNote = document.getElementById('modeNote');

const weatherIcon = document.getElementById('weatherIcon');
const tempValue = document.getElementById('tempValue');
const tempUnit = document.getElementById('tempUnit');
const cityName = document.getElementById('cityName');
const conditionEl = document.getElementById('condition');
const localTimeEl = document.getElementById('localTime');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const sunriseEl = document.getElementById('sunrise');
const sunsetEl = document.getElementById('sunset');
const forecastStrip = document.getElementById('forecastStrip');

const recentCitiesEl = document.getElementById('recentCities');
const favBtn = document.getElementById('favBtn');
const favoritesRow = document.getElementById('favoritesRow');
const unitToggle = document.getElementById('unitToggle');
const themeToggle = document.getElementById('themeToggle');

// ============================================
// Icons — mapped from OpenWeather icon codes to 4 families
// ============================================
const ICONS = {
  clear: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="22" fill="#E8A33D"/><g stroke="#E8A33D" stroke-width="4" stroke-linecap="round"><line x1="50" y1="8" x2="50" y2="20"/><line x1="50" y1="80" x2="50" y2="92"/><line x1="8" y1="50" x2="20" y2="50"/><line x1="80" y1="50" x2="92" y2="50"/><line x1="19" y1="19" x2="27" y2="27"/><line x1="73" y1="73" x2="81" y2="81"/><line x1="19" y1="81" x2="27" y2="73"/><line x1="73" y1="27" x2="81" y2="19"/></g></svg>`,
  cloudy: `<svg viewBox="0 0 100 100"><path d="M28 68a16 16 0 0 1-2-31.8 22 22 0 0 1 42.6-7A18 18 0 0 1 72 68Z" fill="#9AA7B2"/></svg>`,
  rain: `<svg viewBox="0 0 100 100"><path d="M26 56a15 15 0 0 1-1.6-29.9A20.5 20.5 0 0 1 64.5 20 16.5 16.5 0 0 1 70 56Z" fill="#7C8A96"/><g stroke="#4F9DDE" stroke-width="4" stroke-linecap="round"><line x1="34" y1="68" x2="30" y2="82"/><line x1="50" y1="68" x2="46" y2="82"/><line x1="66" y1="68" x2="62" y2="82"/></g></svg>`,
  snow: `<svg viewBox="0 0 100 100"><path d="M26 56a15 15 0 0 1-1.6-29.9A20.5 20.5 0 0 1 64.5 20 16.5 16.5 0 0 1 70 56Z" fill="#B7C4CE"/><g stroke="#E7ECEF" stroke-width="3.5" stroke-linecap="round"><line x1="34" y1="66" x2="34" y2="84"/><line x1="26" y1="75" x2="42" y2="75"/><line x1="66" y1="66" x2="66" y2="84"/><line x1="58" y1="75" x2="74" y2="75"/></g></svg>`
};

function iconFamilyFromCode(code) {
  // OpenWeather icon codes: 01=clear, 02/03/04=clouds, 09/10/11=rain/storm, 13=snow
  if (!code) return 'clear';
  const group = code.slice(0, 2);
  if (group === '01') return 'clear';
  if (['02', '03', '04'].includes(group)) return 'cloudy';
  if (['09', '10', '11'].includes(group)) return 'rain';
  if (group === '13') return 'snow';
  return 'cloudy';
}

// ============================================
// Unit conversion + display helpers
// ============================================
function fmtTemp(celsius) {
  const val = unit === 'C' ? celsius : celsius * 9 / 5 + 32;
  return Math.round(val);
}

function fmtTime(unixSeconds, tzOffsetSeconds) {
  const local = new Date((unixSeconds + tzOffsetSeconds) * 1000);
  let h = local.getUTCHours();
  const m = String(local.getUTCMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

function fmtLocalDateTime(tzOffsetSeconds) {
  const nowUtc = Date.now() + new Date().getTimezoneOffset() * 60000;
  const local = new Date(nowUtc + tzOffsetSeconds * 1000);
  return local.toLocaleString(undefined, {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit'
  });
}

// ============================================
// Storage helpers
// ============================================
function getRecent() {
  try { return JSON.parse(localStorage.getItem(STORAGE_RECENT)) || []; }
  catch { return []; }
}
function pushRecent(city) {
  let list = getRecent().filter(c => c.toLowerCase() !== city.toLowerCase());
  list.unshift(city);
  list = list.slice(0, 5);
  localStorage.setItem(STORAGE_RECENT, JSON.stringify(list));
  renderRecent();
}
function renderRecent() {
  const list = getRecent();
  recentCitiesEl.innerHTML = '';
  list.forEach(city => {
    const btn = document.createElement('button');
    btn.className = 'chip-btn';
    btn.textContent = city;
    btn.addEventListener('click', () => fetchWeatherByCity(city));
    recentCitiesEl.appendChild(btn);
  });
}

function getFavorites() {
  try { return JSON.parse(localStorage.getItem(STORAGE_FAVORITES)) || []; }
  catch { return []; }
}
function toggleFavorite(city) {
  let list = getFavorites();
  const exists = list.some(c => c.toLowerCase() === city.toLowerCase());
  if (exists) list = list.filter(c => c.toLowerCase() !== city.toLowerCase());
  else list.unshift(city);
  localStorage.setItem(STORAGE_FAVORITES, JSON.stringify(list));
  renderFavorites();
  updateFavButton(city);
}
function renderFavorites() {
  const list = getFavorites();
  favoritesRow.innerHTML = '';
  list.forEach(city => {
    const chip = document.createElement('span');
    chip.className = 'fav-chip';
    chip.innerHTML = `<span></span><button aria-label="Remove ${city} from favorites">×</button>`;
    chip.querySelector('span').textContent = `★ ${city}`;
    chip.querySelector('button').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(city);
    });
    chip.addEventListener('click', () => fetchWeatherByCity(city));
    favoritesRow.appendChild(chip);
  });
}
function updateFavButton(city) {
  const isFav = getFavorites().some(c => c.toLowerCase() === city.toLowerCase());
  favBtn.textContent = isFav ? '★ Saved' : '☆ Save city';
  favBtn.classList.toggle('active', isFav);
}

// ============================================
// Demo data — used automatically if no API key is configured or a request fails
// (e.g. while developing offline). Swap in a real API_KEY to get live data.
// ============================================
function buildDemoData(city) {
  const now = Math.floor(Date.now() / 1000);
  return {
    name: city || 'Lagos',
    main: { temp: 29, feels_like: 32, humidity: 68 },
    wind: { speed: 3.6 },
    weather: [{ description: 'scattered clouds', icon: '03d' }],
    sys: { sunrise: now - 21600, sunset: now + 21600 },
    timezone: 3600,
    dt: now,
    _demo: true
  };
}
function buildDemoForecast() {
  const conditions = [
    { icon: '01d', hi: 31, lo: 24 },
    { icon: '10d', hi: 27, lo: 22 },
    { icon: '03d', hi: 29, lo: 23 },
    { icon: '09d', hi: 28, lo: 22 },
    { icon: '01d', hi: 32, lo: 25 }
  ];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  return conditions.map((c, i) => ({ day: days[i], ...c }));
}

// ============================================
// Fetch — current weather
// ============================================
async function fetchWeatherByCity(city) {
  if (!city || !city.trim()) {
    searchError.textContent = 'Enter a city name to search.';
    return;
  }
  await runFetch(
    () => fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
    () => fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`),
    city
  );
}

async function fetchWeatherByCoords(lat, lon) {
  await runFetch(
    () => fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
    () => fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
    null
  );
}

async function runFetch(currentReq, forecastReq, cityFallback) {
  searchError.textContent = '';
  setLoading(true);

  const keyMissing = !API_KEY || API_KEY === 'YOUR_OPENWEATHER_API_KEY';

  try {
    if (keyMissing) throw new Error('NO_KEY');

    const currentRes = await currentReq();
    const currentJson = await currentRes.json();

    if (String(currentJson.cod) === '404') {
      setLoading(false);
      searchError.textContent = 'City not found — check the spelling and try again.';
      return;
    }
    if (String(currentJson.cod) !== '200') {
      throw new Error(currentJson.message || 'REQUEST_FAILED');
    }

    const forecastRes = await forecastReq();
    const forecastJson = await forecastRes.json();

    currentData = currentJson;
    renderCurrent(currentJson, false);
    renderForecast(aggregateForecast(forecastJson.list), false);
    pushRecent(currentJson.name);
    updateFavButton(currentJson.name);

  } catch (err) {
    // Demo fallback — keeps the app fully browsable without a live key or network.
    const demo = buildDemoData(cityFallback);
    currentData = demo;
    renderCurrent(demo, true);
    renderForecast(buildDemoForecast(), true);
    if (cityFallback) pushRecent(demo.name);
  } finally {
    setLoading(false);
  }
}

// ============================================
// Forecast aggregation — API returns 3-hour steps, we reduce to one entry/day
// ============================================
function aggregateForecast(list) {
  const byDay = {};
  list.forEach(entry => {
    const date = entry.dt_txt.split(' ')[0];
    if (!byDay[date]) byDay[date] = { temps: [], icons: {} };
    byDay[date].temps.push(entry.main.temp);
    const icon = entry.weather[0].icon.replace('n', 'd');
    byDay[date].icons[icon] = (byDay[date].icons[icon] || 0) + 1;
  });

  return Object.keys(byDay).slice(0, 5).map(date => {
    const d = byDay[date];
    const dayName = new Date(date + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short' });
    const topIcon = Object.entries(d.icons).sort((a, b) => b[1] - a[1])[0][0];
    return {
      day: dayName,
      icon: topIcon,
      hi: Math.round(Math.max(...d.temps)),
      lo: Math.round(Math.min(...d.temps))
    };
  });
}

// ============================================
// Rendering
// ============================================
function setLoading(isLoading) {
  loader.classList.toggle('visible', isLoading);
  if (isLoading) {
    readout.classList.remove('visible');
    forecastSection.classList.remove('visible');
  }
}

function renderCurrent(data, isDemo) {
  const family = iconFamilyFromCode(data.weather[0].icon);
  panel.dataset.condition = family;
  weatherIcon.innerHTML = ICONS[family];

  tempValue.textContent = fmtTemp(data.main.temp);
  tempUnit.textContent = `°${unit}`;
  cityName.textContent = data.name;
  conditionEl.textContent = data.weather[0].description;
  localTimeEl.textContent = fmtLocalDateTime(data.timezone || 0);
  feelsLike.textContent = `${fmtTemp(data.main.feels_like)}°`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${data.wind.speed} m/s`;
  sunriseEl.textContent = fmtTime(data.sys.sunrise, data.timezone || 0);
  sunsetEl.textContent = fmtTime(data.sys.sunset, data.timezone || 0);

  readout.classList.add('visible');
  modeNote.textContent = isDemo
    ? 'Showing demo data — add a free OpenWeather API key in script.js for live conditions (see README.md).'
    : '';
}

function renderForecast(days, isDemo) {
  forecastStrip.innerHTML = '';
  days.forEach(d => {
    const family = iconFamilyFromCode(d.icon);
    const card = document.createElement('div');
    card.className = 'forecast-day';
    card.innerHTML = `
      <span class="day-name">${d.day}</span>
      ${ICONS[family]}
      <span class="day-temp">${fmtTemp(d.hi)}° <span class="lo">${fmtTemp(d.lo)}°</span></span>
    `;
    forecastStrip.appendChild(card);
  });
  forecastSection.classList.add('visible');
}

// ============================================
// Event wiring
// ============================================
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchWeatherByCity(cityInput.value.trim());
});

locateBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    searchError.textContent = 'Geolocation is not supported in this browser.';
    return;
  }
  setLoading(true);
  navigator.geolocation.getCurrentPosition(
    (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
    () => {
      setLoading(false);
      searchError.textContent = 'Could not get your location — search by city instead.';
    }
  );
});

favBtn.addEventListener('click', () => {
  if (currentData) toggleFavorite(currentData.name);
});

unitToggle.addEventListener('click', () => {
  unit = unit === 'C' ? 'F' : 'C';
  localStorage.setItem(STORAGE_UNIT, unit);
  unitToggle.querySelectorAll('.unit').forEach(el => {
    el.classList.toggle('active', el.dataset.unit === unit);
  });
  if (currentData) renderCurrent(currentData, !!currentData._demo);
});

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  if (next === 'light') document.documentElement.setAttribute('data-theme', 'light');
  else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem(STORAGE_THEME, next);
});

// ============================================
// Init
// ============================================
(function init() {
  const savedTheme = localStorage.getItem(STORAGE_THEME);
  if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');

  unitToggle.querySelectorAll('.unit').forEach(el => {
    el.classList.toggle('active', el.dataset.unit === unit);
  });

  renderRecent();
  renderFavorites();

  const recent = getRecent();
  fetchWeatherByCity(recent[0] || 'Lagos');
})();
