import { useEffect, useState } from 'react'
import dropdown_icon from '../assets/dropdown_icon.png'
import { Link } from 'react-router-dom'
import Item from '../Components/Item.jsx'
import axios from 'axios'

const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([])

  const fetchInfo = async () => {
    try {
      const response = await axios.get(
        'site--e-commerce-backend--cl5kfjmsrksj.code.run/allproducts',
      )
      console.log(response.data) // Afficher la réponse pour le débogage
      if (response.status === 200 && Array.isArray(response.data)) {
        setAllProducts(response.data)
      } else {
        // Si la réponse n'est pas un tableau ou le statut n'est pas 200
        console.error(
          "La réponse du réseau n'était pas ce qui était attendu: ",
          response.data,
        )
        setAllProducts([]) // Réinitialiser allproducts ou gérer l'erreur différemment
      }
    } catch (error) {
      console.error("Il y a eu un problème avec l'opération fetch: ", error)
    }
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
