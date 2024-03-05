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
      const { data } = await axiosInstance.get('/getcart')
      console.log(data) // Assurez-vous que cette réponse correspond à la nouvelle structure
      if (data && Array.isArray(data)) {
        const cartItemsObject = data.reduce((acc, item) => {
          const { productId, quantity } = item
          acc[productId] = { ...item, quantity }
          return acc
        }, {})
        setCartItems(cartItemsObject)
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
    // S'assurer que cartItems est un objet avant de procéder
    if (!cartItems) return 0

    return Object.values(cartItems).reduce((acc, item) => {
      // S'assurer que l'élément et le produit existent avant d'accéder à `quantity` et `price`
      if (!item || !products) return acc

      const product = products.find((product) => product._id === item.productId)
      return product ? acc + product.price * item.quantity : acc
    }, 0)
  }

  const getTotalCartItems = () => {
    if (!cartItems) return 0

    return Object.values(cartItems).reduce((acc, item) => {
      // Vérifie si l'item est défini et contient la propriété quantity avant de procéder
      if (!item || typeof item.quantity === 'undefined') return acc

      const product = products.find((product) => product._id === item.productId)
      if (!product) return acc

      return acc + product.price * item.quantity
    }, 0)
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
