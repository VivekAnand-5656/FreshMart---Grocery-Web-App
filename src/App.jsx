import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Layout from './Components/Layout'
import { AuthProvider } from './Context/AuthContext' 
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SellerHome from './Seller/SellerHome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
              <Route path='sellerhome' element={<SellerHome />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer/>
      </AuthProvider>
    </>
  )
}

export default App
