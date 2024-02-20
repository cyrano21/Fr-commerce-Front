import { Link } from 'react-router-dom'

const Item = ({ _id, name, image, new_price, old_price }) => {
  return (
    <Link to={`/product/${_id}`} style={{ textDecoration: 'none' }}>
      <div className="item">
        {image && (
          <img
            src={image}
            alt={name}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
        <p>{name}</p>
        <div className="item-prices">
          <div className="item-price-new">${new_price}</div>
          <div className="item-price-old">${old_price}</div>
        </div>
      </div>
    </Link>
  )
}

export default Item
