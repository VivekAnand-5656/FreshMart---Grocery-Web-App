import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast, Slide } from 'react-toastify';
// -------- Icons -----------
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart, FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from '../Context/AuthContext';



const Navbar = () => {
    const { logout, token } = useContext(AuthContext)
    const navigate = useNavigate()

    const loging_out = () => {
        logout()
        navigate('/')
        toast.success('Logout Successfully', {
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
    }
    return (
        <div className=' w-full h-[10vh] flex justify-between font-semibold p-2 shadow-2xs '
        >
            <h1 className=' text-2xl font-bold uppercase text-[#000000]  ' >Fresh<span className=' text-[#35d703] ' >Mart</span>  </h1>
            <div className='bg-[#c1f7b0] flex justify-center items-center gap-1.5 shadow-2xs p-1 rounded w-[30%] ' >
                <input type="search" name="search"
                    placeholder=' Search Products... '
                    className=' w-[95%] h-full outline-0    '
                />
                <button className=' cursor-pointer ' > <FaSearch /> </button>
            </div>
            <div className='w-[50%] flex justify-between items-center gap-2 ' >

                <ul className=' flex justify-center items-center gap-2 ' >
                    <li><NavLink to="/" className={({ isActive }) => isActive ? ' text-[#259d00] border-b-2  border-b-[#259d00] rounded p-1.5' : ' text-[#000000] p-1.5 hover:text-[#259d00] transition-all duration-500 ease-in-out '} >Home</NavLink></li>
                    <li><NavLink to="myorders" className={({ isActive }) => isActive ? ' text-[#259d00] border-b-2  border-b-[#259d00] rounded p-1.5' : ' text-[#000000] p-1.5 hover:text-[#259d00] transition-all duration-500 ease-in-out '} >My Orders</NavLink></li>
                    <li><NavLink to="wishlist" className={({ isActive }) => isActive ? ' text-[#259d00] border-b-2  border-b-[#259d00] rounded p-1.5' : ' text-[#000000] p-1.5 hover:text-[#259d00] transition-all duration-500 ease-in-out '} ><FaHeart /></NavLink></li>
                    <li><NavLink to="carts" className={({ isActive }) => isActive ? ' text-[#259d00] border-b-2  border-b-[#259d00] rounded p-1.5' : ' text-[#000000] p-1.5 hover:text-[#259d00] transition-all duration-500 ease-in-out '} ><FaCartShopping /></NavLink></li>
                </ul>

                {
                    token? (
                        <ul className=' flex justify-center items-center gap-2 ' >
                            <li onClick={loging_out} className=" border-2 border-[#259d00] cursor-pointer text-[#ffffff] bg-[#259d00] hover:bg-[#ffffff] hover:text-[#259d00] transition-all duration-500 ease-in-out px-1 rounded " >Logout</li>
                            <li className="  text-[#259d00] text-2xl cursor-pointer hover:bg-[#ffffff] hover:text-[#259d00] transition-all duration-500 ease-in-out px-1 rounded " > <FaUserCircle /> </li> 
                            <li><NavLink to="signup" className=" border-2 border-[#259d00] text-[#ffffff] bg-[#259d00] hover:bg-[#ffffff] hover:text-[#259d00] transition-all duration-500 ease-in-out px-1 rounded " >Become a Seller</NavLink></li>
                        </ul>
                    )
                    : (
                            <ul className=' flex justify-center items-center gap-2 ' > 
                                <li><NavLink to="login" className=" border-2 border-[#259d00] text-[#259d00] hover:bg-[#259d00] hover:text-[#ffffff] transition-all duration-500 ease-in-out rounded px-1 " >Login</NavLink></li>
                                <li><NavLink to="signup" className=" border-2 border-[#259d00] text-[#ffffff] bg-[#259d00] hover:bg-[#ffffff] hover:text-[#259d00] transition-all duration-500 ease-in-out px-1 rounded " >Signup</NavLink></li>
                            </ul>
                    )
                }


            </div>
        </div>
    )
}

export default Navbar