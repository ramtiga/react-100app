import { useState } from 'react'

type UseCounterReturn = {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

function useCounter(initialValue = 0): UseCounterReturn {
  const [count, setCount] = useState(initialValue)
  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => prev - 1)
  const reset = () => setCount(initialValue)

  return { count, increment, decrement, reset }
}

export const Question46 = () => {
  const { count, increment, decrement, reset } = useCounter(10)
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}> +1 </button>
      <button onClick={decrement}> -1 </button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
