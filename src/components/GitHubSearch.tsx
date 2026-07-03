import { useState, useEffect } from 'react'

type Repository = {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
}

type GithubApiResponse = {
  total_count: number
  incomplete_results: boolean
  items: Repository[]
}

export const GitHubSearch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState<string>('')
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // AbortControllerを作成
    const controller = new AbortController()

    const searchRepositories = async () => {
      if (!query.trim()) {
        setRepositories([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        // GitHub API を呼び出し
        const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`
        // signalを渡してキャンセル可能にする
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) {
          throw new Error(`HTTP status: ${res.status}`)
        }
        const data: GithubApiResponse = await res.json()
        setRepositories(data.items)
      } catch (err) {
        // キャンセルエラーと通常のエラーを区別
        if (err instanceof Error) {
          if (err.name == 'AbortError') {
            console.log('Fetch aborted!!')
          } else {
            setError(err.message)
          }
        } else {
          setError('予期しないエラーが発生しました。')
        }
      } finally {
        setIsLoading(false)
      }
    }

    // デバウンス処理
    const timeoutId = setTimeout(() => {
      searchRepositories()
    }, 500)

    // クリーンアップ
    return () => {
      clearTimeout(timeoutId)
      // 通信をキャンセル
      controller.abort()
    }
  }, [query])

  return (
    <div>
      <h2>GitHub リポジトリ検索</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索キーワードを入力..."
      />
      {isLoading && <p>検索中...</p>}
      {error && <p>エラー: {error}</p>}
      <div className="repo-list">
        {repositories.map((repo) => (
          <div key={repo.id} className="repo-card">
            <h3>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.full_name}
              </a>
            </h3>
            <p>{repo.description}</p>
            <div className="repo-stats">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
              <span>📝 {repo.language}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
