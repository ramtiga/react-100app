import { useState, useEffect } from 'react'

export default function StateWatcher() {
  const [count, setCount] = useState(0)
  const [changeCount, setChangeCount] = useState(0)
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    // countの変更を監視
    // 1. 変更回数を増やす
    // 2. 履歴に追加
    // 3. 5の倍数チェック
    if (count === 0) return
    setChangeCount((prev) => prev + 1)
    const timestamp = new Date().toLocaleDateString('ja', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    setHistory((prev) => [...prev, `${timestamp}: ${count}`])
  }, [
    /* 依存配列を設定 */
    count,
  ])

  return (
    <div>
      <h2>状態変更の監視</h2>
      <p>カウント: {count}</p>
      <p>変更回数: {changeCount}</p>

      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(count + 5)}>+5</button>
      <button onClick={() => setCount(0)}>リセット</button>

      <div>
        <h3>履歴:</h3>
        {history.length !== 0 ? (
          <ul>
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>変更履歴はありません</p>
        )}
      </div>
    </div>
  )
}
