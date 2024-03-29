import axios from 'axios'
import { useEffect, useState } from 'react'
import Item from './Item.jsx'

const RelatedProducts = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (productId) {
        const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL
        try {
          const { data } = await axios.get(
            `${backendUrl}/relatedproducts/${productId}`,
          )
          setRelatedProducts(data)
        } catch (error) {
          console.error(
            'Erreur lors de la récupération des produits associés:',
            error,
          )
        }
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
          <Item key={productId} {...item} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
