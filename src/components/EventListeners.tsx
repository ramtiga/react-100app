import { useState, useEffect } from 'react'

type WindowSize = { width: number; height: number }

export const EventListeners = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })
  const [scrollPosition, setScrollPosition] = useState(0)
  const [lastSaved, setLastSaved] = useState<string | null>(null)

  useEffect(() => {
    // リサイズイベント
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      // ウィンドウサイズを更新
      setWindowSize({ width: width, height: height })
    }

    // スクロールイベント
    const handleScroll = () => {
      // スクロール位置を更新
      setScrollPosition(window.scrollY)
    }

    // キーボードイベント
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log('keydown')
      // Ctrl+S で保存処理
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        setLastSaved(new Date().toLocaleDateString('ja'))
      }
    }

    // イベントリスナー登録
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('keydown', handleKeyDown)

    // クリーンアップ
    return () => {
      // 全てのイベントリスナーを削除
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
      console.log('イベントリスナークリア')
    }
  }, [windowSize, scrollPosition])

  return (
    <div style={{ minHeight: '150vh' }}>
      <h2>イベントリスナー管理</h2>

      <div className="info-panel">
        <p>
          ウィンドウサイズ: {windowSize.width} x {windowSize.height}
        </p>
        <p>スクロール位置: {scrollPosition}px</p>
        <p>最終保存: {lastSaved || '未保存'}</p>
        <p className="hint">Ctrl+Sで保存</p>
      </div>

      <div style={{ marginTop: '100px' }}>
        <p>スクロールして位置を確認してください</p>
      </div>
    </div>
  )
}
