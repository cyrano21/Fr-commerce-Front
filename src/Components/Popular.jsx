import { useEffect, useState } from 'react'
import axios from 'axios'
import Item from './Item'
import Slider from 'react-slick'
// Assurez-vous que ces importations de CSS sont bien placées
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL

const Popular = () => {
  const [products, setProducts] = useState([])

  const fetchPopularProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/popularproducts`)
      console.log('response>>>', response)
      setProducts(response.data)
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des produits populaires',
        error,
      )
    }
  }

  useEffect(() => {
    fetchPopularProducts()
  }, [])

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: true, // Cette ligne assure que les flèches sont activées
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="popular">
      <h1>LES PLUS POPULAIRES</h1>
      <hr />
      <div className="popular-item">
        {products.length === 0 && <p>Aucun produit actuellement</p>}
        <Slider key={products.length} {...settings}>
          {products.map((item, i) => (
            <div key={i}>
              <div className="item-container">
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Popular
