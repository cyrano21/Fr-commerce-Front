import { useContext, useMemo } from 'react'
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
    getTotalCartItems,
    isProductsLoading,
    increaseQuantity,
    decreaseQuantity,
    setCartItems,
    getDefaultCart,
    products,
  } = useContext(ShopContext)

  const totalCartItems = getTotalCartItems()
  const totalCartAmount = useMemo(
    () => getTotalCartAmount(),
    [cartItems, products],
  )

  const handleCheckout = async () => {
    const saleItems = products
      .filter((product) => cartItems[product._id] > 0)
      .map((product) => ({
        productId: product._id,
        quantity: cartItems[product._id],
        price: product.new_price,
      }))

    try {
      // Appel API sans l'en-tête 'auth-token'
      const response = await axios.post(`${backendUrl}/completePurchase`, {
        items: saleItems,
      })

      if (response.status === 200) {
        setCartItems(getDefaultCart()) // Réinitialiser le panier
        navigate('/payment') // Rediriger vers la page de paiement
      } else {
        console.error(
          "Erreur lors de la finalisation de l'achat:",
          response.status,
        )
        alert('Une erreur est survenue lors du processus de paiement.')
      }
    } catch (error) {
      console.error("Erreur lors de la finalisation de l'achat:", error)
      alert('Une erreur est survenue lors du processus de paiement.')
    }
  }

  if (isProductsLoading) {
    return <div>Chargement...</div>
  }

  return (
    <div className="cartitems">
      {totalCartItems === 0 ? (
        <div className="cartitems-empty">
          <h2>Votre panier est vide.</h2>
        </div>
      ) : (
        <>
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
              .filter((product) => cartItems[product._id])
              .map((product) => (
                <div key={product._id} className="cartitems-format">
                  <img
                    className="cartitems-product-icon"
                    src={product.image}
                    alt={product.name}
                  />
                  <p className="cartitems-product-title">{product.name}</p>
                  <p>${product.new_price}</p>
                  <div className="cartitems-quantity">
                    <button onClick={() => decreaseQuantity(product._id)}>
                      {cartItems[product._id] > 1 ? '-' : 'x'}
                    </button>
                    <span>{cartItems[product._id]}</span>
                    <button onClick={() => increaseQuantity(product._id)}>
                      +
                    </button>
                  </div>
                  <p>${product.new_price * cartItems[product._id]}</p>
                  <img
                    onClick={() => removeFromCart(product._id)}
                    className="cartitems-remove-icon"
                    src={cross_icon}
                    alt="remove"
                  />
                </div>
              ))}
          </div>
        </>
      )}

      <div className="cartitems-down">
        {totalCartItems > 0 && (
          <>
            <div className="cartitems-total">
              <h1>Total du panier</h1>
              <div>
                <div className="cartitems-total-item">
                  <p>Sous-total</p>
                  <p>${totalCartAmount}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <p>Frais de livraison</p>
                  <p>Gratuit</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <h3>Total</h3>
                  <h3>${totalCartAmount}</h3>
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
          </>
        )}
      </div>
    </div>
  )
}

export default CartItems
