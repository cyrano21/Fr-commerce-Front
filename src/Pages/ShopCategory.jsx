import { useEffect, useState } from 'react'
import axios from 'axios'
import Item from '../Components/Item'

const ShopCategory = ({ banner, category }) => {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL
        const { data } = await axios.get(`${backendUrl}/allproducts`, {
          params: {
            category: category,
            page: currentPage, // Ajout du paramètre de page pour la requête
            limit: 12, // Vous pouvez ajuster cette valeur selon vos besoins
          },
        })

        console.log(
          'Produits récupérés pour la catégorie:',
          category,
          data.products,
        )
        setProducts(data.products)
        setTotalPages(data.totalPages) // Mettre à jour le nombre total de pages basé sur la réponse
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
  }, [category, currentPage]) // Dépend de `category` et `currentPage` pour refaire une requête quand ils changent

  // Fonction pour gérer le changement de page
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <div className="shopcategory">
      <img src={banner} alt="Banner" className="shopcategory-banner" />
      <div className="shopcategory-indexSort">
        {/* Index and Sorting Elements Here */}
      </div>
      <div className="shopcategory-items">
        <div className="shopcategory-items-container">
          {products.map((product, index) => (
            <Item key={index} {...product} />
          ))}
        </div>
      </div>
      {/* Contrôles de pagination ici */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
export default ShopCategory
