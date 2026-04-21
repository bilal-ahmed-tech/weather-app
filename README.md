# 🌤️ WeatherApp

A modern weather forecast application built with React and Vite, powered by the OpenWeather API.

🔗 **Live Demo:** [weather-app-fawn-one-58.vercel.app](https://weather-app-fawn-one-58.vercel.app/)

---

## ✨ Features

### 🔍 Search & Discovery

- Full-text city search with instant results
- Search by city name with comprehensive error handling
- Real-time weather data fetching from OpenWeather API
- Geolocation support - detect current location automatically
- Error messages for invalid cities, network issues, and API errors
- Empty state handling for initial load

### 🌡️ Current Weather Display

- Real-time temperature with "feels like" value
- Weather condition description and icon
- Comprehensive weather metrics: humidity, pressure, visibility, wind speed
- Dual unit support (Celsius/Fahrenheit) with toggle button
- Location display with city name and country code
- Large, readable temperature display with weather icon

### 📅 5-Day Forecast

- Daily forecast cards showing noon temperature
- Weather icon and description for each day
- Day names (Mon, Tue, Wed, etc.) for quick reference
- Filtered to one reading per day for clean display
- Units consistent with current weather display
- Responsive grid layout (scrollable on mobile)

### 🔄 Recent Searches

- Automatically save up to 5 recent searches
- Persistent storage using localStorage
- Quick access to previously searched cities
- Deduplication to prevent duplicate recent searches
- Clear visual list for rapid re-searching

### 🌅 Dynamic Background Styling

- Context-aware gradient backgrounds
- Weather-based color themes:
  - ☀️ Clear skies: Sky blue to deep blue
  - ☁️ Cloudy: Gray tones
  - 🌧️ Rainy: Dark blue-gray
  - ⛈️ Thunderstorm: Deep gray to black
  - ❄️ Snow: Light blue to slate
  - 🌫️ Haze/Mist/Fog: Amber to orange/slate variations
  - 🌧️ Drizzle: Light sky-blue

- Time-aware gradient variations:
  - 🌞 Day: Bright, warm colors
  - 🌅 Dawn: Transitional warm tones
  - 🌆 Dusk: Evening colors
  - 🌙 Night: Dark, deep tones

- Smooth color transitions with CSS animations
- Automatic update based on sunrise/sunset times

### 🎛️ Unit Temperature Toggle

- Switch between Celsius and Fahrenheit instantly
- One-click toggle button in header
- Applied to current weather and 5-day forecast
- Tooltip for clarity on small screens
- State persists through searches

### ⚡ Loading States & Performance

- Full-page loader during initial search
- Error state display with helpful messages
- Memoized background gradient calculation
- Optimized re-renders with React hooks
- Parallel API calls for weather + forecast (Promise.all)
- Efficient DOM updates with conditional rendering

### 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Responsive font sizing (text-2xl → text-3xl on larger screens)
- Flexible padding and spacing adjustments
- Stack layouts on mobile, grid layouts on desktop
- Touch-friendly button sizing
- Readable text on all screen sizes

### 🛡️ Error Handling & Reliability

- Specific error messages:
  - City not found (404)
  - Invalid API key (401)
  - Rate limiting (429)
  - Generic fallback errors
- Try-catch blocks on all async operations
- Graceful fallback UI for network failures
- Geolocation permission error handling
- User-friendly error messaging

### ♿ Accessibility

- Semantic HTML (main, div, button, img)
- ARIA labels on interactive buttons
- Title attributes for tooltips
- Keyboard navigation support
- Clear alt text for weather icons
- High contrast text on backgrounds
- Focus states on buttons

---

## 🛠️ Built With

- **React 19.2.4** — UI framework with hooks
- **Vite** — Fast build tool and development server
- **Tailwind CSS v4** — Utility-first CSS for responsive design
- **React Icons v5** — Icon library (FiSearch, FiMapPin, FiRotateCw)
- **OpenWeather API** — Real-time weather and forecast data
- **localStorage API** — Persistent recent searches storage
- **Geolocation API** — Browser-native location detection

---

## 📁 Project Structure

<details>
<summary><strong>Click to expand</strong></summary>

```plaintext
src/
├── components/
│   ├── ForecastCard.jsx        # Individual forecast day card
│   ├── RecentSearches.jsx      # List of recently searched cities
│   ├── SearchBar.jsx           # Search input with geolocation button
│   └── WeatherCard.jsx         # Main weather display card
├── hooks/
│   └── useWeather.js           # Main weather logic and state management
├── services/
│   └── weatherService.js       # OpenWeather API integration
├── utils/
│   └── timeUtils.js            # Time-of-day detection (dawn, day, dusk, night)
├── assets/                     # Images and static assets
├── App.jsx                     # Main app component with gradient logic
├── index.css                   # Global styles
└── main.jsx                    # Entry point
```

</details>

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- OpenWeather API key ([get one here](https://openweathermap.org/api))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/weather-app

# Navigate to the project folder
cd weather-app

# Install dependencies
npm install

# Create a .env file
printf "VITE_API_KEY=your_openweather_api_key" > .env

# Start the development server
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## 🔧 Available Scripts

- `npm run dev` — Start Vite development server
- `npm run build` — Build production bundle
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint

---

## 🔑 Environment Variables

Create a `.env` file in the project root with:

```env
VITE_API_KEY=your_openweather_api_key
```

**Note:** Get your free API key from [OpenWeather](https://openweathermap.org/api)

---

## 🧠 Key Concepts & Architecture

- **1 Custom React Hook** for centralized weather logic:
  - `useWeather` - Weather data fetching, search, geolocation, unit toggling, and recent searches management

- **API Service Layer** - Modular OpenWeather API integration:
  - `fetchWeather()` - Get current weather by city name
  - `fetchForecast()` - Get 5-day forecast by city name
  - `fetchWeatherByCoords()` - Get current weather by latitude/longitude
  - `fetchForecastByCoords()` - Get forecast by latitude/longitude

- **Time-Based Styling** - Context-aware backgrounds:
  - Detects sunrise/sunset times from weather data
  - Determines time of day (dawn, day, dusk, night)
  - Applies appropriate gradient based on condition + time
  - Smooth CSS transitions for visual appeal

- **localStorage Persistence** - Recent searches persist across sessions
- **Geolocation Integration** - Browser Geolocation API for auto-location detection
- **Error Handling** - Comprehensive error messages for different API failure scenarios
- **Responsive Tailwind CSS** - Mobile-first design with breakpoint-aware layouts
- **Performance Optimization** - React.useMemo for gradient recalculation
- **Promise.all** - Parallel API calls for faster data fetching

---

## 📸 Screenshots

### Home Page — Current Weather & Search

Real-time weather display with search bar, geolocation button, and recent searches
<img src="screenshots/Home.png" width="100%" alt="Home Page showing weather card and search" />
<br/><br/>

### Weather Details — Comprehensive Metrics

Current weather with temperature, feels-like, humidity, pressure, wind speed, and visibility
<img src="screenshots/Weather Details.png" width="100%" alt="Weather details showing all metrics" />
<br/><br/>

### 5-Day Forecast — Upcoming Weather

Daily forecast cards with temperatures, weather conditions, and icons for the next 5 days
<img src="screenshots/Forecast.png" width="100%" alt="5-day forecast display" />
<br/><br/>

### Dynamic Backgrounds — Weather & Time-Based Themes

Beautiful gradient backgrounds that change based on weather condition and time of day
<img src="screenshots/Backgrounds.png" width="100%" alt="Dynamic gradient backgrounds" />

---

## 📝 License

MIT License

_Built as a portfolio project to showcase React, Vite, API integration, responsive design, and dynamic UI rendering._
