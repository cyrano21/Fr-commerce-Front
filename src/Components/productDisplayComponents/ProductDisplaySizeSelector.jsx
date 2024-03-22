const ProductDisplaySizeSelector = ({ selectedSize, selectSize }) => (
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
)
export default ProductDisplaySizeSelector
