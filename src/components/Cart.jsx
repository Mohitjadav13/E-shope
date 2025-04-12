import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Cart.css'
import Header from './Header'

function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(items)
  }, [])

  const updateQuantity = (itemId, change) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change
        if (newQuantity < 1) return null
        return { ...item, quantity: newQuantity }
      }
      return item
    }).filter(Boolean)

    setCartItems(updatedItems)
    localStorage.setItem('cart', JSON.stringify(updatedItems))
    // Dispatch event to update cart count immediately
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId)
    setCartItems(updatedItems)
    localStorage.setItem('cart', JSON.stringify(updatedItems))
    // Dispatch event to update cart count immediately
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleCheckout = () => {
    setShowConfirmation(true)
    setCartItems([])
    localStorage.setItem('cart', '[]')
    // Dispatch event to update cart count immediately
    window.dispatchEvent(new Event('cartUpdated'))
    
    setTimeout(() => {
      setShowConfirmation(false)
    }, 4000)
  }

  if ((cartItems.length === 0 && !showConfirmation) || (showConfirmation && cartItems.length === 0)) {
    return (
      <>
        <Header showBackButton={true} />
        <div className="cart-container">
          {showConfirmation ? (
            <div className="confirmation-popup">
              Order placed successfully!
            </div>
          ) : (
            <div className="cart-empty">
              <h2>Your cart is empty</h2>
              <button 
                className="continue-shopping"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </>
    )
  }

  return (
    <>
      <Header showBackButton={true} />
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>
        
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="item-details">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <button 
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart
