import { useState } from 'react'

export const FruitList = () => {
  const [fruits] = useState([
    'りんご',
    'バナナ',
    'オレンジ',
    'ぶどう',
    'いちご',
  ])

  return (
    <div>
      <h2>果物リスト</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index + 1}>
            {index + 1}. {fruit}
          </li>
        ))}
      </ul>
    </div>
  )
}
