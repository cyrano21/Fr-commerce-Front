import React, { createContext, useEffect, useState } from 'react'

export const ShopContext = createContext(null)

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([])

  const increaseQuantity = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
  }

  const decreaseQuantity = (itemId) => {
    setCartItems((prev) => {
      const newQuantity = Math.max(1, prev[itemId] - 1) // La quantité ne peut pas être inférieure à 1
      return { ...prev, [itemId]: newQuantity }
    })
  }

  const getDefaultCart = () => {
    let cart = {}
    for (let i = 0; i < 300; i++) {
      cart[i] = 0
    }
    return cart
  }

  const [cartItems, setCartItems] = useState(getDefaultCart())

  useEffect(() => {
    fetch('https://site--e-commerce-backend--cl5kfjmsrksj.code.run/allproducts')
      .then((res) => res.json())
      .then((data) => setProducts(data))

    if (localStorage.getItem('auth-token')) {
      fetch('https://site--e-commerce-backend--cl5kfjmsrksj.code.run/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setCartItems(data)
        })
    }
  }, [])

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item))
        totalAmount += cartItems[item] * itemInfo.new_price
      }
    }
    return totalAmount
  }

  const getTotalCartItems = () => {
    let totalItem = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item]
      }
    }
    return totalItem
  }

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    if (localStorage.getItem('auth-token')) {
      fetch(
        'https://site--e-commerce-backend--cl5kfjmsrksj.code.run//addtocart',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'auth-token': localStorage.getItem('auth-token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemId: itemId }),
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          console.log('addcard data', data.message)
        })
        .catch((error) => {
          console.error(
            'There has been a problem with your fetch operation:',
            error,
          )
        })
    }
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (localStorage.getItem('auth-token')) {
      fetch(
        'https://site--e-commerce-backend--cl5kfjmsrksj.code.run//removefromcart',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'auth-token': localStorage.getItem('auth-token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemId: itemId }),
        },
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          console.log(data.message)
        })
        .catch((error) => {
          console.error(
            'There has been a problem with your fetch operation:',
            error,
          )
        })
    }
  }

  const contextValue = {
    products,
    getTotalCartItems,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    increaseQuantity,
    decreaseQuantity,
  }
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
