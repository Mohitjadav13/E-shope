import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

function Header({ onSearch, showBackButton }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const navigate = useNavigate()

  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
    // If cart is empty or null, set count to 0
    if (!cartItems || cartItems.length === 0) {
      setCartCount(0)
      return
    }
    // Count number of unique items instead of total quantity
    setCartCount(cartItems.length)
  }

  useEffect(() => {
    // Initial cart count
    updateCartCount()

    // Listen for storage changes
    window.addEventListener('storage', updateCartCount)
    
    // Custom event listener for cart updates
    window.addEventListener('cartUpdated', updateCartCount)

    // Listen for cart item removal
    window.addEventListener('cartItemRemoved', updateCartCount)

    return () => {
      window.removeEventListener('storage', updateCartCount)
      window.removeEventListener('cartUpdated', updateCartCount)
      window.removeEventListener('cartItemRemoved', updateCartCount)
    }
  }, [])

  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.clear()
    
    // Clear cart data
    localStorage.removeItem('cart')
    setCartCount(0)
    
    // Dispatch auth change event
    window.dispatchEvent(new Event('authChange'))
    
    // Use window.location for consistent behavior
    window.location.href = '/login'
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  return (
    <nav className="header">
      <div className="header-content">
        {showBackButton && (
          <button 
            className="nav-icon-button"
            onClick={() => navigate('/')}
            aria-label="Back"
            style={{ marginRight: '0.5rem' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        )}
        <div 
          className="nav-brand"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          E-Shop
        </div>

        <div className={`search-container ${isSearchOpen ? 'active' : ''}`}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search products..."
            className="search-input"
          />
        </div>
        
        <div className="nav-controls">
          <button 
            className="search-toggle"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Toggle search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <button 
            onClick={() => navigate('/')} 
            className="nav-icon-button"
            aria-label="Home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>
          
          <button 
            onClick={() => navigate('/cart')} 
            className="nav-icon-button"
            aria-label="Cart"
          >
            <div className="cart-icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && (
                <span className="cart-count" key={cartCount}>
                  {cartCount}
                </span>
              )}
            </div>
          </button>
          
          <button 
            onClick={handleLogout} 
            className="nav-icon-button"
            aria-label="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
