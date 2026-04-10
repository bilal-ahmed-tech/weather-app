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
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city name..."
        className="flex-1 px-4 py-2 rounded-lg border outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  )
}

export default SearchBar