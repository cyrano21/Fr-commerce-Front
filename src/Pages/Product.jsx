import Breadcrums from '../Components/Breadcrums.jsx'
import ProductDisplay from '../Components/ProductDisplay.jsx'
import DescriptionBox from '../Components/DescriptionBox.jsx'
import RelatedProducts from '../Components/RelatedProducts.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom' // Importez useParams

const Product = () => {
  const { productId } = useParams() // Utilisez useParams pour récupérer l'ID du produit de l'URL
  const [product, setProduct] = useState(null) // État pour stocker les détails du produit

  useEffect(() => {
    const fetchProduct = async () => {
      const backendUrl =
        import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:5000'
      try {
        const { data } = await axios.get(`${backendUrl}/products/${productId}`) // Utilisez productId pour faire une requête au backend
        setProduct(data) // Stockez les détails du produit récupéré dans l'état
      } catch (error) {
        console.error('Erreur lors de la récupération du produit', error)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId]) // Ce useEffect dépend de productId

  if (!product) {
    return <div>Chargement...</div>
  }

  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product} />
      <RelatedProducts productId={productId} />
    </div>
  )
}

export default Product
