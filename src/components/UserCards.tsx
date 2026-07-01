import { useState } from 'react'

type User = {
  id: number
  name: string
  age: number
  email: string
}

export const UserCards = () => {
  const [users] = useState<User[]>([
    { id: 1, name: '田中太郎', age: 25, email: 'tanaka@example.com' },
    { id: 2, name: '鈴木花子', age: 18, email: 'suzuki@example.com' },
    { id: 3, name: '佐藤次郎', age: 65, email: 'sato@example.com' },
    { id: 4, name: '高橋美咲', age: 32, email: 'takahashi@example.com' },
  ])

  const getAgeColor = (age: number) => {
    if (age < 20) return 'red'
    if (age >= 20 && age < 60) return 'green'
    if (age >= 60) return 'blue'
  }

  return (
    <div>
      <h2>ユーザー一覧</h2>
      <div className="user-cards">
        {users.map((user) => (
          <div key={user.id}>
            <div
              className="user-card"
              style={{ backgroundColor: getAgeColor(user.age) }}
            >
              <p>{user.name}</p>
              <p>{user.age}</p>
              <p>
                <a href={`mailto: ${user.email}`}>{user.email}</a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
