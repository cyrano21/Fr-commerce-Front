import { useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../Context/ShopContext.jsx'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import nav_dropdown from '../assets/nav_dropdown.png'

const Navbar = () => {
  let [menu, setMenu] = useState('shop')
  const { cartItems, getTotalCartItems } = useContext(ShopContext)
  const [totalItems, setTotalItems] = useState(getTotalCartItems())

  console.log('Total items in cart:', getTotalCartItems())
  console.log('Valeur retournée par getTotalCartItems:', totalItems)

  useEffect(() => {
    const total = getTotalCartItems() // Appeler la fonction plutôt que d'utiliser la référence
    setTotalItems(total)
  }, [cartItems]) // Assurez-vous que cartItems est bien mis à jour pour déclencher cet effet

  const menuRef = useRef()
  console.log('totalItems:', totalItems)
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible')
    e.target.classList.toggle('open')
  }

  return (
    <div className="nav">
      <Link to="/" style={{ textDecoration: 'none' }} className="nav-logo">
        <img src={logo} alt="logo" />
        <p>ACHETEUR</p>
      </Link>
      <img
        onClick={dropdown_toggle}
        className="nav-dropdown"
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu('shop')
          }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            Boutique
          </Link>
          {menu === 'shop' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('mens')
          }}
        >
          <Link to="/mens" style={{ textDecoration: 'none' }}>
            Hommes
          </Link>
          {menu === 'mens' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('women')
          }}
        >
          <Link to="/womens" style={{ textDecoration: 'none' }}>
            Femmes
          </Link>
          {menu === 'women' ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu('kids')
          }}
        >
          <Link to="/kids" style={{ textDecoration: 'none' }}>
            Enfants
          </Link>
          {menu === 'kids' ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <button
            className={'nav-logout'}
            onClick={() => {
              localStorage.removeItem('auth-token')
              window.location.replace('/')
            }}
          >
            Se déconecter
          </button>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button>Se connecter</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="cart" />
        </Link>
        <div className="nav-cart-count">
          {Number.isNaN(getTotalCartItems()) ? 0 : getTotalCartItems()}
        </div>
      </div>
    </div>
  )
}

export default Navbar
