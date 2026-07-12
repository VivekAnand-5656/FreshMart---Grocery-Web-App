import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast, Slide } from 'react-toastify';
// -------- Icons -----------
import { FaCartShopping, FaLocationDot } from "react-icons/fa6";
import { FaHeart, FaSearch, FaRegWindowClose, FaUserCircle, FaWindowClose } from "react-icons/fa";
import { AuthContext } from '../Context/AuthContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { FcShop } from "react-icons/fc";

import axios from 'axios';



const Navbar = () => {
    const { logout, token, role, selectAddress, setSelectAddress, setSearchProducts } = useContext(AuthContext)
    const navigate = useNavigate()
    const [search, setSearch] = useState("")

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

    // ========= Search Products =============
    const apibase = "https://grocery-kirana-store.onrender.com"

    const search_product = async (search) => {
        try {
            if (!search) {
                setSearchProducts([])
            }
            const response = await axios.get(`${apibase}/search/${search}`)
            setSearchProducts(response.data)
        } catch (error) {
            console.log(`Error:- ${error}`)

        }
    }

    // ====== Show Hamburger =========
    const [showHam, setShowHam] = useState(false)

    return (
        <div className=' w-full h-[10vh] flex justify-between font-semibold p-2 shadow-2xs '
        >
            <h1 className=' text-2xl font-bold uppercase text-[#000000] flex justify-center items-center ' ><FcShop/> Fresh<span className=' text-[#35d703] ' >Mart</span>  </h1>
            <div className='bg-[#c1f7b0] flex justify-center items-center gap-1.5 shadow-2xs p-1 rounded w-[30%] ' >
                <input type="search" name="search"
                    placeholder=' Search Products... '
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            search_product(search)
                            navigate(`/search`)
                        }
                    }}
                    className=' w-[95%] h-full outline-0    '
                />
                <button
                    onClick={() => {
                        search_product(search)
                        navigate(`/search`)
                    }}
                    className=' cursor-pointer ' > <FaSearch /> </button>
            </div>
            <div className='w-[50%] flex justify-between items-center gap-2 relative'>
                {
                    role === "seller" ? (
                        <ul className=' flex justify-center items-center gap-2 ' >
                            <li><NavLink to="sellerhome" className={({ isActive }) => isActive ? ' text-[#259d00] border-b-2  border-b-[#259d00] rounded p-1.5' : ' text-[#000000] p-1.5 hover:text-[#259d00] transition-all duration-500 ease-in-out '} >Home</NavLink></li>
                        </ul>
                    )
                        : (
                            <ul className=' flex justify-center items-center gap-2 ' >
                                <li><NavLink to="/" className={({ isActive }) => isActive ? ' text-[#259d00] border-b-2 text-[0.8rem] border-b-[#259d00] rounded p-1.5' : ' text-[#000000] p-1.5 text-[0.8rem] hover:text-[#259d00] transition-all duration-500 ease-in-out '} >Home</NavLink></li>
                                <li><NavLink to="orders" className={({ isActive }) => isActive ? ' text-[#259d00] border-b-2 text-[0.8rem]  border-b-[#259d00] rounded p-1.5' : ' text-[#000000] p-1.5 text-[0.8rem] hover:text-[#259d00] transition-all duration-500 ease-in-out '} >My Orders</NavLink></li>
                                <li><NavLink to="carts" className={({ isActive }) => isActive ? ' text-[#259d00] border-b-2 text-[0.8rem]  border-b-[#259d00] rounded p-1.5' : ' text-[#000000] p-1.5 text-[0.8rem] hover:text-[#259d00] transition-all duration-500 ease-in-out '} ><FaCartShopping /></NavLink></li>
                                <li className=" text-[#259d00] text-[0.7rem] cursor-pointer hover:bg-[#ffffff] hover:text-[#259d00] transition-all duration-500 ease-in-out px-1 rounded line-clamp-1 flex " ><FaLocationDot className=' text-black text-[1.2rem] ' /> {selectAddress.area} {selectAddress.house_no} {selectAddress.city} {selectAddress.pincode} </li>
                            </ul >
                        )
                }
                {/* ---------- After Token -------- */}
                {
                    token ? (
                        <>

                            <ul className=' flex justify-center items-center gap-2 ' >

                            </ul>
                            {/* // -------------- Drop Down --- */}
                            <div className="relative">
                                {showHam ? (
                                    <FaWindowClose
                                        onClick={() => setShowHam(false)}
                                        className="cursor-pointer text-xl"
                                    />
                                ) : (
                                    <GiHamburgerMenu
                                        onClick={() => setShowHam(true)}
                                        className="cursor-pointer text-xl"
                                    />
                                )}

                                <ul
                                    className={`absolute top-10 right-0 z-50 w-48 bg-white rounded-xl shadow-xl p-3
                                            flex flex-col gap-3
                                            transform transition-all duration-300 ease-out
                                            ${showHam
                                            ? "translate-x-0 opacity-100 visible"
                                            : "translate-y-10  opacity-0 invisible pointer-events-none"
                                        }`}
                                >
                                    <li
                                        onClick={() => {
                                            navigate("/profile");
                                            setShowHam(false);
                                        }}
                                        className="flex justify-center text-[#259d00] text-2xl cursor-pointer hover:scale-110 transition"
                                    >
                                        <FaUserCircle />
                                    </li>

                                    <li>
                                        <NavLink
                                            to="signup"
                                            onClick={() => setShowHam(false)}
                                            className="block text-center text-[0.8rem] border-2 border-[#259d00] bg-[#259d00] text-white rounded p-1 hover:bg-white hover:text-[#259d00] transition"
                                        >
                                            Become a Seller
                                        </NavLink>
                                    </li>

                                    <li
                                        onClick={() => {
                                            loging_out();
                                            setShowHam(false);
                                        }}
                                        className="text-center text-[0.8rem] border-2 border-[#259d00] bg-[#259d00] text-white rounded p-1 cursor-pointer hover:bg-white hover:text-[#259d00] transition"
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>


                        </>

                    )
                        : (
                            <ul className=' flex justify-center items-center gap-2 ' >
                                <li><NavLink to="login" className=" border-2 border-[#259d00] text-[#259d00] hover:bg-[#259d00] hover:text-[#ffffff] transition-all duration-500 ease-in-out rounded px-1 " >Login</NavLink></li>
                                <li><NavLink to="signup" className=" border-2 border-[#259d00] text-[#ffffff] bg-[#259d00] hover:bg-[#ffffff] hover:text-[#259d00] transition-all duration-500 ease-in-out px-1 rounded " >Signup</NavLink></li>
                            </ul>
                        )
                }


            </div >

        </div >
    )
}

export default Navbar