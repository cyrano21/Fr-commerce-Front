import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState({})

  // Initialisation de l'instance axios avec le token et l'URL de base
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URL,
  })

  // Ajout d'un intercepteur pour inclure le token d'authentification dans chaque requête
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth-token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get('/allproducts')
        setProducts(data.products)
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error)
      }
    }
    fetchProducts()
  }, [])

  const fetchCart = async () => {
    try {
      const { data } = await axiosInstance.get('/getuser')
      if (data && data.user && data.user.cartData) {
        setCartItems(data.user.cartData)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const addToCart = async (productId, quantity) => {
    try {
      await axiosInstance.post('/addtocart', { productId, quantity })
      fetchCart()
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error)
    }
  }

  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.post('/removefromcart', { productId })
      fetchCart()
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'article du panier :",
        error,
      )
    }
  }

  const increaseQuantity = (productId) => {
    addToCart(productId, 1)
  }

  const decreaseQuantity = async (productId) => {
    try {
      await axiosInstance.post('/decreaseQuantity', { productId })
      fetchCart()
    } catch (error) {
      console.error('Error decreasing product quantity in cart: ', error)
    }
  }

  const getTotalCartAmount = () => {
    return Object.values(cartItems).reduce((acc, { quantity, productId }) => {
      const product = products.find((product) => product._id === productId)
      return acc + (product ? product.price * quantity : 0)
    }, 0)
  }

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce(
      (acc, item) => acc + item.quantity,
      0,
    )
  }

  return (
    <ShopContext.Provider
      value={{
        products,
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getTotalCartAmount,
        getTotalCartItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
