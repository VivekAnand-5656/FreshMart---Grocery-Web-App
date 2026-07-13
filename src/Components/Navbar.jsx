import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast, Slide } from 'react-toastify';
// -------- Icons -----------
import { FaCartShopping, FaLocationDot } from "react-icons/fa6";
import { FaHeart, FaSearch, FaUserCircle, FaWindowClose } from "react-icons/fa";
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

    // ====== Show Mobile Menu =========
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className=' w-full h-[10vh] flex justify-between items-center font-semibold p-2 shadow-2xs relative  '>

            {/* -------- Logo -------- */}
            <h1 className=' text-2xl font-bold uppercase text-[#000000] flex justify-center items-center '>
                <FcShop /> Fresh<span className=' text-[#35d703] '>Mart</span>
            </h1>

            {/* -------- Search (hidden on mobile) -------- */}
            <div className='hidden md:flex bg-[#c1f7b0] justify-center items-center gap-1.5 shadow-2xs p-1 rounded w-[30%] '>
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
                    className=' w-[95%] h-full outline-0 '
                />
                <button
                    onClick={() => {
                        search_product(search)
                        navigate(`/search`)
                    }}
                    className=' cursor-pointer '> <FaSearch /> </button>
            </div>

            {/* -------- Desktop Links (hidden on mobile) -------- */}
            <div className='hidden md:flex items-center gap-2 '>
                {
                    role === "seller" ? (
                        <ul className=' flex justify-center items-center gap-2 '>
                            <li><NavLink to="sellerhome" className={({ isActive }) => isActive ? ' text-[#259d00] border-b-2 border-b-[#259d00] rounded p-1.5' : ' text-[#000000] p-1.5 hover:text-[#259d00] transition-all duration-500 ease-in-out '} >Home</NavLink></li>
                        </ul>
                    ) : (
                        <ul className=' flex justify-center items-center gap-2 '>
                            <li><NavLink to="/" className={({ isActive }) => isActive ? ' text-[#259d00] border-b-2 text-[0.8rem] border-b-[#259d00] rounded p-1.5' : ' text-[#000000] p-1.5 text-[0.8rem] hover:text-[#259d00] transition-all duration-500 ease-in-out '} >Home</NavLink></li>
                            <li><NavLink to="orders" className={({ isActive }) => isActive ? ' text-[#259d00] border-b-2 text-[0.8rem] border-b-[#259d00] rounded p-1.5' : ' text-[#000000] p-1.5 text-[0.8rem] hover:text-[#259d00] transition-all duration-500 ease-in-out '} >My Orders</NavLink></li>
                            <li><NavLink to="carts" className={({ isActive }) => isActive ? ' text-[#259d00] border-b-2 text-[0.8rem] border-b-[#259d00] rounded p-1.5' : ' text-[#000000] p-1.5 text-[0.8rem] hover:text-[#259d00] transition-all duration-500 ease-in-out '} ><FaCartShopping /></NavLink></li>
                            <li className=" text-[#259d00] text-[0.7rem] cursor-pointer px-1 rounded line-clamp-1 flex items-center "><FaLocationDot className=' text-black text-[1.2rem] ' /> {selectAddress.area} {selectAddress.house_no} {selectAddress.city} {selectAddress.pincode}</li>
                        </ul>
                    )
                }

                {
                    token ? (
                        <div className='flex items-center gap-3'>
                            <FaUserCircle onClick={() => navigate("/profile")} className="text-2xl text-[#259d00] cursor-pointer" />
                            <NavLink to="signup" className=" text-[0.8rem] border-2 border-[#259d00] bg-[#259d00] text-white rounded p-1 hover:bg-white hover:text-[#259d00] transition ">Become a Seller</NavLink>
                            <button onClick={loging_out} className=" text-[0.8rem] border-2 border-[#259d00] bg-[#259d00] text-white rounded p-1 cursor-pointer hover:bg-white hover:text-[#259d00] transition ">Logout</button>
                        </div>
                    ) : (
                        <ul className=' flex justify-center items-center gap-2 '>
                            <li><NavLink to="login" className=" border-2 border-[#259d00] text-[#259d00] hover:bg-[#259d00] hover:text-[#ffffff] transition-all duration-500 ease-in-out rounded px-1 ">Login</NavLink></li>
                            <li><NavLink to="signup" className=" border-2 border-[#259d00] text-[#ffffff] bg-[#259d00] hover:bg-[#ffffff] hover:text-[#259d00] transition-all duration-500 ease-in-out px-1 rounded ">Signup</NavLink></li>
                        </ul>
                    )
                }
            </div>

            {/* -------- Hamburger (only mobile) -------- */}
            <div className='md:hidden flex items-center'>
                {showMenu ? (
                    <FaWindowClose onClick={() => setShowMenu(false)} className="cursor-pointer text-2xl text-[#259d00]" />
                ) : (
                    <GiHamburgerMenu onClick={() => setShowMenu(true)} className="cursor-pointer text-2xl text-[#259d00]" />
                )}
            </div>

            {/* -------- Mobile Menu Dropdown -------- */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl p-4 flex flex-col gap-3 z-50 transition-all duration-300 ease-out
                ${showMenu ? "translate-y-0 opacity-100 visible" : "-translate-y-5 opacity-0 invisible pointer-events-none"}`}>

                {/* Search */}
                <div className='bg-[#c1f7b0] flex items-center gap-1.5 p-1 rounded'>
                    <input type="search" name="search"
                        placeholder=' Search Products... '
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                search_product(search)
                                navigate(`/search`)
                                setShowMenu(false)
                            }
                        }}
                        className=' w-[90%] h-full outline-0 '
                    />
                    <button
                        onClick={() => {
                            search_product(search)
                            navigate(`/search`)
                            setShowMenu(false)
                        }}
                        className=' cursor-pointer '> <FaSearch /> </button>
                </div>

                {/* Links */}
                {
                    role === "seller" ? (
                        <NavLink to="sellerhome" onClick={() => setShowMenu(false)} className="text-[#000000] p-1.5">Home</NavLink>
                    ) : (
                        <>
                            <NavLink to="/" onClick={() => setShowMenu(false)} className="text-[#000000] p-1.5">Home</NavLink>
                            <NavLink to="orders" onClick={() => setShowMenu(false)} className="text-[#000000] p-1.5">My Orders</NavLink>
                            <NavLink to="carts" onClick={() => setShowMenu(false)} className="text-[#000000] p-1.5 flex items-center gap-1"><FaCartShopping /> Cart</NavLink>
                            <p className=" text-[#259d00] text-[0.8rem] flex items-center gap-1 "><FaLocationDot className=' text-black text-[1.2rem] ' /> {selectAddress.area} {selectAddress.house_no} {selectAddress.city} {selectAddress.pincode}</p>
                        </>
                    )
                }

                {/* Auth Actions */}
                {
                    token ? (
                        <>
                            <NavLink to="/profile" onClick={() => setShowMenu(false)} className="flex items-center gap-2 text-[#259d00]"><FaUserCircle /> Profile</NavLink>
                            <NavLink to="signup" onClick={() => setShowMenu(false)} className="text-center text-[0.8rem] border-2 border-[#259d00] bg-[#259d00] text-white rounded p-1">Become a Seller</NavLink>
                            <button onClick={() => { loging_out(); setShowMenu(false) }} className="text-center text-[0.8rem] border-2 border-[#259d00] bg-[#259d00] text-white rounded p-1">Logout</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="login" onClick={() => setShowMenu(false)} className=" border-2 border-[#259d00] text-[#259d00] rounded px-1 text-center p-1 ">Login</NavLink>
                            <NavLink to="signup" onClick={() => setShowMenu(false)} className=" border-2 border-[#259d00] text-[#ffffff] bg-[#259d00] px-1 rounded text-center p-1 ">Signup</NavLink>
                        </>
                    )
                }
            </div>

        </div>
    )
}

export default Navbar