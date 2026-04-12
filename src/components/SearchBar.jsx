import { useState } from "react"

function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(input)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        id="city"
        name="city"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for a city..."
        className="flex-1 px-4 min-w-40 py-3 rounded-2xl border-none outline-none 
                   bg-white/20 text-white placeholder-white/80
                   focus:bg-white/30 focus:ring-2 focus:ring-white/50
                   transition-all duration-300"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-white text-blue-600 font-semibold
                   rounded-xl hover:bg-blue-50 active:scale-95
                   disabled:opacity-50 transition-all duration-300
                   shadow-lg hover:shadow-xl"
      >
        {loading ? "..." : "Search"}
      </button>
    </form>
  )
}

export default SearchBar