import { useState } from 'react'

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const containerStyle = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
    minHeight: '200px',
    padding: '20px',
    transition: 'all 0.3s ease',
  }

  return (
    <div style={containerStyle}>
      <h2 style={containerStyle}>
        {isDarkMode ? 'ダークテーマ' : 'ライトテーマ'}
      </h2>

      <p>現在のテーマ: {isDarkMode ? 'ダークテーマ' : 'ライトテーマ'}</p>

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        style={{
          color: isDarkMode ? '#fff' : '#000',
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
        }}
      >
        {!isDarkMode ? 'ダークに変更' : 'ライトに変更'}
      </button>
    </div>
  )
}
