import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import HomePage from "./components/Home/HomePage"
import NotFountPage from "./components/ui/NotFountPage"
import ProductPage from "./components/product/ProductPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products/:slug" element={<ProductPage />}/>
          <Route path="*" element={<NotFountPage />}></Route>
        </Route>

      </Routes>
    </BrowserRouter>

  )
}

export default App