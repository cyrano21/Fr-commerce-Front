import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  // const [isAuthenticated, setIsAuthenticated] = useState(false)

  //  useEffect(() => {
  //   const token = localStorage.getItem('auth-token')
  //  setIsAuthenticated(!!token)
  // if (isAuthenticated) {
  //    loadCart()
  //  }
  // }, [isAuthenticated])

  useEffect(() => {
    fetchProducts()
    fetchCartItems()
  }, [])

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URL,
    // headers: { Authorization: `Bearer ${localStorage.getItem('auth-token')}` },
  })

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/allproducts')
      setProducts(response.data.products)
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
    }
  }

  const fetchCartItems = async () => {
    try {
      const response = await axiosInstance.get('/getcart')
      setCartItems(response.data.cartItems)
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axiosInstance.post('/addtocart', { productId, quantity })
      fetchCartItems() // Récupère à nouveau les articles du panier après l'ajout
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error)
    }
  }

  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.post('/removefromcart', { productId })
      fetchCartItems() // Récupère à nouveau les articles du panier après la suppression
    } catch (error) {
      console.error('Erreur lors de la suppression du panier:', error)
    }
  }

  // loadCart()
  // }, [isAuthenticated])

  const incrementQuantity = (productId) => {
    addToCart(productId)
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
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }
  console.log('cartItems 2', cartItems)

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
