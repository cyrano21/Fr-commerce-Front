import { useState } from 'react'
import axiosInstance from '/axiosConfig'

const LoginSignup = () => {
  const [state, setState] = useState('Login')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    // Remplacez fetch par axiosInstance.post
    try {
      const response = await axiosInstance.post('/login', formData)
      localStorage.setItem('auth-token', response.data.token)
      window.location.replace('/')
    } catch (error) {
      alert('Erreur lors de la connexion')
    }
  }

  const signup = async () => {
    // Identique pour l'inscription
    try {
      const response = await axiosInstance.post('/signup', formData)
      localStorage.setItem('auth-token', response.data.token)
      window.location.replace('/')
    } catch (error) {
      alert("Erreur lors de l'inscription")
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === 'Sign Up' ? (
            <input
              type="text"
              placeholder="Votre nom"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
          ) : (
            <></>
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
        <button
          onClick={() => {
            state === 'Login' ? login() : signup()
          }}
        >
          Continuer
        </button>

        {state === 'Login' ? (
          <p className="loginsignup-login">
            Créer un compte ?
            <span
              onClick={() => {
                setState('Sign Up')
              }}
            >
              Cliquez ici
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Vous avez déjà un compte ?
            <span
              onClick={() => {
                setState('Login')
              }}
            >
              Connectez-vous ici
            </span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>
            En continuant, j`&apos;`accepte les conditions d`&apos;`utilisation
            et la politique de confidentialité.
          </p>
        </div>
      </div>
    </div>
  )
}
export default LoginSignup
