function WeatherCard({ weather, units }) {
  const {
     name,
  visibility,
  sys: { country },
  main: { temp, feels_like, humidity, pressure },
  wind: { speed },
  weather: [{ description, icon }],
  } = weather;
  const unit = units === "metric" ? "°C" : "°F";
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div
      className="mt-6 bg-white/20 backdrop-blur-md rounded-3xl p-6 
                    text-white shadow-2xl border border-white/30
                    transition-all duration-500">
      {/* City Name */}
      <div className="text-center mb-2">
        <h2 className="text-3xl font-bold tracking-wide">
          {name}, {country}
        </h2>
        <p className="capitalize text-white/70 mt-1 tracking-widest text-sm">
          {description}
        </p>
      </div>

      {/* Icon + Temperature */}
      <div className="flex items-center justify-center gap-2 my-6">
        <img
          src={iconUrl}
          alt={description}
          className="w-24 h-24 drop-shadow-lg"
        />
        <span className="text-8xl font-thin tracking-tighter">
          {Math.round(temp)}
          {unit}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 my-4" />

      {/* Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
        <div
          className="bg-white/10 hover:bg-white/20 rounded-2xl p-4
                        transition-all duration-300 cursor-default">
          <p className="text-xs text-white/60 uppercase tracking-widest mb-1">
            Feels Like
          </p>
          <p className="text-2xl font-semibold">
            {Math.round(feels_like)}
            {unit}
          </p>
        </div>
        <div
          className="bg-white/10 hover:bg-white/20 rounded-2xl p-4
                        transition-all duration-300 cursor-default">
          <p className="text-xs text-white/60 uppercase tracking-widest mb-1">
            Humidity
          </p>
          <p className="text-2xl font-semibold">{humidity}%</p>
        </div>
        <div
          className="bg-white/10 hover:bg-white/20 rounded-2xl p-4
                        transition-all duration-300 cursor-default">
          <p className="text-xs text-white/60 uppercase tracking-widest mb-1">
            Wind
          </p>
          <p className="text-2xl font-semibold">{speed}m/s</p>
        </div>
        <div
          className="bg-white/10 hover:bg-white/20 rounded-2xl p-4
                  transition-all duration-300 cursor-default">
          <p className="text-xs text-white/60 uppercase tracking-widest mb-1">
            Visibility
          </p>
          <p className="text-xl font-semibold">
            {(visibility / 1000).toFixed(1)} km
          </p>
        </div>
        <div
          className="bg-white/10 hover:bg-white/20 rounded-2xl p-4
                  transition-all duration-300 cursor-default">
          <p className="text-xs text-white/60 uppercase tracking-widest mb-1">
            Pressure
          </p>
          <p className="text-xl font-semibold">{pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
