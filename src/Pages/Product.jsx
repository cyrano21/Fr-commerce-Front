import Breadcrums from '../Components/Breadcrums.jsx'
import ProductDisplay from '../Components/ProductDisplay.jsx'
import DescriptionBox from '../Components/DescriptionBox.jsx'
import RelatedProducts from '../Components/RelatedProducts.jsx'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { useContext, useMemo } from 'react'

// export default Product
const Product = () => {
  const { products } = useContext(ShopContext)
  const { _id } = useParams()
  const product = useMemo(
    () => products.find((p) => p._id === _id),
    [products, _id],
  )

  // Afficher un spinner de chargement ou un message si le produit n'est pas trouvé
  if (!product) {
    return <div>Chargement du produit...</div> // ou un spinner de chargement
  }

  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts productId={product._id} />
    </div>
  )
}

export default Product
