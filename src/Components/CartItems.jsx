import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../Context/ShopContext'
import { useNavigate } from 'react-router-dom'
import cross_icon from '../assets/cart_cross_icon.png'

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL

const CartItems = () => {
  const navigate = useNavigate()
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalCartAmount,
    setCartItems,
  } = useContext(ShopContext)
  console.log('cartItems:', cartItems)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProductsDetails = async () => {
      setIsLoading(true)
      try {
        // Supposons que vous envoyez les ID des produits dans le corps de la requête
        const response = await axios.post(`${backendUrl}/products/details`, {
          ids: Object.keys(cartItems),
        })
        console.log('response.data:', response.data)
        const details = response.data // Assurez-vous que le backend renvoie un tableau de produits
        // Mise à jour de cartItems ici avec les détails récupérés
        updateCartItemsWithDetails(details)
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des détails des produits:',
          error,
        )
      }
      setIsLoading(false)
    }

    if (Object.keys(cartItems).length > 0) {
      fetchProductsDetails()
    }
  }, [cartItems, setCartItems]) // Ajout de setCartItems comme dépendance pour assurer la mise à jour correcte

  const updateCartItemsWithDetails = (productsDetails) => {
    const updatedCartItems = { ...cartItems }
    productsDetails.forEach((product) => {
      if (updatedCartItems[product._id]) {
        updatedCartItems[product._id] = {
          ...updatedCartItems[product._id],
          name: product.name,
          image: product.image,
          price: product.price,
        }
      }
    })
    setCartItems(updatedCartItems)
  }

  if (isLoading) {
    return <div>Chargement...</div>
  }

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Produits</p>
        <p>Titre</p>
        <p>Prix</p>
        <p>Quantité</p>
        <p>Total</p>
        <p>Retirer</p>
      </div>
      <hr />
      <div className="cartitems-list">
        {Object.entries(cartItems).map(([id, item]) => (
          <div key={id} className="cartitems-format">
            <img
              className="cartitems-product-icon"
              src={item.image}
              alt={item.name}
            />
            <p className="cartitems-product-title">{item.name}</p>
            <p>${item.price}</p>
            <div className="cartitems-quantity">
              <button onClick={() => decreaseQuantity(id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(id)}>+</button>
            </div>
            <span>${item.price * item.quantity}</span>
            <img
              onClick={() => removeFromCart(id)}
              className="cartitems-remove-icon"
              src={cross_icon}
              alt="remove"
            />
          </div>
        ))}
      </div>
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Total du panier</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Sous-total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Frais de livraison</p>
              <p>Gratuit</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={() => navigate('/payment')}>
            PASSER À LA CAISSE
          </button>
        </div>
        <div className="cartitems-promocode">
          <p>Si vous avez un code promo, saisissez-le ici</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Valider</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems
