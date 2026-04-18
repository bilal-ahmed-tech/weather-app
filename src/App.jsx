import { useMemo } from "react";
import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import RecentSearches from "./components/RecentSearches";
import ForecastCard from "./components/ForecastCard";
import { getTimeOfDay } from "./utils/timeUtils";

const bgConfig = {
  // Clear
  Clear_day:          "from-sky-400 via-blue-500 to-blue-700",
  Clear_dawn:         "from-amber-400 via-rose-400 to-purple-600",
  Clear_dusk:         "from-orange-400 via-rose-500 to-indigo-700",
  Clear_night:        "from-slate-900 via-indigo-950 to-slate-950",

  // Clouds
  Clouds_day:         "from-slate-400 via-slate-500 to-slate-600",
  Clouds_dawn:        "from-slate-400 via-rose-300 to-slate-500",
  Clouds_night:       "from-slate-700 via-slate-800 to-slate-900",

  // Rain
  Rain_day:           "from-slate-500 via-blue-700 to-slate-800",
  Rain_night:         "from-slate-800 via-blue-950 to-slate-950",

  // Thunderstorm
  Thunderstorm_day:   "from-slate-700 via-gray-800 to-slate-900",
  Thunderstorm_night: "from-gray-900 via-slate-950 to-black",

  // Snow
  Snow_day:           "from-sky-200 via-blue-300 to-slate-400",
  Snow_night:         "from-slate-600 via-blue-900 to-slate-900",

  // Haze / Mist / Fog
  Haze_day:           "from-amber-300 via-orange-400 to-amber-600",
  Haze_night:         "from-slate-600 via-gray-700 to-slate-800",
  Mist_day:           "from-slate-300 via-gray-400 to-slate-500",
  Mist_night:         "from-slate-600 via-slate-700 to-slate-800",

  // Drizzle
  Drizzle_day:        "from-slate-400 via-sky-500 to-slate-600",
  Drizzle_night:      "from-slate-700 via-sky-900 to-slate-900",
};

const DEFAULT_BG = "from-slate-600 via-slate-700 to-slate-800";

function App() {
  const {
    weather,
    forecast,
    loading,
    error,
    searchCity,
    getLocation,
    recentSearches,
    units,
    toggleUnits,
  } = useWeather();

  // Memoize background gradient to avoid recalculating on every render
  const bgClass = useMemo(() => {
    if (!weather) return DEFAULT_BG;
    const condition = weather.weather[0]?.main ?? "Unknown";
    const timeOfDay = getTimeOfDay(weather.sys.sunrise, weather.sys.sunset) || "day";
    const bgKey = `${condition}_${timeOfDay}`;
    return bgConfig[bgKey] || bgConfig[`${condition}_day`] || DEFAULT_BG;
  }, [weather]);

  return (
    <main className={`min-h-screen bg-linear-to-br ${bgClass} p-4 sm:p-6 transition-colors duration-700`}>
      <div className="max-w-3xl mx-auto">
        {/* Header - responsive font size */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
            Weather App
          </h1>
          <div className="relative group">
            <button
              onClick={toggleUnits}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 hover:bg-white/30 
                         text-white rounded-xl font-semibold text-sm sm:text-base
                         transition-all duration-300 active:scale-95"
              aria-label={`Switch to ${units === "metric" ? "Fahrenheit" : "Celsius"}`}
              title={`Switch to ${units === "metric" ? "Fahrenheit" : "Celsius"}`}
            >
              °{units === "metric" ? "C" : "F"}
            </button>
            {/* Tooltip – hidden on very small screens if needed, but works */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2
                             bg-black/70 text-white text-xs px-2 py-1 
                             rounded-lg whitespace-nowrap
                             opacity-0 group-hover:opacity-100
                             transition-opacity duration-200 pointer-events-none
                             text-[10px] sm:text-xs">
              Switch to °{units === "metric" ? "F" : "C"}
            </span>
          </div>
        </div>

        {/* Search + Location – stack on mobile? No, use flex with gap-2 works well */}
        <div className="flex gap-2">
          <div className="flex-1 min-w-0">
            <SearchBar onSearch={searchCity} loading={loading} />
          </div>
          <div className="relative group">
            <button
              onClick={getLocation}
              disabled={loading}
              className="px-3 sm:px-4 py-3 bg-white/20 hover:bg-white/30
                         text-white rounded-2xl transition-all 
                         duration-300 active:scale-95 disabled:opacity-50
                         text-lg sm:text-xl h-full"
              aria-label="Use my current location"
              title="Use my current location"
            >
              🌐
            </button>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2
                             bg-black/70 text-white text-[10px] sm:text-xs px-2 py-1 
                             rounded-lg whitespace-nowrap
                             opacity-0 group-hover:opacity-100
                             transition-opacity duration-200 pointer-events-none">
              My location
            </span>
          </div>
        </div>

        {/* Recent searches – responsive spacing */}
        <div className="mt-4 sm:mt-5">
          <RecentSearches searches={recentSearches} onSelect={searchCity} />
        </div>

        {/* Loading state with accessibility */}
        {loading && (
          <div className="mt-8 text-center text-white" role="status" aria-live="polite">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3" aria-hidden="true" />
            <p className="text-base sm:text-lg">Searching for weather...</p>
          </div>
        )}

        {/* Error message – responsive padding */}
        {error && (
          <div className="mt-6 bg-red-400/30 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-white text-center" role="alert">
            <p className="text-3xl sm:text-4xl mb-2" aria-hidden="true">🌧️</p>
            <p className="text-lg sm:text-xl font-semibold">Unable to load weather</p>
            <p className="text-xs sm:text-sm opacity-75 mt-1">{error}</p>
          </div>
        )}

        {/* Weather card – full width, no extra margins needed */}
        {weather && !error && <WeatherCard weather={weather} units={units} />}

        {/* Forecast section – responsive grid */}
        {forecast.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <p className="text-white/70 text-xs sm:text-sm mb-2 sm:mb-3">
              5‑Day Forecast
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
              {forecast.map((day) => (
                <ForecastCard key={day.dt} day={day} units={units} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;