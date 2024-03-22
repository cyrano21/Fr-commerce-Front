import { useEffect } from 'react'

export const useUpdateTotalItems = (
  setTotalItems,
  getTotalCartItems,
  cartItems,
) => {
  useEffect(() => {
    setTotalItems(getTotalCartItems())
  }, [cartItems, setTotalItems, getTotalCartItems])
}

export const useHandleScroll = (setIsSticky) => {
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setIsSticky])
}

export const toggleDropdown = (setIsMenuVisible) => () =>
  setIsMenuVisible((prevState) => !prevState)

export const translateToFrench = (item) => {
  const translations = {
    shop: 'boutique',
    mens: 'hommes',
    women: 'femmes',
    kids: 'enfants',
  }
  return translations[item] || item
}
