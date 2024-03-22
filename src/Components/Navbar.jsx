import { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext.jsx'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import nav_dropdown from '../assets/nav_dropdown.png'
import {
  useUpdateTotalItems,
  useHandleScroll,
  toggleDropdown,
  translateToFrench,
} from './utils/navbarFunctions.js'
const Navbar = () => {
  const { cartItems, getTotalCartItems } = useContext(ShopContext)
  const [menu, setMenu] = useState('shop')
  const [totalItems, setTotalItems] = useState(getTotalCartItems())
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  useUpdateTotalItems(setTotalItems, getTotalCartItems, cartItems)
  useHandleScroll(setIsSticky)
  const handleToggleDropdown = toggleDropdown(setIsMenuVisible)

  return (
    <div className={`nav ${isSticky ? 'sticky' : ''}`}>
      <Link to="/" className="nav-logo">
        <img src={logo} alt="logo" />
        <p>ACHETEUR</p>
      </Link>
      <img
        onClick={handleToggleDropdown}
        className={`nav-dropdown ${isMenuVisible ? 'open' : ''}`}
        src={nav_dropdown}
        alt="Dropdown toggle"
      />
      <ul className={`nav-menu ${isMenuVisible ? 'visible' : ''}`}>
        {['shop', 'mens', 'women', 'kids'].map((item) => (
          <li onClick={() => setMenu(item)} key={item}>
            <Link to={`/${item === 'shop' ? '' : item}`}>
              {translateToFrench(item).charAt(0).toUpperCase() +
                translateToFrench(item).slice(1)}
            </Link>
            {menu === item && <hr />}
          </li>
        ))}
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
          <Link to="/login">
            <button className="login">Se connecter</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="cart" />
        </Link>
        <div className="nav-cart-count">
          {isNaN(totalItems) ? 0 : totalItems}
        </div>
      </div>
    </div>
  )
}

export default Navbar
