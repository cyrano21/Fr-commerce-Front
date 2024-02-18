import axios from 'axios'
import { useEffect, useState } from 'react'
import Item from './Item.jsx'
import { useParams } from 'react-router-dom'

const RelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState([])
  const { productId } = useParams()

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL
        const { data } = await axios.get(
          `${backendUrl}/relatedproducts/${productId}`,
        )
        console.log('data fetchRelatedProducts>>>', data)
        setRelatedProducts(data)
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des produits associés:',
          error,
        )
      }
    }

    fetchRelatedProducts()
  }, [productId])

  return (
    <div className="relatedproducts">
      <h1>Produits Associés</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
