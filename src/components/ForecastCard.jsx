function ForecastCard({ day, units }) {
  const date = new Date(day.dt_txt)
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
  const temp = Math.round(day.main.temp)
  const icon = day.weather[0].icon
  const description = day.weather[0].description
  const unit = units === "metric" ? "°C" : "°F"
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <div className="bg-white/10 hover:bg-white/20 rounded-2xl p-4 
                    text-white text-center transition-all duration-300
                    flex flex-col items-center gap-1">
      <p className="font-semibold text-sm">{dayName}</p>
      <img src={iconUrl} alt={description} className="w-12 h-12" />
      <p className="text-xl font-bold">{temp}{unit}</p>
      <p className="text-xs text-white/60 capitalize">{description}</p>
    </div>
  )
}

export default ForecastCard