import { useContext } from 'react'
import axios from 'axios' // Utilisez axiosInstance si vous avez une configuration spécifique
import { ShopContext } from '../Context/ShopContext.jsx'
import { useNavigate } from 'react-router-dom'

import cross_icon from '../assets/cart_cross_icon.png' // Assurez-vous que le chemin est correct
const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL

const CartItems = () => {
  const navigate = useNavigate()
  const {
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    increaseQuantity,
    decreaseQuantity,
    setCartItems,
    getDefaultCart,
    products,
  } = useContext(ShopContext)

  const handleCheckout = async () => {
    const saleItems = products
      .filter((product) => cartItems[product.id] > 0)
      .map((product) => ({
        productId: product._id,
        quantity: cartItems[product.id],
        price: product.new_price,
      }))

    try {
      axios.post(
        `${backendUrl}/completePurchase`,
        { items: saleItems },
        {
          headers: {
            'auth-token': localStorage.getItem('auth-token'),
          },
        },
      )

      setCartItems(getDefaultCart()) // Réinitialiser le panier
      navigate('/payment') // Rediriger vers la page de paiement avec indication de succès
    } catch (error) {
      console.error("Erreur lors de la finalisation de l'achat:", error)
    }
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
        {products
          .filter((product) => cartItems[product.id] > 0)
          .map((product) => (
            <div key={product.id} className="cartitems-format">
              <img
                className="cartitems-product-icon"
                src={product.image}
                alt=""
              />
              <p className="cartitems-product-title">{product.name}</p>
              <p>${product.new_price}</p>
              <div className="cartitems-quantity">
                <button onClick={() => decreaseQuantity(product.id)}>-</button>
                <span>{cartItems[product.id]}</span>
                <button onClick={() => increaseQuantity(product.id)}>+</button>
              </div>
              <p>${product.new_price * cartItems[product.id]}</p>
              <img
                onClick={() => removeFromCart(product.id)}
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
          <button onClick={handleCheckout}>PASSER À LA CAISSE</button>
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
