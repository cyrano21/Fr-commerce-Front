import { useState } from 'react'
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCcVisa,
  faCcMastercard,
  faCcPaypal,
} from '@fortawesome/free-brands-svg-icons'

// Définir des couleurs pour les icônes actives et inactives
const activeColor = '#1565c0' // Bleu par exemple
const inactiveColor = '#ccc' // Gris pour les icônes inactives

// Dans votre composant PaymentPage, utilisez FontAwesomeIcon pour afficher les icônes

const PaymentPage = () => {
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card') // 'card' ou 'paypal'
  // États pour les informations de carte
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCardInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    if (paymentMethod === 'paypal') {
      console.log('Redirection vers PayPal...')
      // window.location.href = "URL_PAYPAL";
    } else {
      console.log('Traitement du paiement par carte...', cardInfo)
      setIsTransactionSuccessful(true) // Simuler un succès de paiement
    }
  }

  return (
    <div className="payment-page">
      <h1>Page de Paiement</h1>
      <form className="payment-form" onSubmit={handlePayment}>
        <div className="payment-method">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            Carte
            <FontAwesomeIcon
              icon={faCcVisa}
              color={paymentMethod === 'card' ? activeColor : inactiveColor}
            />
            <FontAwesomeIcon
              icon={faCcMastercard}
              color={paymentMethod === 'card' ? activeColor : inactiveColor}
            />
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={() => setPaymentMethod('paypal')}
            />
            PayPal
            <FontAwesomeIcon
              icon={faCcPaypal}
              color={paymentMethod === 'paypal' ? activeColor : inactiveColor}
            />
          </label>
        </div>

        {paymentMethod === 'card' && (
          <div className="card-details">
            <label htmlFor="cardNumber">Numéro de carte:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={cardInfo.cardNumber}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="expiryDate">Date d`&apos`expiration:</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={cardInfo.expiryDate}
              onChange={handleInputChange}
              required
              placeholder="MM/AA"
            />

            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={cardInfo.cvv}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <button type="submit">
          <a
            href="https://www.paypal.com/signin?returnUri=https%3A%2F%2Fwww.paypal.com%2Fmyaccount%2Fsummary&state="
            target="_blank"
            rel="noopener noreferrer"
          >
            Effectuer le paiement
          </a>
        </button>
      </form>

      {isTransactionSuccessful && (
        <Modal onClose={() => setIsTransactionSuccessful(false)}>
          <h2>Achat réussi !</h2>
          <p>Votre commande a été traitée avec succès.</p>
          <button onClick={() => setIsTransactionSuccessful(false)}>
            Fermer
          </button>
        </Modal>
      )}
    </div>
  )
}

export default PaymentPage
