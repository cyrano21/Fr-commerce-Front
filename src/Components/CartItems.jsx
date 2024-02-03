import cross_icon from '../assets/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext.jsx'
import { useContext } from 'react'

const CartItems = () => {
  const navigate = useNavigate()

  const { products } = useContext(ShopContext)
  const {
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(ShopContext)

  const handleCheckout = () => {
    navigate('/payment')
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
        {products.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id}>
                <div key={e.id} className="cartitems-format">
                  <img
                    className="cartitems-product-icon"
                    src={e.image}
                    alt=""
                  />
                  <p className="cartitems-product-title">{e.name}</p>
                  <p>${e.new_price}</p>
                  <div className="cartitems-quantity">
                    <button onClick={() => decreaseQuantity(e.id)}>-</button>
                    <span>{cartItems[e.id]}</span>
                    <button onClick={() => increaseQuantity(e.id)}>+</button>
                  </div>
                  <p>${e.new_price * cartItems[e.id]}</p>
                  <img
                    onClick={() => {
                      removeFromCart(e.id)
                    }}
                    className="cartitems-remove-icon"
                    src={cross_icon}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            )
          }
          return null
        })}
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
