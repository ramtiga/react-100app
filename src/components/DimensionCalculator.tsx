import { useState, useEffect } from 'react'

type AspectRatio = '正方形' | '横長' | '縦長' | ''

export const DimensionCalculator = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [area, setArea] = useState(0)
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('')
  const [sizeHistory, setSizeHistory] = useState<string[]>([])

  const getAspectRatio = (): AspectRatio => {
    if (width === 0 && height === 0) return ''

    if (width === height) {
      return '正方形'
    }
    if (width > height) {
      return '横長'
    }
    if (width < height) {
      return '縦長'
    }
    return ''
  }

  useEffect(() => {
    // 幅と高さの変更を監視
    // 1. 面積を計算
    // 2. アスペクト比を判定
    // 3. 履歴に追加（最新5件）
    if (width === 0 && height === 0) return

    const calculatedArea = width * height
    setArea(calculatedArea)
    const aspect = getAspectRatio()
    setAspectRatio(aspect)

    const timestamp = new Date().toLocaleDateString('ja', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    const newHistoryItem = `${timestamp} 幅:${width} 高さ:${height} 面積:${area}`
    setSizeHistory((prev) => {
      const newHistory = [newHistoryItem, ...prev]
      return newHistory.slice(0, 5)
    })
  }, [
    /* 複数の依存値 */
    width,
    height,
  ])

  return (
    <div>
      <h2>寸法計算機</h2>

      <div>
        <label>
          幅:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
        </label>
      </div>

      <div>
        <label>
          高さ:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </label>
      </div>

      <div>
        <p>面積: {area}</p>
        <p>形状: {aspectRatio}</p>
      </div>

      <div>
        <h3>変更履歴（最新5件）:</h3>
        <ul>
          {sizeHistory.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
