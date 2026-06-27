import { useState } from 'react'

const ClickButtons = () => {
  const [lastButton, setLastButton] = useState('')

  const handleButton = (buttonNumber: number) => {
    setLastButton(`ボタン${buttonNumber}が押されました`)
  }

  return (
    <div>
      <button onClick={() => handleButton(1)}>ボタン1</button>
      <button onClick={() => handleButton(2)}>ボタン2</button>
      <button onClick={() => handleButton(3)}>ボタン3</button>
      <p>最後のボタン： {lastButton}</p>
    </div>
  )
}

export default ClickButtons
