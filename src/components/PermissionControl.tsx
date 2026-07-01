import { useState } from 'react'

type UserRole = 'guest' | 'user' | 'admin'

export const PermissionControl = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>('guest')
  const [isShowDetail, setIsShowDetail] = useState(false)

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>権限管理システム</h2>

      <div
        style={{
          marginBottom: '20px',
          padding: '15px',
          border: '1px solid #ddd',
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={isLoggedIn}
            onChange={() => setIsLoggedIn(!isLoggedIn)}
          />
          ログイン状態
        </label>

        <label>
          権限レベル:
          <select
            style={{ marginLeft: '5px' }}
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as UserRole)}
          >
            <option value="guest">ゲスト</option>
            <option value="user">一般ユーザー</option>
            <option value="admin">管理者</option>
          </select>
        </label>
      </div>

      {/* 基本情報（全員表示） */}
      <div
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          margin: '10px 0',
        }}
      >
        <h3>公開情報</h3>
        <p>誰でも見られる情報です</p>
      </div>

      {/* ログインユーザーのみ */}
      {isLoggedIn && (
        <div
          style={{
            border: '1px solid #18cb48',
            padding: '15px',
            margin: '10px 0',
          }}
        >
          <h3>ログインユーザ情報</h3>
        </div>
      )}

      {/* 一般ユーザー以上 */}
      {isLoggedIn && (userRole === 'user' || userRole === 'admin') && (
        <div
          style={{
            border: '1px solid #1a4de3',
            padding: '15px',
            margin: '10px 0',
          }}
        >
          <h3>一般ユーザ情報</h3>
        </div>
      )}

      {/* 管理者のみ */}
      {isLoggedIn && userRole === 'admin' && (
        <div
          style={{
            border: '1px solid #e5091c',
            padding: '15px',
            margin: '10px 0',
          }}
        >
          <h3>管理者情報</h3>
          <div>
            <label htmlFor="admin-detail">
              <input
                id="admin-detail"
                type="checkbox"
                checked={isShowDetail}
                onChange={(e) => setIsShowDetail(e.target.checked)}
              />
              管理者情報詳細
            </label>
          </div>
        </div>
      )}

      {/* 管理者でかつ詳細表示ON */}
      {isLoggedIn && userRole === 'admin' && isShowDetail && (
        <div
          style={{
            border: '1px solid #c7118e',
            padding: '15px',
            margin: '10px 0',
          }}
        >
          <h3>管理者詳細情報</h3>
        </div>
      )}
    </div>
  )
}
