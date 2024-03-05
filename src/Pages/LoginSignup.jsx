import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '/axiosConfig'

const LoginSignup = () => {
  const navigate = useNavigate()
  const [state, setState] = useState('Login')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const termsChangeHandler = (e) => {
    setTermsAccepted(e.target.checked)
  }

  const login = async () => {
    try {
      const response = await axiosInstance.post('/login', formData)
      localStorage.setItem('auth-token', response.data.token)
      navigate('/')
    } catch (error) {
      setError('Erreur lors de la connexion. Veuillez réessayer.')
    }
  }

  const signup = async () => {
    if (!termsAccepted) {
      setError('Veuillez accepter les conditions d’utilisation.')
      return
    }

    try {
      const response = await axiosInstance.post('/signup', formData)
      localStorage.setItem('auth-token', response.data.token)
      navigate('/')
    } catch (error) {
      setError("Erreur lors de l'inscription. Veuillez réessayer.")
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="loginsignup-fields">
          {state === 'Sign Up' && (
            <input
              type="text"
              placeholder="Votre nom"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
          )}
          <input
            type="email"
            placeholder="Adresse e-mail"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>
        {state === 'Sign Up' && (
          <div className="loginsignup-agree">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={termsChangeHandler}
            />
            <label htmlFor="terms">
              En continuant, j'accepte les conditions d'utilisation et la
              politique de confidentialité.
            </label>
          </div>
        )}
        <button
          onClick={state === 'Login' ? login : signup}
          disabled={state === 'Sign Up' && !termsAccepted}
        >
          Continuer
        </button>

        {state === 'Login' ? (
          <p className="loginsignup-login">
            Pas de compte ?
            <span onClick={() => setState('Sign Up')}> Inscrivez-vous ici</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Vous avez déjà un compte ?
            <span onClick={() => setState('Login')}> Connectez-vous ici</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default LoginSignup
