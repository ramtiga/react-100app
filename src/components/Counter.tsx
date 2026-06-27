import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  const handleCountUp = () => {
    setCount((prev) => prev + 1)
  }
  const handleCountDown = () => {
    setCount((prev) => prev - 1)
  }
  const handleReset = () => {
    setCount(0)
  }
  return (
    <div>
      <h2>カウンター： {count}</h2>
      <button onClick={handleCountUp}>+</button>
      <button onClick={handleCountDown}>-</button>
      <button onClick={handleReset}>リセット</button>
    </div>
  )
}

export default Counter
