import { useState, useEffect } from 'react'

type WindowSize = {
  width: number
  height: number
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    let timerId: number
    const handleResize = () => {
      clearTimeout(timerId)

      timerId = setTimeout(() => {
        console.log('resize!')
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }, 300)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timerId)
    }
  }, [])

  // デバウンス処理の実装

  return windowSize
}

export const Question52 = () => {
  const { width, height } = useWindowSize()

  return (
    <div>
      <h2>Window Size Monitor</h2>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
      <div
        style={{
          width: '100px',
          height: '100px',
          background: width > 768 ? 'green' : 'red',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {width > 768 ? 'Desktop' : 'Mobile'}
      </div>
    </div>
  )
}
