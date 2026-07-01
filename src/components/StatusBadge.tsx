import { useState } from 'react'

type Status = 'success' | 'warning' | 'error' | 'info'
type Size = 'small' | 'medium' | 'large'

export const StatusBadge = () => {
  const [status, setStatus] = useState<Status>('info')
  const [isAnimated, setIsAnimated] = useState(false)
  const [size, setSize] = useState<Size>('medium')

  const badgeClassName = [
    'badge',
    `badge-${status}`,
    `badge-${size}`,
    isAnimated && 'animated',
  ]
    .filter(Boolean)
    .join(' ')

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return '✔'
      case 'warning':
        return '⚠'
      case 'error':
        return '✗'
      case 'info':
        return 'ℹ'
      default:
        return '?'
    }
  }

  return (
    <div>
      <h3>ステータスバッジ</h3>

      <div className="controls">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
        >
          <option value="success">成功</option>
          <option value="warning">警告</option>
          <option value="error">エラー</option>
          <option value="info">情報</option>
        </select>

        <select value={size} onChange={(e) => setSize(e.target.value as Size)}>
          <option value="small">小</option>
          <option value="medium">中</option>
          <option value="large">大</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={isAnimated}
            onChange={() => setIsAnimated(!isAnimated)}
          />
          アニメーション
        </label>
      </div>

      <div className={badgeClassName}>
        <span>{getStatusIcon()}</span>
        <span>{status.toUpperCase()}</span>
      </div>
    </div>
  )
}
