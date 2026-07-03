import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
    FaBoxOpen,
    FaShoppingBag,
    FaWallet,
    FaStar,
    FaPlus,
    FaEye,
    FaEdit,
    FaTags,
    FaClipboardList,
    FaArrowRight,
    FaFirstOrder,
    FaHome,
} from "react-icons/fa";
import { AuthContext } from '../Context/AuthContext';

const Dashboard = () => {
    const { token,role, user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [totalEarning, setTotalEarning] = useState(0)
    const [totalOrder, setTotalOrder] = useState(0)
    const [totalProducts, setTotalProducts] = useState(0)
    const apibase = "https://grocery-kirana-store.onrender.com"

    // ============ Fetch Profile =====

    const fetchProfile = async () => {
        try {

            if (role === "seller") {
                const response = await axios.get(`${apibase}/sellers/myprofile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data)
            } else {
                const response = await axios.get(`${apibase}/customer/myprofile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
                setAddress(response.data.address)
            }

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }; 

    // ============== Fetch Total Earning ===========
    const fetch_earning = async () => {
        try {
            const response = await axios.get(`${apibase}/sellers/totalearning`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setTotalEarning(response.data.total)
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }

    // ============== Fetch Total Order ===========
    const fetch_order = async () => {
        try {
            const response = await axios.get(`${apibase}/sellers/totalorder`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setTotalOrder(response.data.total)
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }

    // ============== Fetch My Products ===========
    const fetch_myproducts = async () => {
        try {
            const response = await axios.get(`${apibase}/sellers/myproducts`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setTotalProducts(response.data.length)
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }

    // ---------- Func Calls -------
    useEffect(() => {
        if (token) {
            fetchProfile()
            fetch_earning()
            fetch_order()
            fetch_myproducts()
            
        }
    }, [token])

    return (
        <div>
            <h1 className=' text-[1.2rem] font-bold uppercase ' >
                Dashboard
            </h1>
            {/* Hero */}
            <div className=" w-full  bg-linear-to-r from-green-700 via-green-500 to-green-700 rounded-3xl p-8 text-white flex justify-between items-center flex-wrap">

                <div>
                    <p className="text-lg">Welcome Back, {user.name} 👋</p>

                    <h1 className="text-4xl font-bold mt-2">
                        Grow Your Store
                    </h1>

                    <p className="mt-3 text-blue-100 max-w-lg">
                        Manage products, track orders and increase your sales with
                        your seller dashboard.
                    </p> 

                </div>

                <img
                    src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=500"
                    className="w-80 rounded-2xl mt-5"
                />

            </div>

            {/* Stats */}

            <div className="flex flex-wrap gap-5 mt-8">

                <div className="bg-white rounded-2xl shadow-lg p-2 w-30 h-20 hover:-translate-y-2 duration-300">
                    <FaBoxOpen className="text-[1rem] text-blue-600" />
                    <h2 className="text-[1rem] font-bold ">{totalProducts}</h2>
                    <p className="text-gray-500">Products</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-2 w-30 h-20 hover:-translate-y-2 duration-300">
                    <FaShoppingBag className="text-[1rem] text-green-600" />
                    <h2 className="text-[1rem] font-bold ">{totalOrder}</h2>
                    <p className="text-gray-500">Orders</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-2 w-30 h-20 hover:-translate-y-2 duration-300">
                    <FaWallet className="text-[1rem] text-orange-500" />
                    <h2 className="text-[1rem] font-bold ">₹ {totalEarning} </h2>
                    <p className="text-gray-500">Revenue</p>
                </div>

            </div>

            {/* ================= Quick Actions ================= */}

            {/* <div className="mt-12">

                <h2 className="text-2xl font-bold text-gray-800 mb-5">
                    ⚡ Quick Actions
                </h2>

                <div className="flex flex-wrap gap-5">

                    <div
                        onClick={() => navigate("/addproduct")}
                        className="bg-blue-600 text-white w-52 p-6 rounded-2xl cursor-pointer hover:scale-105 duration-300">

                        <FaPlus className="text-3xl" />

                        <h3 className="font-bold mt-5">
                            Add Product
                        </h3>

                        <p className="text-sm mt-2 text-blue-100">
                            Add a new product to your store.
                        </p>

                    </div>

                    <div className="bg-green-600 text-white w-52 p-6 rounded-2xl cursor-pointer hover:scale-105 duration-300">

                        <FaClipboardList className="text-3xl" />

                        <h3 className="font-bold mt-5">
                            Orders
                        </h3>

                        <p className="text-sm mt-2 text-green-100">
                            Check latest customer orders.
                        </p>

                    </div>

                    <div className="bg-purple-600 text-white w-52 p-6 rounded-2xl cursor-pointer hover:scale-105 duration-300">

                        <FaEdit className="text-3xl" />

                        <h3 className="font-bold mt-5">
                            Manage
                        </h3>

                        <p className="text-sm mt-2 text-purple-100">
                            Update product details anytime.
                        </p>

                    </div>

                    <div className="bg-orange-500 text-white w-52 p-6 rounded-2xl cursor-pointer hover:scale-105 duration-300">

                        <FaTags className="text-3xl" />

                        <h3 className="font-bold mt-5">
                            Offers
                        </h3>

                        <p className="text-sm mt-2 text-orange-100">
                            Create discounts & promotions.
                        </p>

                    </div>

                </div>

            </div> */}
        </div>
    )
}

export default Dashboard