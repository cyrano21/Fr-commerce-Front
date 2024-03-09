import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL

export const ShopContext = createContext(null)
const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([])

  const increaseQuantity = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
  }

  const decreaseQuantity = (itemId) => {
    setCartItems((prev) => {
      const newQuantity = Math.max(1, prev[itemId] - 1) // La quantité ne peut pas être inférieure à 1
      return { ...prev, [itemId]: newQuantity }
    })
  }

  const getDefaultCart = () => {
    let cart = {}
    for (let i = 0; i < 300; i++) {
      cart[i] = 0
    }
    return cart
  }

  const [cartItems, setCartItems] = useState(getDefaultCart())

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL
    const fetchProducts = async () => {
      const response = await axios.get(`${backendUrl}/allproducts`)
      setProducts(response.data.products)
    }

    const fetchCartItems = async () => {
      const authToken = localStorage.getItem('auth-token')
      if (!authToken) return

      try {
        const response = await axios.get(`${backendUrl}/getcart`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        setCartItems(response.data.cartData)
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error)
      }
    }

    fetchProducts()
    fetchCartItems()
  }, [])

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const product = products.find(
        (p) => p.id && p.id.toString() === itemId.toString(),
      )
      if (product && product.new_price) {
        total += product.new_price * cartItems[itemId]
      }
      return total
    }, 0)
  }

  const getTotalCartItems = () => {
    let totalItem = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item]
      }
    }
    return totalItem
  }

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    fetch(`${backendUrl}/addtocart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: itemId,
        quantity: 1,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        console.log('Item added to cart:', data)
      })
      .catch((error) => {
        console.error(
          'There has been a problem with your fetch operation:',
          error,
        )
      })
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (localStorage.getItem('auth-token')) {
      fetch(`${backendUrl}/removefromcart`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          console.log(data.message)
        })
        .catch((error) => {
          console.error(
            'There has been a problem with your fetch operation:',
            error,
          )
        })
    }
  }

  const contextValue = {
    products,
    getTotalCartItems,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    increaseQuantity,
    decreaseQuantity,
  }
  return (
    <ShopContext.Provider
      value={{ ...contextValue, setCartItems, getDefaultCart }}
    >
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
