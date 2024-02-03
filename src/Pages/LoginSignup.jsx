import { useState } from 'react'

const LoginSignup = () => {
  const [state, setState] = useState('Connexion')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    let dataObj
    await fetch(
      'https://site--e-commerce-backend--cl5kfjmsrksj.code.run//login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    )
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data
      })
    console.log(dataObj)
    if (dataObj.success) {
      localStorage.setItem('auth-token', dataObj.token)
      window.location.replace('/')
    } else {
      alert(dataObj.errors)
    }
  }

  const signup = async () => {
    let dataObj
    await fetch(
      'https://site--e-commerce-backend--cl5kfjmsrksj.code.run/signup',
      {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    )
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data
      })

    if (dataObj.success) {
      localStorage.setItem('auth-token', dataObj.token)
      window.location.replace('/')
    } else {
      alert(dataObj.errors)
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === 'Inscription' ? (
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
            state === 'Connexion' ? login() : signup()
          }}
        >
          Continuer
        </button>

        {state === 'Connexion' ? (
          <p className="loginsignup-login">
            Créer un compte ?{' '}
            <span
              onClick={() => {
                setState('Inscription')
              }}
            >
              Cliquez ici
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Vous avez déjà un compte ?{' '}
            <span
              onClick={() => {
                setState('Connexion')
              }}
            >
              Connectez-vous ici
            </span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>
            En continuant, j'accepte les conditions d'utilisation et la
            politique de confidentialité.
          </p>
        </div>
      </div>
    </div>
  )
}
export default LoginSignup
