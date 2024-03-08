import { useContext, useRef, useState } from 'react'
import { ShopContext } from '../Context/ShopContext.jsx'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import nav_dropdown from '../assets/nav_dropdown.png'

const Navbar = () => {
  let [menu, setMenu] = useState('shop')
  const { getTotalCartItems } = useContext(ShopContext)

  const menuRef = useRef()

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
