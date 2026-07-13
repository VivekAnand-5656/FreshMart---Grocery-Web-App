import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, Slide } from 'react-toastify'

const Signup = () => {
  const navigate = useNavigate()
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "customer"

  })

  const apibase = "https://grocery-kirana-store.onrender.com"
  // ========= Signup ============
  const handle_change = (e) => {
    setFormdata({
      ...formdata, [e.target.name]: e.target.value
    })
  }
  const handle_signup = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${apibase}/signup`, formdata)
      navigate("/login")
      toast.success('Registered Successfully ✅', {
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
      setFormdata({
        name: "",
        email: "",
        mobile: "",
        password: "",
        role: ""
      })

    } catch (error) {
      console.log(`Error:- ${error}`)
    }
  }
  return (
    <>
      <div className=' w-full h-auto bg-[#d2fcc7] flex justify-center items-center p-2 ' >
        <div className='bg-[#ffffff] sm:w-[30%] w-[80%] h-full rounded-2xl p-2 flex flex-col justify-center   ' >
          <h1 className=' sm:text-[1.2em] font-bold uppercase text-[#000000] text-center  ' >Fresh<span className=' text-[#35d703] ' >Mart</span>  </h1 >
          <p className=' text-center font-semibold text-[0.9rem] ' >Create to your account</p>
          <form
            onSubmit={handle_signup}
            className=' w-full  flex flex-col '
          >
            <label htmlFor="name" className=' font-semibold text-[#35d703] ' >Full Name</label>
            <input type="text" name="name" placeholder='Enter your Full Name'
              value={formdata.name}
              onChange={handle_change}
              className=' border border-[#35d703] outline-0  rounded p-1.5 '
            />

            <label htmlFor="email" className=' font-semibold text-[#35d703] ' >Email Address</label>
            <input type="email" name="email" placeholder='Enter your email'
              value={formdata.email}
              onChange={handle_change}
              className=' border border-[#35d703] outline-0  rounded p-1.5 '
            />
            <label htmlFor="mobile" className=' font-semibold text-[#35d703] ' >Email Address</label>
            <input type='number' name="mobile" placeholder='Enter Mobile No.'
              value={formdata.mobile}
              onChange={handle_change}
              className=' border border-[#35d703] outline-0  rounded p-1.5 '
            />

            <label htmlFor="password" className=' font-semibold text-[#35d703] ' >Password</label>
            <input type="password" name="password" placeholder='Enter your password'
              value={formdata.password}
              onChange={handle_change}
              className=' border border-[#35d703] outline-0  rounded p-1.5 '
            />

            <label htmlFor="role" className="block mb-2 font-semibold text-green-600" >
              Select Role
            </label>
            <select
              id="role"
              name="role"
              value={formdata.role}
              onChange={handle_change}
              className="w-full border border-green-600 rounded-lg px-3 py-2 outline-none focus:border-green-500"
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>

            <button type='submit'
              className=' font-semibold text-[#ffffff] p-2 bg-[#35d703] rounded cursor-pointer hover:bg-[#2ba207] transition-all duration-500 '
            >Register</button>
          </form>
          <p className=' text-center font-semibold ' >Already have an account ? <span onClick={() => navigate("/login")} className=' text-[#35d703] cursor-pointer ' >Login</span></p>
        </div>
      </div>
    </>
  )
}

export default Signup