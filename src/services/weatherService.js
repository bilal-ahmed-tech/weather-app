const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function fetchWeather(city, units = "metric") {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${units}`
  )

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Please check the name and try again.")
    } else if (response.status === 401) {
      throw new Error("Invalid API key. Please check your configuration.")
    } else if (response.status === 429) {
      throw new Error("Too many requests. Please wait a moment and try again.")
    } else {
      throw new Error("Something went wrong. Please try again later.")
    }
  }

  const data = await response.json()
  return data
}

export async function fetchForecast(city, units = "metric") {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`
  )

  if (!response.ok) {
    throw new Error("Could not fetch forecast.")
  }

  const data = await response.json()
  
  // Filter one reading per day at noon
  const daily = data.list.filter(item => 
    item.dt_txt.includes("12:00:00")
  )

  return daily
}
export async function fetchWeatherByCoords(lat, lon, units = "metric") {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
  )

  if (!response.ok) {
    throw new Error("Could not fetch weather for your location.")
  }

  const data = await response.json()
  return data
}

export async function fetchForecastByCoords(lat, lon, units = "metric") {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
  )

  if (!response.ok) {
    throw new Error("Could not fetch forecast for your location.")
  }

  const data = await response.json()
  const daily = data.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  )
  return daily
}