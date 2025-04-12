import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/Login'
import Products from './components/Products'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('token'))
    }

    // Listen for storage changes
    window.addEventListener('storage', checkAuth)
    // Custom event for auth changes
    window.addEventListener('authChange', checkAuth)

    return () => {
      window.removeEventListener('storage', checkAuth)
      window.removeEventListener('authChange', checkAuth)
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          } 
        />
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Products /> : <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/product/:id" 
          element={isAuthenticated ? <ProductDetail /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/cart" 
          element={isAuthenticated ? <Cart /> : <Navigate to="/login" replace />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
