import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ProductDetail.css'
import Header from './Header'

function ProductDetail() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdded, setIsAdded] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await response.json()
        setProduct(data)
        // Check if product is already in cart
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        setIsAdded(cart.some(item => item.id === data.id))
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) return <div className="loading">Loading...</div>
  if (!product) return <div>Product not found</div>

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
      localStorage.setItem('cart', JSON.stringify(cart))
    } else {
      cart.push({ ...product, quantity: 1 })
      localStorage.setItem('cart', JSON.stringify(cart))
      // Only dispatch event for new products
      window.dispatchEvent(new Event('cartUpdated'))
      setIsAdded(true)
    }
  }

  return (
    <>
      <Header showBackButton={true} />
      <div className="product-detail">
        <button className="back-button" onClick={() => navigate('/')}>
          Back to Products
        </button>
        <div className="product-content">
          <div className="detail-product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-info">
            <h1>{product.title}</h1>
            <p className="category">{product.category}</p>
            <p className="description">{product.description}</p>
            <p className="price">${product.price}</p>
            <button 
              className="add-to-cart"
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
