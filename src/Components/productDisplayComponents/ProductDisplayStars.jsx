import { renderStars } from './productDisplayFunctions.jsx'

const ProductDisplayStars = ({ product }) => {
  return (
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
  )
}
export default ProductDisplayStars
