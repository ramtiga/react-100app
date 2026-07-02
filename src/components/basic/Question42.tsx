import { EventListeners } from '../EventListeners'
import { useState } from 'react'

export const Question42 = () => {
  const [isShow, setIsShow] = useState(false)

  return (
    <>
      <button onClick={() => setIsShow(!isShow)}>
        {!isShow ? 'コンポーネント表示' : 'コンポーネント非表示'}
      </button>
      <div>{isShow && <EventListeners />}</div>
    </>
  )
}
