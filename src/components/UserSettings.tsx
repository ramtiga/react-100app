import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'auto'
type FontSize = 'small' | 'medium' | 'large'
type Language = 'ja' | 'en' | 'zh'

type UserSettings = {
  theme: Theme
  fontSize: FontSize
  language: Language
  notifications: boolean
}

const STORAGE_KEY = 'user_settings'

export const UserSettings = () => {
  const getStorageItem = (): UserSettings => {
    const saveSettings = localStorage.getItem(STORAGE_KEY)
    if (saveSettings) {
      return JSON.parse(saveSettings)
    } else {
      return {
        theme: 'light',
        fontSize: 'medium',
        language: 'ja',
        notifications: true,
      }
    }
  }
  const [settings, setSettings] = useState<UserSettings>(getStorageItem())
  const [isInitialized, setIsInitialized] = useState(false)

  // マウント時に初期化フラグを設定
  useEffect(() => {
    setIsInitialized(true)
  }, [])

  // 設定変更時に自動保存
  useEffect(() => {
    if (!isInitialized) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [
    /* 監視対象 */
    [settings, isInitialized],
  ])

  const updateSetting = (
    key: keyof UserSettings,
    value: UserSettings[keyof UserSettings],
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const resetSettings = () => {
    setIsInitialized(false)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div>
      <h2>ユーザー設定</h2>

      <div>
        <label>
          テーマ:
          <select
            value={settings.theme}
            onChange={(e) => updateSetting('theme', e.target.value as Theme)}
          >
            <option value="light">ライト</option>
            <option value="dark">ダーク</option>
            <option value="auto">自動</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          フォントサイズ:
          <select
            value={settings.fontSize}
            onChange={(e) =>
              updateSetting('fontSize', e.target.value as FontSize)
            }
          >
            <option value="small">小</option>
            <option value="medium">中</option>
            <option value="large">大</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          言語:
          <select
            value={settings.language}
            onChange={(e) =>
              updateSetting('language', e.target.value as Language)
            }
          >
            <option value="ja">日本語</option>
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => updateSetting('notifications', e.target.checked)}
          />
          通知を有効にする
        </label>
      </div>

      <button onClick={resetSettings}>設定をリセット</button>

      <div>
        <h3>現在の設定:</h3>
        <pre>{JSON.stringify(settings, null, 2)}</pre>
      </div>
    </div>
  )
}
