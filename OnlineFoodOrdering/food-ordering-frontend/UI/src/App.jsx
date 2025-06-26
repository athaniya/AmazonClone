import { Route, Routes } from "react-router-dom"
import Navbar from "./component/Navbar"
import Home from "./pages/Home"
import Explore from "./pages/Explore"
import ContactUs from "./pages/ContactUs"
import FoodDetails from "./pages/FoodDetails"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PlaceOrder from "./pages/PlaceOrder"
import { ToastContainer } from "react-toastify"
import Order from "./pages/Order"


function App() {

  return (
    <>
      <Navbar />
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/explore" element={<Explore/>} />
        <Route path="/contact-us" element={<ContactUs/>}/>
        <Route path="/food/:id" element={<FoodDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/order" element={<PlaceOrder/>} />
        <Route path='/myorders' element={<Order/>} />
      </Routes>
    </>
  )
}

export default App
