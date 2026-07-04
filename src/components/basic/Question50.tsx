import { useState, useEffect } from 'react'

function useDebounce<T>(value: T, delay: number = 500): T {
  // デバウンスされた値を返す
  const [debouncedValue, setDebouncedValue] = useState<T>('' as T)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export const Question50 = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 1000)

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Searching for:', debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <p>Input value: {searchTerm}</p>
      <p>Debounced value: {debouncedSearchTerm}</p>
    </div>
  )
}
