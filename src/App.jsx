import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar.jsx'
import Shop from './Pages/Shop.jsx'
import ShopCategory from './Pages/ShopCategory.jsx'
import Product from './Pages/Product.jsx'
import Cart from './Pages/Cart.jsx'
import LoginSignup from './Pages/LoginSignup.jsx'
import Footer from './Components/Footer.jsx'
import women_banner from './assets/banner_women.png'
import men_banner from './assets/banner_mens.png'
import kids_banner from './assets/banner_kids.png'
import PaymentPage from './Components/PaymentPage.jsx'
import ProductDisplay from './Components/ProductDisplay.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route
          path="/mens"
          element={<ShopCategory banner={men_banner} category="Men" />}
        />
        <Route
          path="/womens"
          element={<ShopCategory banner={women_banner} category="Women" />}
        />
        <Route
          path="/kids"
          element={<ShopCategory banner={kids_banner} category="Kid" />}
        />
        <Route path="/products/:productId" element={<ProductDisplay />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
