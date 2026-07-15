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
import sellerback from '../assets/seller.png'
import { Slide, toast } from 'react-toastify';

const Dashboard = () => {
    const { token, role, user, setUser } = useContext(AuthContext)
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

    // ============= Get My Coupons =====
    const [allcoupons, setAllCoupons] = useState([])
    const my_coupons = async () => {
        try {
            const response = await axios.get(`${apibase}/sellers/getcoupon`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setAllCoupons(response.data)
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }
    // ========== Delete Coupon ======
    const delete_coupon = async (couponId) => {
        try {
            const response = await axios.delete(`${apibase}/sellers/deletecoupon/${couponId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            await my_coupons()
            toast.success(`Coupon Deleted`, {
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
        }
    }

    // ---------- Func Calls -------
    useEffect(() => {
        if (token) {
            fetchProfile()
            fetch_earning()
            fetch_order()
            fetch_myproducts()
            my_coupons()
        }
    }, [token])

    return (
        <div>
            {/* Hero */}
            <div className=" w-full  bg-[#1c5201] rounded-3xl p-8 text-white flex justify-between items-center flex-wrap">

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
                    src={sellerback}
                    className="w-80 rounded-2xl mt-5"
                />

            </div>

            {/* Stats */}

            <div className="flex flex-wrap gap-5 mt-8">

                <div className="bg-white rounded-2xl flex justify-center items-center gap-2 shadow-lg p-2 w-30 h-20 hover:-translate-y-2 duration-300">
                    <FaBoxOpen className="text-[2rem] text-blue-600" />
                    <div>
                        <h2 className="text-[1rem] font-bold ">{totalProducts}</h2>
                        <p className="text-gray-500">Products</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl flex justify-center items-center gap-2 shadow-lg p-2 w-30 h-20 hover:-translate-y-2 duration-300">
                    <FaShoppingBag className="text-[1rem] text-green-600" />
                    <div>
                        <h2 className="text-[1rem] font-bold ">{totalOrder}</h2>
                        <p className="text-gray-500">Orders</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl flex justify-center items-center gap-2 shadow-lg p-2 w-30 h-20 hover:-translate-y-2 duration-300">
                    <FaWallet className="text-[1rem] text-orange-500" />
                    <div>
                        <h2 className="text-[1rem] font-bold ">₹ {totalEarning} </h2>
                        <p className="text-gray-500">Revenue</p>
                    </div>
                </div>

            </div>

            {/* =============Coupons ============= */}
            <div className='scrolling bg-[#ffffff] sm:w-[40vw] w-full sm:h-[70vh]  sm:mt-5 rounded-2xl p-2 overflow-scroll ' >
                <h1 className=' text-[1.2rem] font-bold ' >COUPON's</h1>
                {
                    allcoupons.length === 0 ? (
                        <p>No Coupon's</p>
                    ) : (
                        allcoupons.map((item, index) => (
                            <div key={index} className="w-full bg-white rounded-2xl shadow-md border border-gray-200 p-2 mb-2 hover:shadow-xl duration-300">

                                {/* Header */}
                                <div className="flex justify-between items-center">

                                    <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full text-xs font-semibold">
                                        {item.type_discount === "percentage"
                                            ? `${item.discount}% OFF`
                                            : `₹${item.discount} OFF`}
                                    </span>

                                    <span
                                        className={`text-xs px-1 py-0.5 rounded-full ${item.is_Active
                                            ? "bg-green-500 text-white"
                                            : "bg-red-500 text-white"
                                            }`}
                                    >
                                        {item.is_Active ? "Active" : "Inactive"}
                                    </span>

                                </div>

                                {/* Coupon Code */}
                                <h2 className="text-2xl font-bold text-gray-800  tracking-wider">
                                    {item.code}
                                </h2>

                                <div className="border-t border-dashed "></div>

                                {/* Details */}

                                <div className="flex flex-col gap-1 text-sm text-gray-600">

                                    <div className="flex justify-between">
                                        <span>Minimum Order</span>
                                        <span className="font-semibold text-black">
                                            ₹{item.minimum_value}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Expires</span>
                                        <span className="font-semibold text-black">
                                            {new Date(item.expiry_time).toLocaleDateString()}
                                        </span>
                                    </div>

                                </div>

                                {/* Buttons */}

                                <div className="flex mt-2">

                                    <button 
                                    onClick={()=>delete_coupon(item._id)}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium duration-300">
                                        Delete
                                    </button>

                                </div>

                            </div>
                        ))
                    )
                }
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