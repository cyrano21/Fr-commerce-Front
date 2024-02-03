import arrow_icon from '../assets/breadcrum_arrow.png'

const Breadcrums = (props) => {
  const { product } = props
  return (
    <div className="breadcrums">
      ACCUEIL <img src={arrow_icon} alt="" /> BOUTIQUE{' '}
      <img src={arrow_icon} alt="" />
      {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  )
}

export default Breadcrums
