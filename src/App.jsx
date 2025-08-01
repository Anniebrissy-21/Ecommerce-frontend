import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import HomePage from "./components/Home/HomePage"
import NotFountPage from "./components/ui/NotFountPage"
import ProductPage from "./components/product/ProductPage"
import { useEffect, useState } from "react"
import api from "./api"
import CartPage from "./components/cart/CartPage"

const App = () => {
  const [numCartItems, setNumCartItems] = useState(0)
  const cart_code = localStorage.getItem("cart_code")
  const newCartCode = {'cart_code': cart_code}

  useEffect(() => {
    if (cart_code) {
      api.get(`cart_status?cart_code=${cart_code}`)
        .then(res => {
          console.log(res.data)
          setNumCartItems(res.data.num_of_items)
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }, [cart_code])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout numCartItems={numCartItems} />}>
          <Route index element={<HomePage />} />
          <Route path="products/:slug" element={<ProductPage setNumCartItems={setNumCartItems} />} />
          <Route path="cart" element={<CartPage setNumCartItems={setNumCartItems} />} />
          <Route path="*" element={<NotFountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
