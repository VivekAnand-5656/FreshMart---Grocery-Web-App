import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'

// -------- Images -------
import rice from '../assets/rice.png'
import dairy from '../assets/dairy.png'
import snack from '../assets/snack.png'
import fruits from '../assets/fruits.png'
import bevarage from '../assets/bevarage.png'
import household from '../assets/household.png'
import spices from '../assets/spices.png'
import { Slide, toast } from 'react-toastify'
import { AuthContext } from '../Context/AuthContext'

const FilterProducts = () => {
    const {token} = useContext(AuthContext)
    const [searchParams] = useSearchParams()
    const category = searchParams.get("category")

    const [products, setProducts] = useState([])
    const apibase = "https://grocery-kirana-store.onrender.com"

    // ============= Fetch Filter Products =============
    const fetch_filter = async (search) => {
        try {
            const response = await axios.get(`${apibase}/filter/${search}`)
            setProducts(response.data)
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }

    // ============= Add to Cart ===========
    const add_to_cart = async (productid) => {
        try {
            const response = await axios.put(`${apibase}/customer/addtocart/${productid}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success('Cart Added', {
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
            console.log(`Raise Error:- ${error.response.data.detail}`)
        }
    }

    // ----------- Categories -------
    const catagories = [
        { name: "Rice", icon: rice },
        { name: "Dairy", icon: dairy },
        { name: "Snacks", icon: snack },
        { name: "Fruits", icon: fruits },
        { name: "Beverages", icon: bevarage },
        { name: "Household", icon: household },
        { name: "Spices", icon: spices }
    ]

    useEffect(() => {
        fetch_filter(category)
    }, [])

    return (
        <div className="w-full h-screen bg-[#d2fcc7] p-5 flex gap-5">

            {/* ================= Sidebar ================= */}
            <div className="scrolling w-[20%] min-w-[230px] bg-white rounded-2xl shadow-lg p-4 overflow-y-auto">

                <h1 className="text-2xl font-bold mb-5">
                    Categories
                </h1>

                <div className="flex flex-col gap-3">
                    {
                        catagories.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => fetch_filter(item.name)}
                                className="flex items-center gap-4 bg-[#eafde5] hover:bg-[#dffad5] rounded-xl p-3 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                            >
                                <img
                                    src={item.icon}
                                    alt=""
                                    className="w-14 h-14 object-contain"
                                />

                                <p className="font-semibold text-gray-700">
                                    {item.name}
                                </p>
                            </div>
                        ))
                    }
                </div>

            </div>

            {/* ================= Products ================= */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-5">

                {/* Header */}
                <div className="flex justify-between items-center mb-5">

                    <h1 className="text-3xl font-bold">
                        Products
                    </h1>

                    <p className="text-gray-500">
                        {products.length} Products
                    </p>

                </div>

                {/* Products Grid */}

                <div className="scrolling h-[88%] overflow-y-auto flex flex-wrap gap-5">

                    {
                        products.length === 0 ?

                            (
                                <div className="w-full flex justify-center items-center">
                                    <p className="text-xl font-semibold text-gray-500">
                                        Product not available
                                    </p>
                                </div>
                            )

                            :

                            (
                                products.map((product, index) => (

                                    <div
                                        key={index}
                                        className="w-52 h-72 bg-white border rounded-xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden"
                                    >

                                        <div className="w-full h-36 bg-gray-50 flex justify-center items-center">
                                            <img
                                                src={product.image_url}
                                                alt=""
                                                className="w-32 h-32 object-contain"
                                            />
                                        </div>

                                        <div className="h-[144px] p-3 flex flex-col justify-between">

                                            <div>

                                                <h2 className="font-semibold text-[15px] line-clamp-2">
                                                    {product.productname}
                                                </h2>

                                                <p className="text-sm text-gray-500 mt-1">
                                                    {product.brand} • {product.unit}
                                                </p>

                                            </div>

                                            <div className="flex justify-between items-center">

                                                <p className="text-lg font-bold text-green-600">
                                                    ₹{product.discount_price}
                                                </p>

                                                <button
                                                    onClick={() => add_to_cart(product._id)}
                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg transition duration-300 cursor-pointer"
                                                >
                                                    Add
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ))
                            )

                    }

                </div>

            </div>

        </div>
    )
}

export default FilterProducts