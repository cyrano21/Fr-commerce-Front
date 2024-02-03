import data_product from '../assets/data.js'
import Item from './Item.jsx'

const RelatedProducts = () => {
  return (
    <div className="relatedproducts">
      <h1>Produits Associés</h1>
      <hr />
      <div className="relatedproducts-item">
        {data_product.map((item) => (
          <Item
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            key={item.id} // Assurez-vous de passer la clé ici
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
