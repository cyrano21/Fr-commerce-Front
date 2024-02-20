import Breadcrums from '../Components/Breadcrums.jsx'
import ProductDisplay from '../Components/ProductDisplay.jsx'
import DescriptionBox from '../Components/DescriptionBox.jsx'
import RelatedProducts from '../Components/RelatedProducts.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

// export default Product
const Product = () => {
  const [products, setProducts] = useState([])
  const [selectedProductId, setSelectedProductId] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const backendUrl =
        import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:5000'
      try {
        const { data } = await axios.get(`${backendUrl}/allproducts`)
        setProducts(data.products)
        // Exemple : Sélectionnez le premier produit par défaut ou basé sur une certaine logique
        if (data.products.length > 0) {
          setSelectedProductId(data.products[0]._id)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des produits', error)
      }
    }

    fetchProducts()
  }, [])
  const selectedProduct = products.find(
    (product) => product._id === selectedProductId,
  )

  if (!selectedProduct) {
    return <div>Chargement...</div>
  }

  return (
    <div>
      <Breadcrums product={selectedProduct} />
      <ProductDisplay productId={selectedProductId} />
      <DescriptionBox />
      {/* Passez l'_id du produit sélectionné en props */}
      <RelatedProducts productId={selectedProductId} />
    </div>
  )
}

export default Product
