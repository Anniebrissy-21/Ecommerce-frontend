import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import HomePage from "./components/Home/HomePage"
import NotFountPage from "./components/ui/NotFountPage"
import ProductPage from "./components/product/ProductPage"
import { useEffect, useState } from "react"
import api from "./api"
import CartPage from "./components/cart/CartPage"
import CheckoutPage from "./components/checkout/CheckoutPage"
import LoginPage from "./components/user/LoginPage"
import ProtectedRoute from "./components/ui/ProtectedRoute"
import { AuthProvider } from "./context/AuthContext"
import UserProfilePage from "./components/user/UserProfilePage"
import PaymentsStatusPage from "./components/payments/PaymentsStatusPage"
import RegistrationPage from "./components/user/RegistrationPage"
import ProductsPageWithCategory from "./components/user/ProductPageWithCategory"

const App = () => {
  const [numCartItems, setNumCartItems] = useState(0)
  const cart_code = localStorage.getItem("cart_code")
  const newCartCode = { 'cart_code': cart_code }

  useEffect(() => {
    if (cart_code) {
      api.get(`/cart_status?cart_code=${cart_code}`)
        .then(res => {
          console.log(res.data.num_of_items)
          setNumCartItems(res.data.num_of_items)
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }, [cart_code])

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout numCartItems={numCartItems} />}>
            <Route index element={<HomePage />} />
            <Route path="products/:slug" element={<ProductPage setNumCartItems={setNumCartItems} />} />
            <Route path="cart" element={<CartPage setNumCartItems={setNumCartItems} />} />
            <Route path="checkout" element={<ProtectedRoute> <CheckoutPage /> </ProtectedRoute>} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegistrationPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="products" element={<ProductsPageWithCategory setNumCartItems={setNumCartItems} />} />
            <Route path="*" element={<NotFountPage />} />
            <Route path="payment-status" element={<PaymentsStatusPage setNumCartItems={setNumCartItems} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
