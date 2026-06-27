import { useState, type ChangeEvent } from 'react'

function TextInput() {
  const [inputText, setInputText] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    setInputText(input)
  }

  const handleClear = () => {
    setInputText('')
  }

  return (
    <div>
      <input
        id="inputText1"
        type="text"
        value={inputText}
        onChange={handleChange}
      />
      <button onClick={handleClear}>クリア</button>
      <p>{inputText}</p>
      <p>文字数：{inputText.length}</p>
    </div>
  )
}

export default TextInput
