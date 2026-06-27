import { useState } from 'react'

function ToggleSwitch() {
  const [toggle, setToggle] = useState(false)

  const buttonStyle = {
    backgroundColor: !toggle ? '#999' : 'blue',
    color: 'white',
    width: '150px',
    border: 'none',
    padding: '5px',
  }

  const handleToggle = () => {
    setToggle((prev) => !prev)
  }

  return (
    <div>
      <button onClick={handleToggle} style={buttonStyle}>
        {!toggle ? 'OFF' : 'ON'}
      </button>
      <p>現在の状態：{!toggle ? '非アクティブ' : 'アクティブ'}</p>
    </div>
  )
}

export default ToggleSwitch
