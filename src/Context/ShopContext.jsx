import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    setIsAuthenticated(!!token)
    if (token) {
      fetchProducts()
      fetchCartItems()
    }
  }, [isAuthenticated])

  const createAxiosInstance = () => {
    const token = localStorage.getItem('auth-token')
    return axios.create({
      baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URL,
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  const fetchProducts = async () => {
    const axiosInstance = createAxiosInstance()
    try {
      const response = await axiosInstance.get('/allproducts')

      console.log('response.data.products:', response.data.products)
      setProducts(response.data.products)
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
    }
  }

  const fetchCartItems = async () => {
    const axiosInstance = createAxiosInstance()
    try {
      const response = await axiosInstance.get('/getcart')
      console.log('response.data.cartItems:', response.data)
      setCartItems(response.data)
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    const axiosInstance = createAxiosInstance()
    if (!isAuthenticated) {
      return <Link to="/login" />
    }
    try {
      const response = await axiosInstance.post('/addtocart', {
        productId,
        quantity,
      })
      if (response.data.success) {
        console.log(response.data.message)
        fetchCartItems() // Rafraîchit les éléments du panier après l'ajout
      } else {
        console.error("Erreur lors de l'ajout au panier:", response.data.error)
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout au panier:",
        error.response.data.error,
      )
    }
  }

  const removeFromCart = async (productId) => {
    const axiosInstance = createAxiosInstance()
    try {
      await axiosInstance.post('/removefromcart', { productId })
      fetchCartItems() // Refresh cart items after removing
    } catch (error) {
      console.error('Erreur lors de la suppression du panier:', error)
    }
  }

  const incrementQuantity = (productId) => {
    addToCart(productId, 1)
  }

  const decrementQuantity = (productId) => {
    const item = cartItems.find((item) => item.productId === productId)
    if (item && item.quantity > 1) {
      addToCart(productId, -1)
    } else {
      removeFromCart(productId)
    }
  }

  const getTotalCartItems = () => {
    // S'assure que cartItems est un tableau avant d'appeler reduce.
    return Array.isArray(cartItems)
      ? cartItems.reduce((total, item) => total + item.quantity, 0)
      : 0
  }

  const calculateTotal = () => {
    // S'assure que cartItems est un tableau avant d'appeler reduce.
    return Array.isArray(cartItems)
      ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      : 0
  }

  return (
    <ShopContext.Provider
      value={{
        products,
        cartItems,
        addToCart,
        removeFromCart,
        calculateTotal,
        incrementQuantity,
        decrementQuantity,
        getTotalCartItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ShopContextProvider
