import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import HomePage from "./components/Home/HomePage"
import NotFountPage from "./components/ui/NotFountPage"
import ProductPage from "./components/product/ProductPage"
import { useEffect, useRef, useState } from "react"
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
import WishListPage from "./components/wishlist/WishListPage"
import { randomValue } from "./GenerateCartCode"
import { toast } from "react-toastify"
import CreateProduct from "./components/product/CreateProduct"

const App = () => {
  const [numCartItems, setNumCartItems] = useState(0)
  const [wishListCount, setWishListCount] = useState([])
  const [wishList, setWishList] = useState([])
  const [cartCode, setCartCode] = useState(() => localStorage.getItem("cart_code"))
  const hasAddedCartCode = useRef(false)

  useEffect(() => {
    if (!cartCode && !hasAddedCartCode.current) {
      hasAddedCartCode.current = true;
      const generatedCode = randomValue;
      api.post('cart_code_add/', { cart_code: generatedCode })
        .then(res => {
          const returnedCartCode = res.data.cart_code
          localStorage.setItem('cart_code', returnedCartCode)
          localStorage.setItem('cart_id', res.data.id)
          setCartCode(returnedCartCode)
        })
        .catch(err => {
          toast.error(err.message)
        })
      return;
    }
    api.get(`/cart_status?cart_code=${cartCode}`)
      .then(res => {
        setNumCartItems(res.data.num_of_items)
      })
      .catch(err => {
        console.log(err.message)
      })
    api.get('/wishlist')
      .then(res => {
        const filteredWishlist = res.data.filter(item => item.is_added === true)
        setWishList(filteredWishlist)
        setWishListCount(filteredWishlist.length)
      })
  }, [cartCode])


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout numCartItems={numCartItems} wishListCount={wishListCount} />}>
            <Route index element={<HomePage />} />
            <Route path="products/:slug" element={<ProductPage setNumCartItems={setNumCartItems} />} />
            <Route path="cart" element={<CartPage setNumCartItems={setNumCartItems} />} />
            <Route path="checkout" element={<ProtectedRoute> <CheckoutPage /> </ProtectedRoute>} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegistrationPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="products" element={<ProductsPageWithCategory setNumCartItems={setNumCartItems} setWishListCount={setWishListCount} />} />
            <Route path="*" element={<NotFountPage />} />
            <Route path="payment-status" element={<PaymentsStatusPage setNumCartItems={setNumCartItems} />} />
            <Route path="wishlist" element={<WishListPage setWishListCount={setWishListCount} />} />
            <Route path="/product" element={<CreateProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
