import { useEffect, useState } from 'react'
import axios from 'axios'
import Item from '../Components/Item'
import dropdown_icon from '../assets/dropdown_icon.png'
import { Link } from 'react-router-dom'

const ShopCategory = ({ banner, category }) => {
  const [products, setProducts] = useState([])
  const fetchProducts = async () => {
    try {
      const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL
      const { data } = await axios.get(`${backendUrl}/allproducts`)

      console.log('data>>>', data)
      const filteredProducts = data.filter(
        (product) =>
          product.category.charAt(0).toUpperCase() +
            product.category.slice(1).toLowerCase() ===
          category,
      )

      console.log('filteredProducts', filteredProducts)
      setProducts(filteredProducts)
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error)
    }
  }

  useEffect(() => {
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
