import { useState, type ChangeEvent, type KeyboardEvent } from 'react'

type Items = string[]

type KeyPressCount = {
  Enter: number
  Escape: number
  Space: number
}

export const KeyboardEvents = () => {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState<Items>([])
  const [keyPressCount, setKeyPressCount] = useState<KeyPressCount>({
    Enter: 0,
    Escape: 0,
    Space: 0,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setItems((prevItems) => [...items, inputValue])
      setInputValue('')
      setKeyPressCount((prevKeyCount) => ({
        ...prevKeyCount,
        Enter: prevKeyCount.Enter + 1,
      }))
    }

    if (e.key === 'Escape') {
      setInputValue('')
      setKeyPressCount((prevKeyCount) => ({
        ...prevKeyCount,
        Escape: prevKeyCount.Escape + 1,
      }))
    }

    if (e.key === ' ') {
      setKeyPressCount((prevKeyCount) => ({
        ...prevKeyCount,
        Space: prevKeyCount.Space + 1,
      }))
    }

    if (e.ctrlKey && e.key === 'z') {
      setItems((prevItems) => [...items].slice(0, -1))
    }
  }

  return (
    <>
      <p>タスク管理</p>
      <div>
        <input
          type="text"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
      </div>
      <div>
        <p>Enter: {keyPressCount.Enter}</p>
        <p>Escape: {keyPressCount.Escape}</p>
        <p>Space: {keyPressCount.Space}</p>
      </div>
      <div>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
