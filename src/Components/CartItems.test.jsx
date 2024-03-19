import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import axios from 'axios'
import { ShopContext } from '../Context/ShopContext.jsx'
import CartItems from '../Components/CartItems.jsx'

jest.mock('axios')

describe('CartItems', () => {
  const mockContext = {
    cartItems: {},
    removeFromCart: jest.fn(),
    getTotalCartAmount: jest.fn(),
    getTotalCartItems: jest.fn(),
    isProductsLoading: false,
    increaseQuantity: jest.fn(),
    decreaseQuantity: jest.fn(),
    setCartItems: jest.fn(),
    getDefaultCart: jest.fn(),
    products: [],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('displays loading when products are loading', () => {
    const { getByText } = render(
      <ShopContext.Provider value={{ ...mockContext, isProductsLoading: true }}>
        <CartItems />
      </ShopContext.Provider>,
    )

    expect(getByText('Chargement...')).toBeInTheDocument()
  })

  it('displays empty cart message when no items in cart', () => {
    const { getByText } = render(
      <ShopContext.Provider value={mockContext}>
        <CartItems />
      </ShopContext.Provider>,
    )

    expect(getByText('Votre panier est vide.')).toBeInTheDocument()
  })

  it('displays cart items when items are in cart', () => {
    const { getByText } = render(
      <ShopContext.Provider
        value={{
          ...mockContext,
          cartItems: { 1: 1 },
          products: [
            { _id: '1', name: 'Product 1', new_price: 100, image: 'image.jpg' },
          ],
        }}
      >
        <CartItems />
      </ShopContext.Provider>,
    )

    expect(getByText('Product 1')).toBeInTheDocument()
    expect(getByText('$100')).toBeInTheDocument()
  })

  it('calls increaseQuantity when + button is clicked', () => {
    const { getByText } = render(
      <ShopContext.Provider
        value={{
          ...mockContext,
          cartItems: { 1: 1 },
          products: [
            { _id: '1', name: 'Product 1', new_price: 100, image: 'image.jpg' },
          ],
        }}
      >
        <CartItems />
      </ShopContext.Provider>,
    )

    fireEvent.click(getByText('+'))
    expect(mockContext.increaseQuantity).toHaveBeenCalledWith('1')
  })

  it('calls decreaseQuantity when - button is clicked and quantity is more than 1', () => {
    const { getByText } = render(
      <ShopContext.Provider
        value={{
          ...mockContext,
          cartItems: { 1: 2 },
          products: [
            { _id: '1', name: 'Product 1', new_price: 100, image: 'image.jpg' },
          ],
        }}
      >
        <CartItems />
      </ShopContext.Provider>,
    )

    fireEvent.click(getByText('-'))
    expect(mockContext.decreaseQuantity).toHaveBeenCalledWith('1')
  })

  it('calls removeFromCart when x button is clicked and quantity is 1', () => {
    const { getByText } = render(
      <ShopContext.Provider
        value={{
          ...mockContext,
          cartItems: { 1: 1 },
          products: [
            { _id: '1', name: 'Product 1', new_price: 100, image: 'image.jpg' },
          ],
        }}
      >
        <CartItems />
      </ShopContext.Provider>,
    )

    fireEvent.click(getByText('x'))
    expect(mockContext.removeFromCart).toHaveBeenCalledWith('1')
  })

  it('calls axios.post and navigates to /payment when checkout button is clicked', async () => {
    axios.post.mockResolvedValue({})

    const { getByText } = render(
      <ShopContext.Provider
        value={{
          ...mockContext,
          cartItems: { 1: 1 },
          products: [
            { _id: '1', name: 'Product 1', new_price: 100, image: 'image.jpg' },
          ],
        }}
      >
        <CartItems />
      </ShopContext.Provider>,
    )

    fireEvent.click(getByText('PASSER À LA CAISSE'))

    await waitFor(() => expect(axios.post).toHaveBeenCalled())
    expect(
      screen.getByText(
        'Rediriger vers la page de paiement avec indication de succès',
      ),
    ).toBeInTheDocument()
  })
})
