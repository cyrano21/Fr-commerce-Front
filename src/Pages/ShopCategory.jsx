import { useEffect, useState } from 'react'
import dropdown_icon from '../assets/dropdown_icon.png'
import { Link } from 'react-router-dom'
import Item from '../Components/Item.jsx'

const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([])

  const fetchInfo = () => {
    fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Affichage 1 - 12</span> sur 54 Produits
        </p>
        <div className="shopcategory-sort">
          Classer par <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {allproducts.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                id={item.id}
                key={i}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            )
          } else {
            return null
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        <Link to="/" style={{ textDecoration: 'none' }}>
          Explorer Plus
        </Link>
      </div>
    </div>
  )
}

export default ShopCategory
