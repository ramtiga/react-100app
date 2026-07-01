import { useState } from 'react'

type Product = {
  id: string
  name: string
  price: number
}

type Category = {
  id: string
  name: string
  items: Product[]
}

type ExpandedCategories = {
  [key: string]: boolean
}

export const CategoryProducts = () => {
  const [categories] = useState<Category[]>([
    {
      id: 'cat1',
      name: '電子機器',
      items: [
        { id: 'item1', name: 'スマートフォン', price: 50000 },
        { id: 'item2', name: 'タブレット', price: 40000 },
        { id: 'item3', name: 'イヤホン', price: 5000 },
      ],
    },
    {
      id: 'cat2',
      name: '書籍',
      items: [
        { id: 'item4', name: 'プログラミング入門', price: 2500 },
        { id: 'item5', name: 'デザインの基礎', price: 3000 },
      ],
    },
    {
      id: 'cat3',
      name: '衣類',
      items: [
        { id: 'item6', name: 'Tシャツ', price: 2000 },
        { id: 'item7', name: 'ジーンズ', price: 6000 },
        { id: 'item8', name: 'スニーカー', price: 8000 },
      ],
    },
  ])

  const [expandedCategories, setExpandedCategories] =
    useState<ExpandedCategories>({})

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  return (
    <div>
      <h2>カテゴリー別商品リスト</h2>

      <div className="category-list">
        {categories.map((category) => (
          <div className="category-item" key={category.id}>
            <div
              className="category-header"
              onClick={() => toggleCategory(category.id)}
            >
              <span className="category-toggle-icon">
                {expandedCategories[category.id] ? '▼' : '▶'}
              </span>
              <span className="category-name">{category.name}</span>
              <span className="category-count">({category.items.length})</span>

              {expandedCategories[category.id] &&
                category.items.map((product) => (
                  <div className="products-list" key={product.id}>
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">
                      ¥{product.price.toLocaleString()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
