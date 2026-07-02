import { useEffect, useState } from 'react'

export const MountEffect = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    console.log('マウントされました')
    setMessage('コンポーネントがマウントされました')
  }, []) // 空の依存配列

  return (
    <div>
      <h2>マウント時の処理</h2>
      <p>メッセージ: {message}</p>
    </div>
  )
}
