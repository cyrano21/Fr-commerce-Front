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
        console.log('Produits récupérés:', response.data.products)
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
        const { [itemId]: _, ...rest } = prev
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
    if (isProductsLoading || !products.length) {
      console.log(
        'En attente du chargement des produits ou aucun produit chargé.',
      )
      return 0
    }

    return Object.keys(cartItems).reduce((total, itemId) => {
      const product = products.find((p) => p._id.toString() === itemId)
      if (!product) {
        console.warn(`Produit avec l'ID ${itemId} non trouvé.`)
        return total
      }

      const quantity = parseInt(cartItems[itemId], 10)
      if (!isNaN(quantity) && product.new_price) {
        total += product.new_price * quantity
      }
      return total
    }, 0)
  }

  const addToCart = (product, quantity = 1) => {
    const productExists = products.some(
      (p) => p._id.toString() === product.itemId,
    )
    console.log('productExists:', productExists)
    if (!productExists) {
      console.error(
        `Erreur : Le produit avec l'ID ${product.itemId} n'existe pas.`,
      )
      return
    }
    if (!product.itemId || typeof product.itemId !== 'string') {
      console.error('Erreur : ID du produit manquant ou invalide.')
      return
    }

    if (typeof quantity !== 'number' || quantity <= 0) {
      console.error('Erreur : Quantité invalide.')
      return
    }

    setCartItems((prev) => {
      const newCartItems = {
        ...prev,
        [product.itemId]: (prev[product.itemId] || 0) + quantity,
      }
      console.log('Produit ajouté au panier avec succès :', newCartItems)
      return newCartItems
    })

    fetch(`${backendUrl}/addtocart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.itemId, quantity }),
    })
      .then((response) => response.json())
      .then((data) => console.log('Item added to cart:', data))
      .catch((error) =>
        console.error(
          'There has been a problem with your fetch operation:',
          error,
        ),
      )
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
