import { useState, useEffect } from 'react'

type Geo = {
  lat: string
  lng: string
}

type Address = {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

type Company = {
  name: string
  catchPhrase: string
  bas: string
}

type User = {
  id: number
  name: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export const UserFetch = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // API通信を実装
        const url = 'https://jsonplaceholder.typicode.com/users'
        const res = await fetch(url)
        if (!res.ok) {
          throw new Error(`HTTP status: ${res.status}`)
        }
        const data: User[] = await res.json()
        setUsers(data)
      } catch (err) {
        //  // エラーハンドリング
        if (err instanceof Error) {
          setError(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [retryCount]) // リトライ時に再実行

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1)
  }

  if (isLoading) {
    return <div>読み込み中...</div>
  }

  if (error) {
    return (
      <div>
        <p>エラー: {error}</p>
        <button onClick={handleRetry}>リトライ ({retryCount})</button>
      </div>
    )
  }

  return (
    <div>
      <h2>ユーザー一覧</h2>
      <button onClick={handleRetry}>再読み込み</button>

      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.company?.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
