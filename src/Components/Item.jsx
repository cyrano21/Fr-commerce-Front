import { Link } from 'react-router-dom' // Ajoutez cette ligne pour importer Link

const Item = ({ id, name, image, new_price, old_price }) => {
  return (
    <div className="item">
      <Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
        {image && (
          <img
            src={image}
            alt={name}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
      </Link>
      <p>{name}</p>
      <div className="item-prices">
        <div className="item-price-new">${new_price}</div>
        <div className="item-price-old">${old_price}</div>
      </div>
    </div>
  )
}

export default Item
