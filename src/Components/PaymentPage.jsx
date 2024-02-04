import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext.jsx'
import { useContext, useState } from 'react'
import { FaCcMastercard, FaCcPaypal, FaCcVisa } from 'react-icons/fa' // Icônes de paiement

const PaymentPage = () => {
  const navigate = useNavigate()
  const { getTotalCartAmount } = useContext(ShopContext)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    paymentMethod: 'card', // 'card' ou 'paypal'
  })

  const handleInputChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value })
  }

  const handlePayment = () => {
    // Logique pour traiter le paiement, e.g., intégration avec Stripe ou PayPal
    console.log(
      'Traitement du paiement avec les informations suivantes:',
      customerInfo,
    )

    // Après le traitement du paiement, rediriger l'utilisateur
    navigate('/success') // Modifier '/success' par la route de succès de paiement que vous voulez
  }

  return (
    <div className="payment-page">
      <div>
        <h1>Payment Details</h1>
        <div className="payment-form">
          {/* Informations personnelles */}
          <input
            type="text"
            name="firstName"
            value={customerInfo.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            value={customerInfo.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
          <input
            type="email"
            name="email"
            value={customerInfo.email}
            onChange={handleInputChange}
            placeholder="Email"
          />

          {/* Choix du mode de paiement */}
          <div className="payment-method">
            <div
              className="payment-method-option"
              onClick={() =>
                setCustomerInfo({ ...customerInfo, paymentMethod: 'card' })
              }
            >
              <FaCcVisa
                size={24}
                color={
                  customerInfo.paymentMethod === 'card' ? '#6772E5' : '#ccc'
                }
              />
              <FaCcMastercard
                size={24}
                color={
                  customerInfo.paymentMethod === 'card' ? '#6772E5' : '#ccc'
                }
              />
              <span>Card</span>
            </div>
            <div
              className="payment-method-option"
              onClick={() =>
                setCustomerInfo({ ...customerInfo, paymentMethod: 'paypal' })
              }
            >
              <FaCcPaypal
                size={24}
                color={
                  customerInfo.paymentMethod === 'paypal' ? '#6772E5' : '#ccc'
                }
              />
              <span>PayPal</span>
            </div>
          </div>

          {/* Si la méthode de paiement sélectionnée est 'card', montrer le formulaire de carte */}
          {customerInfo.paymentMethod === 'card' && (
            <>
              <input
                type="text"
                name="cardNumber"
                value={customerInfo.cardNumber}
                onChange={handleInputChange}
                placeholder="Card Number"
              />
              <input
                type="text"
                name="expiryDate"
                value={customerInfo.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
              />
              <input
                type="text"
                name="cvc"
                value={customerInfo.cvc}
                onChange={handleInputChange}
                placeholder="CVC"
              />
            </>
          )}

          <div className="total-amount">
            <p>Total Amount: ${getTotalCartAmount()}</p>
          </div>
          <button onClick={handlePayment}>Pay Now</button>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
