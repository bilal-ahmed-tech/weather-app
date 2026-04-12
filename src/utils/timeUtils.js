export function isDay(sunrise, sunset) {
  const now = Date.now() / 1000  // convert to seconds
  return now >= sunrise && now <= sunset
}

export function getTimeOfDay(sunrise, sunset) {
  const now = Date.now() / 1000
  
  if (now < sunrise) return "night"
  if (now < sunrise + 3600) return "dawn"      // 1hr after sunrise
  if (now > sunset - 3600) return "dusk"       // 1hr before sunset
  if (now > sunset) return "night"
  return "day"
}