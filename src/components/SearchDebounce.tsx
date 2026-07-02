import { useState, useEffect } from 'react'

export const SearchDebounce = () => {
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchCount, setSearchCount] = useState(0)
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  useEffect(() => {
    console.log(`useEffect: タイマー開始`)
    // デバウンス処理を実装
    // 1. 入力中フラグを立てる
    setIsTyping(true)
    // 2. タイマーを設定（500ms）
    const timer = setTimeout(() => {
      console.log('タイマークリア')
      setSearchTerm(inputValue)
      setIsTyping(false)
      console.log(`検検文字列: ${inputValue}`)
    }, 500)

    // 3. タイマー完了後に検索実行
    // クリーンアップでタイマーをクリア
    return () => clearTimeout(timer)
  }, [inputValue])

  useEffect(() => {
    // 実際の検索処理
    if (searchTerm) {
      // 検索を実行（シミュレーション）
      // 検索回数を増やす
      setSearchCount((prev) => prev + 1)
      // 履歴に追加
      setSearchHistory((prev) => [searchTerm, ...prev])
    }
  }, [searchTerm])

  return (
    <div>
      <h2>デバウンス検索</h2>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="検索キーワードを入力..."
      />

      {isTyping && <span>入力中...</span>}

      <div>
        <p>検索キーワード: {searchTerm}</p>
        <p>検索実行回数: {searchCount}</p>
      </div>

      <div>
        <h3>検索履歴:</h3>
        <ul>
          {searchHistory.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
