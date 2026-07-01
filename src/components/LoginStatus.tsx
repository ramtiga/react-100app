import { useState } from 'react'

export const LoginStatus = () => {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('ゲスト')

  const handleLogin = () => {
    if (!isLoggedIn) {
      setUsername('山田太郎')
      setLoggedIn(true)
    }
  }

  const handleLogout = () => {
    if (isLoggedIn) {
      setLoggedIn(false)
      setUsername('ゲスト')
    }
  }

  return (
    <div>
      <h2>ログイン状態管理</h2>
      {isLoggedIn && (
        <div>
          <p>ようこそ、{username}さん</p>
          <button onClick={handleLogout}>ログアウト</button>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <button onClick={handleLogin}>ログイン</button>
        </div>
      )}
    </div>
  )
}
