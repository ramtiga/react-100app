import { useState, type MouseEvent } from 'react'

type Position = {
  x: number
  y: number
}

export const EventInfo = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [bgColor, setBgColor] = useState('white')
  const [count, setCount] = useState(0)

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    // クリック時
    setPosition({ x: e.clientX, y: e.clientY })
    setCount((prev) => prev + 1)

    if (e.shiftKey) {
      setBgColor('lightBlue')
    } else {
      setBgColor('white')
    }
  }

  const handleContextClick = (e: MouseEvent<HTMLDivElement>) => {
    // 右クリック
    e.preventDefault()
    alert('右クリックは無効です')
  }
  const handleDoubleClick = () => {
    // ダブルクリック
    setCount(0)
  }

  return (
    <div
      style={{
        height: '300px',
        backgroundColor: bgColor,
        position: 'relative',
        border: '1px solid #ccc',
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextClick}
    >
      <p>
        クリック位置： x:{position.x} y: {position.y}
      </p>
      <p>クリック数：{count}</p>
    </div>
  )
}
