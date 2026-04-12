function RecentSearches({ searches, onSelect }) {
  if (searches.length === 0) return null

  return (
    <div className="mt-4">
      <p className="text-white/70 text-sm mb-2">Recent Searches</p>
      <div className="flex flex-wrap gap-2">
        {searches.map(city => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-sm rounded-full transition-colors"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RecentSearches