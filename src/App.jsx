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
import Cart from './Customer/Cart' 
import Orders from './Customer/Orders'
import Profile from './Customer/Profile' 
import FilterProducts from './Customer/FilterProducts'
import Products from './Customer/Products'
import SearchProducts from './Customer/SearchProducts'
import AddProduct from './Seller/AddProduct'

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
              <Route path='carts' element={<Cart />} /> 
              <Route path='orders' element={<Orders />} /> 
              <Route path='profile' element={<Profile />} /> 
              <Route path='filterproducts' element={<FilterProducts />} /> 
              <Route path='products' element={<Products />} /> 
              <Route path='search' element={<SearchProducts />} /> 


              <Route path='sellerhome' element={<SellerHome />} />
              <Route path='addproduct' element={<AddProduct />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer/>
      </AuthProvider>
    </>
  )
}

export default App
