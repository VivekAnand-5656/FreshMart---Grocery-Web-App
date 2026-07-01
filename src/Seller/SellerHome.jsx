import React, { useContext, useEffect, useState } from "react";
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
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SellerHome = () => {
    const {token} = useContext(AuthContext)
    const navigate = useNavigate()
    const [totalEarning,setTotalEarning] = useState(0)
    const [totalOrder,setTotalOrder] = useState(0)
    const [totalProducts,setTotalProducts] = useState(0)
    const apibase = "https://grocery-kirana-store.onrender.com"

    // ============== Fetch Total Earning ===========
    const fetch_earning = async ()=>{
        try {
            const response = await axios.get(`${apibase}/sellers/totalearning`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            setTotalEarning(response.data.total) 
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }

    // ============== Fetch Total Order ===========
    const fetch_order = async ()=>{
        try {
            const response = await axios.get(`${apibase}/sellers/totalorder`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            setTotalOrder(response.data.total) 
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }

    // ============== Fetch My Products ===========
    const fetch_myproducts = async ()=>{
        try {
            const response = await axios.get(`${apibase}/sellers/myproducts`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            setTotalProducts(response.data.length) 
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }

    // ---------- Func Calls -------
    useEffect(()=>{
        if(token){
            fetch_earning()
            fetch_order()
            fetch_myproducts()
        }
    },[token])

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            {/* Hero */}
            <div className="bg-gradient-to-r from-green-700 via-green-500 to-green-700 rounded-3xl p-8 text-white flex justify-between items-center flex-wrap">

                <div>
                    <p className="text-lg">Welcome Back 👋</p>

                    <h1 className="text-4xl font-bold mt-2">
                        Grow Your Store
                    </h1>

                    <p className="mt-3 text-blue-100 max-w-lg">
                        Manage products, track orders and increase your sales with
                        your seller dashboard.
                    </p>

                    <div className="flex gap-4 mt-6">

                        <button 
                        onClick={()=>navigate("/addproduct")}
                        className="bg-white text-[#44ac08] px-5 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 duration-300">
                            <FaPlus />
                            Add Product
                        </button>

                        <button className="border border-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-white hover:text-[#44ac08] duration-300">
                            <FaEye />
                            View Orders
                        </button>

                    </div>

                </div>

                <img
                    src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=500"
                    className="w-80 rounded-2xl mt-5"
                />

            </div>

            {/* Stats */}

            <div className="flex flex-wrap gap-5 mt-8">

                <div className="bg-white rounded-2xl shadow-lg p-6 w-64 hover:-translate-y-2 duration-300">
                    <FaBoxOpen className="text-3xl text-blue-600" />
                    <h2 className="text-3xl font-bold mt-4">{totalProducts}</h2>
                    <p className="text-gray-500">Products</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 w-64 hover:-translate-y-2 duration-300">
                    <FaShoppingBag className="text-3xl text-green-600" />
                    <h2 className="text-3xl font-bold mt-4">{totalOrder}</h2>
                    <p className="text-gray-500">Orders</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 w-64 hover:-translate-y-2 duration-300">
                    <FaWallet className="text-3xl text-orange-500" />
                    <h2 className="text-3xl font-bold mt-4">₹ {totalEarning} </h2>
                    <p className="text-gray-500">Revenue</p>
                </div> 

            </div> 

            {/* ================= Quick Actions ================= */}

            <div className="mt-12">

                <h2 className="text-2xl font-bold text-gray-800 mb-5">
                    ⚡ Quick Actions
                </h2>

                <div className="flex flex-wrap gap-5">

                    <div
                    onClick={()=>navigate("/addproduct")}
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

            </div>

        </div>
    );
};

export default SellerHome;