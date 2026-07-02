import { useState, useEffect } from 'react'

export const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(120)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let intervalId

    if (isRunning && seconds > 0) {
      // タイマーを開始
      intervalId = setInterval(() => {
        // 1秒ずつ減らす
        setSeconds((prev) => prev - 1)
      }, 1000)
    } else if (seconds === 0) {
      // 0になったらアラート
      setIsRunning(false)
    }

    // クリーンアップ関数
    return () => {
      // タイマーをクリア
      if (intervalId) {
        clearInterval(intervalId)
        console.log('クリーンアップ！：タイマーキャンセル')
      }
    }
  }, [
    /* 監視対象 */
    seconds,
    isRunning,
  ])

  const handleStart = () => setIsRunning(true)
  const handleStop = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setSeconds(60)
  }

  return (
    <div>
      <h2>カウントダウンタイマー</h2>
      <div className="timer-display">
        <h1>
          {Math.floor(seconds / 60)}:
          {(seconds % 60).toString().padStart(2, '0')}
        </h1>
      </div>

      <div className="controls">
        <button onClick={handleStart} disabled={isRunning || seconds === 0}>
          スタート
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          ストップ
        </button>
        <button onClick={handleReset}>リセット</button>
      </div>
    </div>
  )
}
