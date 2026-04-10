const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"
export async function fetchWeather(city) {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  )
 
  if (!response.ok) {
    throw new Error("City not found")
  }

  const data = await response.json()
  return data
}