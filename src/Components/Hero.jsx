import hand_icon from '../assets/hand_icon.png'
import arrow_icon from '../assets/arrow.png'
import hero_image from '../assets/hero_image.png'

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NOUVEAUTÉS EXCLUSIVES</h2>
        <div>
          <div className="hero-hand-icon">
            <p>Nouvelles</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>collections</p>
          <p>pour tout le monde</p>
        </div>
        <div className="hero-latest-btn">
          <div>Dernière Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  )
}
export default Hero
