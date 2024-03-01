import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cartItems')
    return localData ? JSON.parse(localData) : {}
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/allproducts`,
        )
        setProducts(response.data.products)
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const newItem = prev[product._id]
        ? {
            ...prev[product._id],
            quantity: prev[product._id].quantity + quantity,
          }
        : { ...product, quantity }
      return { ...prev, [product._id]: newItem }
    })
  }

  const increaseQuantity = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: { ...prev[id], quantity: prev[id].quantity + 1 },
    }))
  }

  const decreaseQuantity = (id) => {
    setCartItems((prev) => {
      const currentQuantity = prev[id].quantity
      if (currentQuantity === 1) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: { ...prev[id], quantity: currentQuantity - 1 } }
    })
  }

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const { [id]: _, ...rest } = prev
      return rest
    })
  }

  // Dans ShopContextProvider
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce(
      (total, item) => total + item.quantity,
      0,
    )
  }

  const getTotalCartAmount = () => {
    return Object.values(cartItems).reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    )
  }

  return (
    <ShopContext.Provider
      value={{
        products,
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        setCartItems, // In case you need to reset or update cartItems directly from components
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
