/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import star_dull_icon from '../assets/star_dull_icon.png'
import { ShopContext } from '../Context/ShopContext.jsx'
import star_icon from '../assets/star_icon.png'
import Modal from './Modal.jsx'

const ProductDisplay = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { product } = props
  const { addToCart } = useContext(ShopContext)

  const handleAddToCart = () => {
    addToCart(product.id)
    setIsModalOpen(true)
  }

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            // eslint-disable-next-line react/prop-types
            src={product.image}
            alt="img"
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Un t-shirt léger, généralement tricoté, ajusté avec un col rond et des
          manches courtes, porté comme un sous-vêtement ou un vêtement
          extérieur.
        </div>

        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={handleAddToCart}>AJOUTER AU PANIER</button>
        <p className="productdisplay-right-category">
          <span>Category :</span> Femmes, T-shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span> Modern, Latest
        </p>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <p>Le produit a bien été ajouté au panier !</p>
          <button onClick={() => setIsModalOpen(false)}></button>
        </Modal>
      )}
    </div>
  )
}

export default ProductDisplay
