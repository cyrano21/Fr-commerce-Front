import { ShopContext } from '../Context/ShopContext.jsx'
import Modal from './Modal.jsx'
import { useParams } from 'react-router-dom'
import {
  useFetchProduct,
  selectSize,
  handleAddToCart,
  renderStars,
} from './productDisplayComponents/productDisplayFunctions.jsx'
import { useContext, useState } from 'react'

const ProductDisplay = () => {
  const { productId } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToCart } = useContext(ShopContext)
  const [selectedSize, setSelectedSize] = useState('')
  const [product, setProduct] = useState(null)

  useFetchProduct(setProduct, productId)

  const handleSizeSelection = selectSize(setSelectedSize)
  const handleCartAddition = () =>
    handleAddToCart(selectedSize, addToCart, product, setSelectedSize)

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product?.image} alt="img" />
          <img src={product?.image} alt="img" />
          <img src={product?.image} alt="img" />
          <img src={product?.image} alt="img" />
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product?.image}
            alt="Produit"
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <div>
          <h1>{product?.name}</h1>
          <div className="productdisplay-right-stars">
            {product && renderStars(product.rating)}
            <p>
              (
              {product?.numberOfReviews !== undefined
                ? product.numberOfReviews
                : 'Aucun avis'}
              )
            </p>
          </div>

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

          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <div
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
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
          <Modal onClose={() => setIsModalOpen(false)}>
            <h2>Sélectionnez une taille</h2>
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size)
                  setIsModalOpen(false)
                }}
              >
                {size}
              </button>
            ))}
          </Modal>
        )}
      </div>
    </div>
  )
}

export default ProductDisplay
