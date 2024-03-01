import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import Notification from '../Components/Notification'

export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
  const [notification, setNotification] = useState('')
  const [removingItems, setRemovingItems] = useState({})
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
    console.log('Produit à ajouter :', product)

    const productId = product._id || product.itemId
    if (!productId) {
      console.error("Produit sans ID valide, impossible d'ajouter au panier.")
      return
    }

    setCartItems((prev) => {
      const newItem = prev[productId]
        ? {
            ...prev[productId],
            quantity: prev[productId].quantity + quantity,
            price: product.price,
          }
        : {
            ...product,
            quantity,
            price: product.price,
          }

      console.log('Ajout au panier :', productId, quantity)
      return { ...prev, [productId]: newItem }
    })
  }

  const removeFromCart = (id) => {
    setRemovingItems((prev) => ({ ...prev, [id]: true }))
    // Affichage d'une notification de confirmation
    setNotification('Produit retiré du panier')

    setTimeout(() => {
      setCartItems((prev) => {
        const newCartItems = { ...prev }
        delete newCartItems[id]
        return newCartItems
      })

      // Retirer l'état de suppression
      setRemovingItems((prev) => {
        const newRemovingItems = { ...prev }
        delete newRemovingItems[id]
        return newRemovingItems
      })
    }, 500) // Assurez-vous que cette durée correspond à celle de votre animation CSS
  }

  const increaseQuantity = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity: prev[id].quantity + 1, // Ici, prev[id].quantity doit être un nombre
      },
    }))
  }

  const decreaseQuantity = (id) => {
    setCartItems((prev) => {
      if (prev[id].quantity > 1) {
        return {
          ...prev,
          [id]: {
            ...prev[id],
            quantity: prev[id].quantity - 1, // Assurez-vous que ceci ne devient pas NaN
          },
        }
      }
      // Gestion de la suppression de l'article si la quantité est 1 ou moins
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
    return Object.values(cartItems).reduce((total, item) => {
      const price = item.price || item.new_price // Utilisez new_price avec un fallback sur price
      if (
        typeof price === 'number' &&
        price > 0 &&
        Number.isFinite(item.quantity)
      ) {
        return total + price * item.quantity
      }
      return total
    }, 0)
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
      <Notification
        message={notification}
        onClose={() => setNotification('')}
      />
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
