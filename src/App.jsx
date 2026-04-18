import { useWeather } from "./hooks/useWeather"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import RecentSearches from "./components/RecentSearches"
import ForecastCard from "./components/ForecastCard"
import { getTimeOfDay } from "./utils/timeUtils"

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
}

// Default — deep neutral blue-gray, works for any unknown condition
const DEFAULT_BG = "from-slate-600 via-slate-700 to-slate-800"

function App() {
  const { weather, forecast, loading, error, searchCity, getLocation, recentSearches, units, toggleUnits } = useWeather()
  
  const condition = weather?.weather[0]?.main
  const timeOfDay = weather
  ? getTimeOfDay(weather.sys.sunrise, weather.sys.sunset)
  : "day"
  const bgKey = `${condition}_${timeOfDay}`
  const bg = bgConfig[bgKey] || bgConfig[`${condition}_day`] || DEFAULT_BG

  return (
    <main className={`min-h-screen bg-linear-to-br ${bg} p-6 transition-colors duration-700`}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Weather App</h1>
          <div className="relative group">
            <button
              onClick={toggleUnits}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 
                         text-white rounded-xl font-semibold
                         transition-all duration-300 active:scale-95"
            >
              °{units === "metric" ? "C" : "F"}
            </button>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2
                             bg-black/70 text-white text-xs px-2 py-1 
                             rounded-lg whitespace-nowrap
                             opacity-0 group-hover:opacity-100
                             transition-opacity duration-200">
              Switch to °{units === "metric" ? "F" : "C"}
            </span>
          </div>
        </div>

        {/* Search + Location */}
        <div className="flex gap-2">
          <div className="flex-1">
            <SearchBar onSearch={searchCity} loading={loading} />
          </div>
          <div className="relative group">
            <button
              onClick={getLocation}
              disabled={loading}
              className="px-4 py-3 bg-white/20 hover:bg-white/30
                         text-white rounded-2xl transition-all 
                         duration-300 active:scale-95 disabled:opacity-50
                         text-xl h-full"
            >
              🌐
            </button>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2
                             bg-black/70 text-white text-xs px-2 py-1 
                             rounded-lg whitespace-nowrap
                             opacity-0 group-hover:opacity-100
                             transition-opacity duration-200">
              Use my location
            </span>
          </div>
        </div>

        <RecentSearches searches={recentSearches} onSelect={searchCity} />

        {loading && (
          <div className="mt-8 text-center text-white">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3" />
            <p className="text-lg">Searching...</p>
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-400/30 backdrop-blur-md rounded-2xl p-5 text-white text-center">
            <p className="text-4xl mb-2">🌧️</p>
            <p className="text-xl font-semibold">Oops!</p>
            <p className="text-sm opacity-75 mt-1">{error}</p>
          </div>
        )}

        {weather && !error && <WeatherCard weather={weather} units={units} />}

        {forecast.length > 0 && (
          <div className="mt-6">
            <p className="text-white/70 text-sm mb-3">5 Day Forecast</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {forecast.map(day => (
                <ForecastCard key={day.dt} day={day} units={units} />
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}

export default App