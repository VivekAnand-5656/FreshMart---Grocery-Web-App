import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { toast, Slide } from 'react-toastify'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import successanim from '../Lotties/loader.lottie'

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [formdata, setFormdata] = useState({
    email: "",
    password: ""
  })



  const apibase = "https://grocery-kirana-store.onrender.com"
  // ====== Login =====
  const handle_change = (e) => {
    setFormdata({
      ...formdata, [e.target.name]: e.target.value
    })
  }
  const [loading, setLoading] = useState(false)
  const handle_login = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post(`${apibase}/loginuser`, formdata)
      login(response.data)
      setFormdata({
        email: "",
        password: ""
      })
      if (response.data.role === "customer") {
        navigate("/")
      } else {
        navigate("/sellerhome")
      }
      toast.success('Login Successfully ✅', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });

    } catch (error) {
      console.log(`Error:- ${error}`)
    } finally {
      setLoading(true)
    }
  }
  return (
    <>
      <div className=' w-full h-[90vh] bg-[#d2fcc7] flex justify-center items-center p-2 ' >

        <div className='bg-[#ffffff] w-[30%] h-full rounded-2xl p-2 flex flex-col justify-center   ' >
          <h1 className=' text-3xl font-bold uppercase text-[#000000] text-center  ' >Fresh<span className=' text-[#35d703] ' >Mart</span>  </h1 >
          <p className=' text-center font-bold text-2xl ' >Welcome Back</p>
          <p className=' text-center font-semibold text-[0.9rem] ' >Login to your account</p>
          <form
            onSubmit={handle_login}
            className=' w-full  flex flex-col '
          >
            <label htmlFor="email" className=' font-semibold text-[#35d703] ' >Email Address</label>
            <input type="email" name="email" placeholder='Enter your email'
              value={formdata.email}
              onChange={handle_change}
              className=' border border-[#35d703] outline-0  rounded p-1.5 '
            />
            <label htmlFor="password" className=' font-semibold text-[#35d703] ' >Password</label>
            <input type="password" name="password" placeholder='Enter your password'
              value={formdata.password}
              onChange={handle_change}
              className=' border border-[#35d703] outline-0  rounded p-1.5 '
            />
            <p className='self-end cursor-pointer underline font-semibold text-[#35d703] '>Forgot password</p>
            <button type='submit'
              className=' font-semibold text-[#ffffff] p-2 bg-[#35d703] rounded cursor-pointer hover:bg-[#2ba207] transition-all duration-500 '
            >Login</button>
          </form>
          <p className=' text-center font-semibold ' >Don't have an account ? <span onClick={() => navigate("/signup")} className=' text-[#35d703] cursor-pointer ' >Register</span></p>
        </div >

        {/* ========= Loader ======== */}
        {
          loading &&(
             <div className=' w-full h-full fixed flex justify-center items-center bg-[#ffffff76]  ' >
              <DotLottieReact
              src={successanim}
              autoplay
              loop
              className=' w-64 h-64 '
            />
            </div>
          )
        }
      </div >
    </>
  )
}

export default Login