import { Routes,Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { ToastContainer } from 'react-toastify';

import Navbar from "./components/Navbar"
import SideBar from "./components/SideBar"
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import Login from "./components/Login"


export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "COP";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"")

  useEffect(()=>{
    localStorage.setItem("token",token)
  },[token])

  return (
    <div className="bg-black">
    <ToastContainer />
    {token === "" ? 
      <Login setToken={setToken} />:
      <>
        <Navbar setToken={setToken} />
          <hr className="bg-white h-0.5"></hr>
        <div className="flex gap-4">
          <SideBar/>
          <div className="w-[70%] mx-auto mt-[30px] text-white">
            <Routes >
              <Route path="/add" element={<Add token={token}/>} />
              <Route path="/list" element={<List token={token}/>} />
              <Route path="/orders" element={<Orders token={token}/>} />
            </Routes>
          </div>
        </div>
        
      </>
    }
    
    
      
    
    </div>
  )
}

export default App
