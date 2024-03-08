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
    calculateTotal,
  } = useContext(ShopContext)

  console.log('cartItems', cartItems)

  const [notification, setNotification] = useState('')

  const handleRemoveClick = (productId) => {
    removeFromCart(productId)
    setNotification('Produit retiré du panier')
    setTimeout(() => setNotification(''), 3000) // Efface la notification après 3 secondes
  }
  if (!cartItems) {
    return <div>Chargement du panier...</div>
  }

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <h2>Détails du Panier</h2>
      </div>
      <hr />
      <div className="cartitems-list">
        {cartItems.map((item, index) => (
          <div key={index} className="cartitems-format">
            <img
              className="cartitems-product-icon"
              src={item?.image ?? 'default_image.jpg'} // Utilisez l'image par défaut si `item.image` est undefined
              alt={item?.name ?? 'Nom du produit'}
            />
            <p className="cartitems-product-title">
              {item?.name ?? 'Nom inconnu'}
            </p>
            <p>${item?.price ?? 0}</p>
            <div className="cartitems-quantity">
              <button onClick={() => decreaseQuantity(item.productId)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.productId)}>
                +
              </button>
            </div>
            <span>${item?.price * (item?.quantity ?? 0)}</span>
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
              <p>${calculateTotal()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Frais de livraison</p>
              <p>Gratuit</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${calculateTotal()}</h3>
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
