import exclusive_image from '../assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusif</h1>
        <h1>Offres pour vous</h1>
        <p>UNIQUEMENT SUR LES PRODUITS LES PLUS VENDUS</p>
        <button>Vérifier Maintenant</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}
export default Offers
