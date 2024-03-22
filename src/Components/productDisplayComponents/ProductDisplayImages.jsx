const ProductDisplayImages = ({ product }) => {
  return (
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
  )
}
export default ProductDisplayImages
