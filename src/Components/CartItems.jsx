import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import cross_icon from '../assets/cart_cross_icon.png'
import Notification from '../Components/Notification'

const CartItems = () => {
  const navigate = useNavigate()
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalCartAmount,
  } = useContext(ShopContext)

  const [notification, setNotification] = useState('')

  const handleRemoveClick = (id) => {
    removeFromCart(id)
    setNotification('Produit retiré du panier')
    setTimeout(() => setNotification(''), 3000) // Clear notification after 3 seconds
  }

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">{/* Headers here */}</div>
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
              onClick={() => handleRemoveClick(id)}
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
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification('')}
        />
      )}
    </div>
  )
}

export default CartItems
