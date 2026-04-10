import { useState } from "react"
import { fetchWeather } from "../services/weatherService"

const MAX_RECENT = 5

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [city, setCity] = useState("")
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("recentSearches")
    return saved ? JSON.parse(saved) : []
  })

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

  async function searchCity(cityName) {
    if (!cityName.trim()) return

    setLoading(true)
    setError(null)
    setWeather(null)

    try {
      const data = await fetchWeather(cityName)
      setWeather(data)
      setCity(cityName)
      saveRecentSearch(cityName)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { weather, loading, error, city, searchCity, recentSearches }
}