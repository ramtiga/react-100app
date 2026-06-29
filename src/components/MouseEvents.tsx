import { useState, type MouseEvent } from 'react'

type Position = {
  x: number
  y: number
}

export const MouseEvents = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 })
  const [boxPos, setBoxPos] = useState<Position>({ x: 50, y: 50 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })

    if (isDragging) {
      const newBox = {
        x: e.clientX - rect.left - dragStart.x,
        y: e.clientY - rect.top - dragStart.y,
      }
      setBoxPos(newBox)
    }
  }

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const parentRect = e.currentTarget.parentElement?.getBoundingClientRect()
    if (!parentRect) return
    setIsDragging(true)
    setDragStart({
      x: e.clientX - parentRect.left - boxPos.x,
      y: e.clientY - parentRect.top - boxPos.y,
    })
  }

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(false)
  }

  const handleParentMouseLeave = () => {
    setIsHovered(false)
    setIsDragging(false)
    setBoxPos({ x: 50, y: 50 })
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '400px',
          height: '400px',
          position: 'relative',
          border: '1px solid #ccc',
          overflow: 'hidden',
          margin: '100px auto 30px auto',
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleParentMouseLeave}
      >
        <div
          style={{
            position: 'absolute',
            left: boxPos.x,
            top: boxPos.y,
            width: '100px',
            height: '100px',
            backgroundColor: isHovered ? 'lightgreen' : 'gray',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            transition: isDragging ? 'none' : 'all 0.3s',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
        >
          ドラッグ可能
        </div>
      </div>
      <p>
        マウス座標 x: {mousePos.x} y: {mousePos.y}
      </p>
    </div>
  )
}
