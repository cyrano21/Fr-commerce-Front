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
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  console.log('Valeur retournée par getTotalCartItems:', totalItems)

  useEffect(() => {
    const total = getTotalCartItems() // Appeler la fonction plutôt que d'utiliser la référence
    setTotalItems(total)
  }, [cartItems]) // Assurez-vous que cartItems est bien mis à jour pour déclencher cet effet

  const menuRef = useRef()
  console.log('totalItems:', totalItems)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const toggleDropdown = () => setIsMenuVisible(!isMenuVisible)

  return (
    <div className={`nav ${isSticky ? 'sticky' : ''}`} ref={menuRef}>
      <Link to="/" style={{ textDecoration: 'none' }} className="nav-logo">
        <img src={logo} alt="logo" />
        <p>ACHETEUR</p>
      </Link>
      <img
        onClick={toggleDropdown}
        className={`nav-dropdown ${isMenuVisible ? 'open' : ' '}`}
        src={nav_dropdown}
        alt="Dropdown toggle"
      />
      <ul
        ref={menuRef}
        className={`nav-menu ${isMenuVisible ? 'visible' : ' '}`}
      >
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
          {Number.isNaN(totalItems) ? 0 : totalItems}
        </div>
      </div>
    </div>
  )
}

export default Navbar
