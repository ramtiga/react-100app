import { useState } from 'react'

type Product = {
  id: number
  name: string
  category: string
  price: number
  inStock: boolean
}

export const ProductFilter = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'ノートPC',
      category: '電子機器',
      price: 80000,
      inStock: true,
    },
    { id: 2, name: 'マウス', category: '電子機器', price: 3000, inStock: true },
    { id: 3, name: '机', category: '家具', price: 25000, inStock: false },
    { id: 4, name: '椅子', category: '家具', price: 15000, inStock: true },
    { id: 5, name: 'ペン', category: '文具', price: 100, inStock: true },
    { id: 6, name: 'ノート', category: '文具', price: 200, inStock: false },
    { id: 7, name: '消しゴム', category: '文具', price: 150, inStock: true },
  ])

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [maxPrice, setMaxPrice] = useState(100000)

  const filteredProducts = products.filter((product) => {
    // カテゴリーと価格でフィルタリング
    const matchCategory =
      selectedCategory === 'all' || product.category === selectedCategory

    const matchMaxPrice = product.price <= maxPrice

    return matchCategory && matchMaxPrice
  })

  return (
    <div>
      <h2>商品フィルター</h2>

      <div className="filters">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">全カテゴリー</option>
          <option value="電子機器">電子機器</option>
          <option value="家具">家具</option>
          <option value="文具">文具</option>
        </select>

        <label>
          最大価格: ¥{maxPrice.toLocaleString()}
          <input
            type="range"
            min="0"
            max="100000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
      </div>

      <p>検索結果: {filteredProducts.length}件</p>

      <div className="product-list">
        <ul>
          {filteredProducts.map((product) => {
            return (
              <li>
                {product.name} ¥{product.price.toLocaleString()}
                {product.inStock ? (
                  <span className="in-stock">在庫あり</span>
                ) : (
                  <span className="out-of-stock-text">在庫がありません</span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
