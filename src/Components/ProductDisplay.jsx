/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'

import { ShopContext } from '../Context/ShopContext.jsx'
import Modal from './Modal.jsx'
import axios from 'axios'

import star_icon from '../assets/star_icon.png'
import star_half_icon from '../assets/star_half_icon.svg'
import star_dull_icon from '../assets/star_dull_icon.png'
import { useParams } from 'react-router-dom'

const ProductDisplay = () => {
  const { productId } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToCart } = useContext(ShopContext)
  const [selectedSize, setSelectedSize] = useState('')
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)
  const [addToCartError, setAddToCartError] = useState('')

  const handleAddToCart = () => {
    if (!selectedSize) {
      setAddToCartError('Veuillez sélectionner une taille.')
      return
    }

    try {
      addToCart({ itemId: product._id, size: selectedSize })
      // Reset error if the operation is successful
      setAddToCartError('')
      setIsModalOpen(true)
    } catch (error) {
      setAddToCartError(error.message)
    }
  }

  // Afficher l'erreur dans votre composant si elle existe
  {
    addToCartError && <div className="error">{addToCartError}</div>
  }

  console.log('productId:', productId)
  const fetchProduct = async () => {
    try {
      if (productId) {
        try {
          const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL
          console.log(`${backendUrl}/products/${productId}`)

          const { data } = await axios.get(
            `${backendUrl}/products/${productId}`,
          )
          setProduct(data)
          console.log('Produit récupéré: productDisplay', data)
        } catch (error) {
          console.error(
            'Erreur lors de la récupération des détails du produit:',
            error,
          )
        }
      } else {
        console.error('productId est undefined')
      }
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des détails du produit:',
        error,
      )
      setError('Impossible de récupérer les détails du produit.')
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const selectSize = (size) => {
    setSelectedSize(size)
  }

  const renderStars = (rating) => {
    const totalStars = 5
    let stars = []
    for (let i = 1; i <= Math.floor(rating); i++) {
      stars.push(<img key={`star-${i}`} src={star_icon} alt="star" />)
    }
    if (rating % 1 !== 0) {
      stars.push(
        <img
          key="star-half"
          src={star_half_icon}
          alt="half star"
          style={{ width: '20px', height: '20' }}
        />,
      )
    }
    for (let i = stars.length + 1; i <= totalStars; i++) {
      stars.push(
        <img key={`star-${i}`} src={star_dull_icon} alt="empty star" />,
      )
    }
    return stars
  }

  if (!product) {
    return <div>Chargement des produits...</div>
  }

  if (error) {
    return <div>Une erreur est survenue : {error.message}</div>
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
            src={product.image}
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
              ${product.old_price}
            </div>
            <div className="productdisplay-right-price-new">
              ${product.new_price}
            </div>
          </div>
          <div className="productdisplay-right-description">
            {product.description
              ? product.description
              : 'Un t-shirt léger, généralement tricoté, ajusté avec un col rond et des manches courtes, porté comme un sous-vêtement ou un vêtement extérieur.'}
          </div>

          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <div
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => selectSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleAddToCart}>AJOUTER AU PANIER</button>
          <p className="productdisplay-right-category">
            <span>Category :</span> {product.category}
          </p>
          <p className="productdisplay-right-tags">
            <span>Tags :</span> {product.tags?.join(', ')}
          </p>
        </div>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <p>Le produit a bien été ajouté au panier !</p>
            <button onClick={() => setIsModalOpen(false)}></button>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default ProductDisplay
