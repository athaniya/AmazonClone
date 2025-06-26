import { Route, Routes } from "react-router-dom"
import AddFood from "./pages/AddFood"
import ShowAllFood from "./pages/ShowAllFood"
import Sidebar from "./component/Sidebar"
import { ToastContainer } from "react-toastify"
import Order from "./pages/Order"


function App() {

  return (
    <>
     <div className="flex ">
        <ToastContainer/>
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-600">
          <Routes>
            
            <Route path="/" element={<AddFood />} />
            <Route path="/add-food" element={<AddFood />} />
            <Route path="/show-all-food" element={<ShowAllFood />} />
            <Route path="/orders" element={<Order/>} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
