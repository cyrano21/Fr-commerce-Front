import { ShopContext } from '../Context/ShopContext.jsx'
import { useParams } from 'react-router-dom'
import {
  useFetchProduct,
  selectSize,
  handleAddToCart,
} from './productDisplayComponents/productDisplayFunctions.jsx'
import { useContext, useState } from 'react'
import ProductDisplayImages from './productDisplayComponents/ProductDisplayImages.jsx'
import ProductDisplayModal from './productDisplayComponents/ProductDisplayModal.jsx'
import ProductDisplaySizeSelector from './productDisplayComponents/ProductDisplaySizeSelector.jsx'
import ProductDisplayStars from './productDisplayComponents/ProductDisplayStars.jsx'

const ProductDisplay = () => {
  const { productId } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToCart } = useContext(ShopContext)
  const [selectedSize, setSelectedSize] = useState('')
  const [product, setProduct] = useState(null)

  useFetchProduct(setProduct, productId)

  const handleSizeSelection = selectSize(setSelectedSize)
  const handleCartAddition = () => {
    if (selectedSize === '') {
      // Si aucune taille n'est sélectionnée, ouvrez le modal pour la sélection de la taille
      setIsModalOpen(true)
    } else {
      // Sinon, continuez à ajouter le produit au panier
      handleAddToCart(selectedSize, addToCart, product, setSelectedSize)
    }
  }

  return (
    <div className="productdisplay">
      <ProductDisplayImages product={product} />
      <div className="productdisplay-right">
        <div>
          <h1>{product?.name}</h1>
          <ProductDisplayStars product={product} />

          <div className="productdisplay-right-prices">
            <h3>Prix: </h3>
            <div className="productdisplay-right-price-old">
              ${product?.old_price}
            </div>
            <div className="productdisplay-right-price-new">
              ${product?.new_price}
            </div>
          </div>
          <div className="productdisplay-right-description">
            {product?.description
              ? product?.description
              : 'Un t-shirt léger, généralement tricoté, ajusté avec un col rond et des manches courtes, porté comme un sous-vêtement ou un vêtement extérieur.'}
          </div>
          <ProductDisplaySizeSelector
            selectedSize={selectedSize}
            handleSizeSelection={handleSizeSelection}
          />
          <button onClick={() => handleCartAddition()}>
            AJOUTER AU PANIER
          </button>
          <p className="productdisplay-right-category">
            <span>Category :</span> {product?.category}
          </p>
          <p className="productdisplay-right-tags">
            <span>Tags :</span> {product?.tags?.join(', ')}
          </p>
        </div>

        {isModalOpen && (
          <ProductDisplayModal
            setSelectedSize={setSelectedSize}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </div>
  )
}

export default ProductDisplay
