import { useEffect } from 'react'
import axios from 'axios'

import star_icon from '../../assets/star_icon.png'
import star_half_icon from '../../assets/star_half_icon.svg'
import star_dull_icon from '../../assets/star_dull_icon.png'

export const useFetchProduct = (setProduct, productId) => {
  useEffect(() => {
    const fetchProduct = async () => {
      const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL
      const { data } = await axios.get(`${backendUrl}/products/${productId}`)
      setProduct(data)
    }
    fetchProduct()
  }, [productId, setProduct])
}

export const selectSize = (setSelectedSize) => (size) => setSelectedSize(size)

export const handleAddToCart = (
  selectedSize,
  addToCart,
  product,
  setSelectedSize,
) => {
  if (selectedSize) {
    addToCart({ itemId: product._id, size: selectedSize })
  } else {
    setSelectedSize('S') // Default to size 'S' if no size is selected
  }
}

export const renderStars = (rating) => {
  const totalStars = 5
  let stars = []
  for (let i = 1; i <= Math.floor(rating); i++) {
    stars.push(<img key={`star-${i}`} src={star_icon} alt="star" />)
  }
  if (rating % 1 !== 0) {
    stars.push(
      <img
        key="star-half"
        src={star_half_icon}
        alt="half star"
        style={{ width: '20px', height: '20' }}
      />,
    )
  }
  for (let i = stars.length + 1; i <= totalStars; i++) {
    stars.push(<img key={`star-${i}`} src={star_dull_icon} alt="empty star" />)
  }
  return stars
}
