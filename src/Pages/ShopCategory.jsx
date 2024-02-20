import { useEffect, useState } from 'react'
import axios from 'axios'
import Item from '../Components/Item'
import dropdown_icon from '../assets/dropdown_icon.png'
import { Link } from 'react-router-dom'

const ShopCategory = ({ banner, category }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL
        const { data } = await axios.get(`${backendUrl}/allproducts`, {
          params: { category: category }, // Directement utilisé tel quel, en supposant que le backend gère la normalisation
        })

        console.log(
          'Produits récupérés pour la catégorie:',
          category,
          data.products,
        )
        setProducts(data.products)
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des produits pour la catégorie',
          category,
          ':',
          error,
        )
      }
    }

    fetchProducts()
  }, [category])

  return (
    <div className="shopcategory">
      <img
        src={banner}
        alt="Bannière de la catégorie"
        className="shopcategory-banner"
      />
      <div className="shopcategory-indexSort">
        <p>
          <span>Affichage 1 - {products.length}</span> sur {products.length}{' '}
          Produits
        </p>
        <div className="shopcategory-sort">
          Classer par <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {products.map((product, index) => (
          <Item key={index} {...product} />
        ))}
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
