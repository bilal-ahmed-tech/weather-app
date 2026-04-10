function WeatherCard({ weather }) {
  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity },
    wind: { speed },
    weather: [{ description, icon }],
  } = weather

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <div className="mt-6 bg-white/20 backdrop-blur-md rounded-2xl p-6 text-white">
      
      {/* City Name */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold">{name}, {country}</h2>
        <p className="capitalize text-lg mt-1">{description}</p>
      </div>

      {/* Icon + Temperature */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <img src={iconUrl} alt={description} className="w-20 h-20" />
        <span className="text-7xl font-thin">{Math.round(temp)}°</span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-sm opacity-75">Feels Like</p>
          <p className="text-xl font-semibold">{Math.round(feels_like)}°</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-sm opacity-75">Humidity</p>
          <p className="text-xl font-semibold">{humidity}%</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-sm opacity-75">Wind</p>
          <p className="text-xl font-semibold">{speed} m/s</p>
        </div>
      </div>

    </div>
  )
}

export default WeatherCard