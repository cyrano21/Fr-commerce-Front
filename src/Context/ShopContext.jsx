import { createContext, useState, useEffect } from 'react'
import axios from 'axios' // Assurez-vous d'avoir axios installé

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([])
  // Initialiser cartItems avec les données de localStorage si disponibles
  const initialCartItems = JSON.parse(localStorage.getItem('cartItems')) || {}
  const [cartItems, setCartItems] = useState(initialCartItems)

  const getDefaultCart = () => ({})
  // Chargez vos produits ici
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
    // Sauvegarder cartItems dans localStorage chaque fois que cartItems change
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const increaseQuantity = (itemId) => {
    setCartItems((prev) => {
      const item = prev[itemId] || { quantity: 0 }
      item.quantity += 1
      return { ...prev, [itemId]: item }
    })
  }

  const decreaseQuantity = (itemId) => {
    setCartItems((prev) => {
      const item = prev[itemId]
      // Vérifier d'abord si l'article existe et a une quantité.
      if (item) {
        // Décrémenter la quantité
        item.quantity -= 1
        // Si la quantité est maintenant 0, supprimer l'article du panier
        if (item.quantity < 1) {
          const updatedItems = { ...prev }
          delete updatedItems[itemId]
          return updatedItems
        }
        // Sinon, retourner le panier mis à jour avec la quantité décrémentée
        return { ...prev, [itemId]: item }
      }
      // Si l'article n'existe pas, retourner simplement l'état actuel
      return prev
    })
  }

  const resetCart = () => {
    setCartItems(getDefaultCart())
  }
  const addToCart = ({ itemId, size, quantity = 1, image }) => {
    setCartItems((currentItems) => {
      const newItem = currentItems[itemId] || { quantity: 0, size, image } // Ajoutez l'image ici
      newItem.quantity += quantity
      return { ...currentItems, [itemId]: newItem }
    })
  }

  const removeFromCart = (itemId) => {
    setCartItems((currentItems) => {
      const updatedItems = { ...currentItems }
      if (updatedItems[itemId]) {
        delete updatedItems[itemId] // Supprimez l'article entièrement, peu importe la quantité
      }
      return updatedItems
    })
  }

  // Calcul du total du panier
  const getTotalCartAmount = () => {
    return Object.values(cartItems).reduce((total, currentItem) => {
      const product = products.find((product) => product._id === currentItem.id)
      return total + (product ? product.new_price * currentItem.quantity : 0)
    }, 0)
  }

  // Calcul du nombre total d'articles dans le panier
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce(
      (total, item) => total + item.quantity,
      0,
    )
  }

  return (
    <ShopContext.Provider
      value={{
        products,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        increaseQuantity,
        decreaseQuantity,
        resetCart,
        cartItems,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
