import { useState, useEffect } from 'react'

type User = {
  id: number
  name: string
  email: string
}

function useFetch(url: string) {
  // loading, data, errorの状態管理
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<User | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) {
          throw new Error(`Http status: ${res.status}`)
        }
        const data: User = await res.json()
        setData(data)
      } catch (error) {
        if (controller.signal.aborted) {
          console.log('fetch aborted.')
        } else if (error instanceof Error) {
          console.log(error.message)
          setError(error)
        } else {
          console.log('予期せぬエラーが発生しました')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()

    return () => {
      console.log('クリーンアップ実行')
      setLoading(false)
      setError(null)
      controller.abort()
    }
  }, [url])

  return { loading, data, error }
}

export const Question48 = () => {
  const [userId, setUserId] = useState(1)
  const { data, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>User Info</h2>
      <p>Name: {data?.name}</p>
      <p>Email: {data?.email}</p>
      <button onClick={() => setUserId(userId + 1)}>Next User</button>
    </div>
  )
}
