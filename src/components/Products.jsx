import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import './Products.css'

function Products() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showCategories, setShowCategories] = useState(false)
  const [addedProducts, setAddedProducts] = useState(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    return new Set(cart.map(item => item.id))
  })
  const navigate = useNavigate()

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchProducts = async (category = '') => {
    try {
      const url = category
        ? `https://fakestoreapi.com/products/category/${category}`
        : 'https://fakestoreapi.com/products'
      const response = await fetch(url)
      const data = await response.json()
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    fetchProducts(category)
  }

  const handleSearch = (query) => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredProducts(filtered)
  }

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find(item => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
      localStorage.setItem('cart', JSON.stringify(cart))
    } else {
      cart.push({ ...product, quantity: 1 })
      localStorage.setItem('cart', JSON.stringify(cart))
      window.dispatchEvent(new Event('cartUpdated'))
      setAddedProducts(prev => new Set([...prev, product.id]))
    }
  }

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="products-container">
        <div className="categories-dropdown">
          <button 
            className="categories-btn"
            onClick={() => setShowCategories(!showCategories)}
          >
            {selectedCategory || 'All Categories'}
            <span className={`arrow ${showCategories ? 'up' : ''}`}>▼</span>
          </button>
          
          <div className={`categories-list ${showCategories ? 'active' : ''}`}>
            <div 
              className={`category-item ${!selectedCategory ? 'active' : ''}`}
              onClick={() => {
                handleCategoryChange('')
                setShowCategories(false)
              }}
            >
              All Categories
            </div>
            {categories.map(category => (
              <div
                key={category}
                className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => {
                  handleCategoryChange(category)
                  setShowCategories(false)
                }}
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="price">${product.price}</p>
                <button 
                  className="add-to-cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  disabled={addedProducts.has(product.id)}
                >
                  {addedProducts.has(product.id) ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Products
