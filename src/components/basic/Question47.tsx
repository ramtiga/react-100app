import { useState } from 'react'

function useLocalStorage(key: string, initialValue: string) {
  // ローカルストレージから初期値を取得
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  // 値の更新時に自動保存
  const setValue = (inputValue: string) => {
    setStoredValue(inputValue)
    localStorage.setItem(key, JSON.stringify(inputValue))
  }

  // removeValue関数の実装
  const removeName = () => {
    localStorage.removeItem(key)
    setStoredValue(initialValue)
  }

  return { storedValue, setValue, removeName }
}

export const Question47 = () => {
  const {
    storedValue: name,
    setValue: setName,
    removeName,
  } = useLocalStorage('userName', '')
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Stored name: {name}</p>
      <button onClick={removeName}>Clear Storage</button>
    </div>
  )
}
