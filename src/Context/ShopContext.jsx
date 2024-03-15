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
  const [isProductsLoading, setIsProductsLoading] = useState(true)

  useEffect(() => {
    setIsProductsLoading(true) // Commencer le chargement
    axios
      .get(`${backendUrl}/allproducts`)
      .then((response) => {
        setProducts(response.data.products)
        setIsProductsLoading(false) // Arrêter le chargement une fois les données reçues
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des produits:', error)
        setIsProductsLoading(false) // Arrêter le chargement même en cas d'erreur
      })
  }, [])

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
    const cleanedCartItems = Object.keys(cartItems).reduce((acc, key) => {
      const quantity = parseInt(cartItems[key], 10)
      if (!isNaN(quantity)) {
        acc[key] = quantity
      }
      return acc
    }, {})
    return Object.values(cleanedCartItems).reduce(
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
    // Vérifiez que les produits sont chargés
    if (isProductsLoading || !products.length) {
      console.log(
        'En attente du chargement des produits ou aucun produit chargé.',
      )
      return 0
    }

    // Calculez le total en utilisant les prix des produits et les quantités du panier
    return Object.keys(cartItems).reduce((total, itemId) => {
      const product = products.find((p) => p._id.toString() === itemId)
      console.log('product getTotalCartAmount:', product)
      if (product && product.new_price) {
        console.log('product.price:', product.new_price)
        const quantity = parseInt(cartItems[itemId], 10)
        if (!isNaN(quantity)) {
          total += product.new_price * quantity
        }
        console.log('total getTotalCartAmount:', total)
      }
      return total
    }, 0)
  }

  const addToCart = (product) => {
    console.log('productId:', product.itemId)
    setCartItems((prev) => {
      const newCartItems = { ...prev }
      const quantity = 1
      if (typeof product.itemId === 'string' && typeof quantity === 'number') {
        if (newCartItems[product.itemId]) {
          newCartItems[product.itemId] += quantity
        } else {
          newCartItems[product.itemId] = quantity
        }
        console.log('newCartItems:', newCartItems)
        return newCartItems
      } else {
        console.error(
          'productId doit être une chaîne et quantity doit être un nombre.',
        )
        return prev
      }
    })

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
      value={{
        ...contextValue,
        setCartItems,
        isProductsLoading,
        getDefaultCart,
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
