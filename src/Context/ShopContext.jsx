import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL

export const ShopContext = createContext(null)
const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || {},
  )

  useEffect(() => {
    axios
      .get(`${backendUrl}/allproducts`)
      .then((response) => setProducts(response.data.products))
      .catch((error) =>
        console.error('Erreur lors du chargement des produits:', error),
      )
    const initialCartItems = JSON.parse(localStorage.getItem('cartItems')) || {}
    setCartItems(initialCartItems)
  }, [])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const increaseQuantity = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const decreaseQuantity = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] <= 1) {
        removeFromCart(itemId)
        const { [itemId]: removedItem, ...rest } = prev
        return rest
      } else {
        const newQuantity = Math.max(0, (prev[itemId] || 0) - 1)
        return { ...prev, [itemId]: newQuantity }
      }
    })
  }

  const getTotalCartItems = () => {
    if (
      typeof cartItems !== 'object' ||
      !Object.values(cartItems).every(Number.isFinite)
    ) {
      console.error(
        'cartItems doit être un objet dont toutes les valeurs sont des nombres.',
      )
      return 0
    }
    return Object.values(cartItems).reduce(
      (total, quantity) => total + quantity,
      0,
    )
  }

  const getDefaultCart = () => {
    let cart = {}
    for (let i = 0; i < 300; i++) {
      cart[i] = 0
    }
    return cart
  }

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const product = products.find(
        (p) => p._id && p._id.toString() === itemId.toString(),
      )
      if (product && product.price) {
        total += product.price * cartItems[itemId]
      }
      return total
    }, 0)
  }

  const addToCart = (product) => {
    console.log('productId:', product.itemId)
    const newCartItems = { ...cartItems }
    const quantity = 1
    if (newCartItems[product.itemId]) {
      newCartItems[product.itemId] += quantity
    } else {
      newCartItems[product.itemId] = quantity
    }
    console.log('newCartItems:', newCartItems)
    setCartItems(newCartItems)

    console.log("cartItems après l'ajout d'un produit:", cartItems)
    fetch(`${backendUrl}/addtocart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: product.itemId,
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

  const removeFromCart = (productId) => {
    const newCartItems = { ...cartItems }
    if (newCartItems[productId]) {
      delete newCartItems[productId]
      setCartItems(newCartItems)
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
      {children}
    </ShopContext.Provider>
  )
}

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ShopContextProvider
