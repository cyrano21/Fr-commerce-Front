import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import crossIcon from '../assets/cart_cross_icon.png'
import Notification from '../Components/Notification'

const CartItems = () => {
  const navigate = useNavigate()
  const {
    cartItems = { cartData: [] }, // Provide a default value
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    calculateTotal,
  } = useContext(ShopContext)

  console.log('cartItems', cartItems)

  const [notification, setNotification] = useState('')

  // Correction pour l'utilisation de fonctions nommées correctement
  // et gestion correcte de l'ID du produit lors de la suppression.
  const handleRemoveClick = (productId) => {
    removeFromCart(productId)
    setNotification('Produit retiré du panier')
    setTimeout(() => setNotification(''), 3000) // Efface la notification après 3 secondes
  }

  // Ajout d'une vérification pour s'assurer que cartItems n'est pas vide
  if (!cartItems || cartItems.length === 0) {
    return <div>Le panier est vide.</div>
  }

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <h2>Détails du Panier</h2>
      </div>
      <hr />
      <div className="cartitems-list">
        {cartItems.cartData &&
          cartItems.cartData.map((item) => (
            <div key={item.productId} className="cartitems-format">
              <img
                className="cartitems-product-icon"
                src={item.image || 'default_image.jpg'} // Utilisation de l'image par défaut si `item.image` est undefined
                alt={item.name || 'Nom du produit'}
              />
              <p className="cartitems-product-title">
                {item.name || 'Nom inconnu'}
              </p>
              <p>${item.price || 0}</p>
              <div className="cartitems-quantity">
                <button
                  onClick={() => decrementQuantity(item.productId)}
                  aria-label="Diminuer la quantité"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => incrementQuantity(item.productId)}
                  aria-label="Augmenter la quantité"
                >
                  +
                </button>
              </div>
              <span>${(item.price || 0) * item.quantity}</span>
              <img
                onClick={() => handleRemoveClick(item.productId)}
                className="cartitems-remove-icon"
                src={crossIcon}
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
