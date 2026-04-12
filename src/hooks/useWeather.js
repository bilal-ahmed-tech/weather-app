import { useState } from "react"
import { 
  fetchWeather, 
  fetchForecast,
  fetchWeatherByCoords,
  fetchForecastByCoords,
} from "../services/weatherService"

const MAX_RECENT = 5

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [city, setCity] = useState("")
  const [units, setUnits] = useState("metric")
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches")
    return saved ? JSON.parse(saved) : []
  })

  function toggleUnits() {
    const newUnits = units === "metric" ? "imperial" : "metric"
    setUnits(newUnits)
    if (city) searchCity(city, newUnits)
  }

  function saveRecentSearch(cityName) {
    setRecentSearches(prev => {
      const filtered = prev.filter(c =>
        c.toLowerCase() !== cityName.toLowerCase()
      )
      const updated = [cityName, ...filtered].slice(0, MAX_RECENT)
      localStorage.setItem("recentSearches", JSON.stringify(updated))
      return updated
    })
  }

  async function searchCity(cityName, currentUnits = units) {
    if (!cityName.trim()) return

    setLoading(true)
    setError(null)
    setWeather(null)
    setForecast([])

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeather(cityName, currentUnits),
        fetchForecast(cityName, currentUnits)
      ])
      setWeather(weatherData)
      setForecast(forecastData)
      setCity(cityName)
      saveRecentSearch(cityName)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function getLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.")
      return
    }

    setLoading(true)
    setError(null)
    setWeather(null)
    setForecast([])

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const [weatherData, forecastData] = await Promise.all([
            fetchWeatherByCoords(latitude, longitude, units),
            fetchForecastByCoords(latitude, longitude, units)
          ])
          setWeather(weatherData)
          setForecast(forecastData)
          setCity(weatherData.name)
          saveRecentSearch(weatherData.name)
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      },
      (err) => {
        setError("Location access denied. Please enable location permissions.")
        setLoading(false)
      }
    )
  }

  return { 
    weather, forecast, loading, error, 
    city, searchCity, getLocation,
    recentSearches, units, toggleUnits 
  }
}