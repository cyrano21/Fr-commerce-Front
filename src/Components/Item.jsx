import { Link } from 'react-router-dom'

const Item = (props) => {
  const handleImageClick = () => {
    window.scrollTo(0, 0)
  }

  // Et dans votre balise img
  ;<img onClick={handleImageClick} src={props.image} alt="products" />

  return (
    <div className="item">
      <Link to={`/product/${props.id}`} style={{ textDecoration: 'none' }}>
        <img onClick={window.scrollTo(0, 0)} src={props.image} alt="products" />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.new_price}</div>
        <div className="item-price-old">${props.old_price}</div>
      </div>
    </div>
  )
}

export default Item
