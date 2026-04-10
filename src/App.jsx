import { useWeather } from "./hooks/useWeather"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import RecentSearches from "./components/RecentSearches"

function App() {
  const { weather, loading, error, searchCity, recentSearches } = useWeather()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Weather App
        </h1>

        <SearchBar onSearch={searchCity} loading={loading} />
        
        <RecentSearches 
          searches={recentSearches} 
          onSelect={searchCity} 
        />

        {loading && (
          <div className="mt-8 text-center text-white">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3" />
            <p className="text-lg">Searching...</p>
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-400/30 backdrop-blur-md rounded-2xl p-5 text-white text-center">
            <p className="text-4xl mb-2">🌧️</p>
            <p className="text-xl font-semibold">City not found</p>
            <p className="text-sm opacity-75 mt-1">Please check the city name and try again</p>
          </div>
        )}

        {weather && !error && <WeatherCard weather={weather} />}
      </div>
    </div>
  )
}

export default App