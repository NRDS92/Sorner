import { Routes,Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"


import Navbar from "./components/Navbar"
import Home from "./Pages/Home"
import Footer from "./components/Footer"
import Collections from "./Pages/Collections"
import ProductDetail from "./Pages/ProductDetail"
import Cart from "./Pages/Cart"
import About from "./Pages/About"
import Login from "./Pages/Login"
import PlaceOrders from "./Pages/PlaceOrders"
import Orders from "./Pages/Orders"



function App() {
  
  return (
    <div className="flex flex-col w-screen h-full">
      <Navbar  />
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/allCollections" element={<Collections />}></Route>
        <Route path="/product/:productId" element={<ProductDetail />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/place-orders" element={<PlaceOrders />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
