import { useState } from 'react'

type Item = {
  id: number
  title: string
  description: string
}

type viewComponentProps = {
  items: Item[]
}

function CardView({ items }: viewComponentProps) {
  return (
    <div className="card-view">
      {items.map((item) => (
        <div key={item.id} className="card">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  )
}

function ListView({ items }: viewComponentProps) {
  return (
    <ul className="list-view">
      {items.map((item) => (
        <li key={item.id}>
          <strong>{item.title}:</strong> {item.description}
        </li>
      ))}
    </ul>
  )
}

function GridView({ items }: viewComponentProps) {
  return (
    <div className="grid-view">
      {items.map((item) => (
        <div key={item.id} className="grid-item">
          <div>{item.title}</div>
        </div>
      ))}
    </div>
  )
}

type ViewMode = 'card' | 'list' | 'grid'

export const ViewModeSwitcher = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('card') // card, list, grid

  const items: Item[] = [
    { id: 1, title: 'アイテム1', description: '説明1' },
    { id: 2, title: 'アイテム2', description: '説明2' },
    { id: 3, title: 'アイテム3', description: '説明3' },
  ]

  const renderContent = (viewMode: ViewMode) => {
    // 各モードの表示を条件分岐
    if (viewMode === 'card') {
      return <CardView items={items} />
    }
    if (viewMode === 'list') {
      return <ListView items={items} />
    }
    if (viewMode === 'grid') {
      return <GridView items={items} />
    }
  }

  return (
    <div>
      <h2>表示モード切り替え</h2>

      <div className="mode-selector">
        <button
          onClick={() => setViewMode('card')}
          className={viewMode === 'card' ? 'active' : ''}
        >
          カード
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={viewMode === 'list' ? 'active' : ''}
        >
          リスト
        </button>
        <button
          onClick={() => setViewMode('grid')}
          className={viewMode === 'grid' ? 'active' : ''}
        >
          グリッド
        </button>
      </div>

      <div className="content">{renderContent(viewMode)}</div>
    </div>
  )
}
