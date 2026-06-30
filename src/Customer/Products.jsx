import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

// Images
import rice from '../assets/rice.png'
import dairy from '../assets/dairy.png'
import snack from '../assets/snack.png'
import fruits from '../assets/fruits.png'
import bevarage from '../assets/bevarage.png'
import household from '../assets/household.png'
import spices from '../assets/spices.png'
import { Slide, toast } from 'react-toastify'
import { AuthContext } from '../Context/AuthContext'

const Products = () => {
    const { token } = useContext(AuthContext)

    const apibase = "https://grocery-kirana-store.onrender.com"

    const [allProducts, setAllProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${apibase}/allproducts`)
            setAllProducts(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    // ============= Fetch Filter Products =============
    const fetch_filter = async (search) => {
        try {
            setAllProducts([])
            const response = await axios.get(`${apibase}/filter/${search}`)
            setAllProducts(response.data)
        } catch (error) {
            console.log(`Error:- ${error}`)
            fetchProducts()
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

    useEffect(() => {
        fetchProducts()
    }, [])

    const categories = [
        { name: "Rice", icon: rice },
        { name: "Dairy", icon: dairy },
        { name: "Snacks", icon: snack },
        { name: "Fruits", icon: fruits },
        { name: "Beverages", icon: bevarage },
        { name: "Household", icon: household },
        { name: "Spices", icon: spices },
    ]

    return (
        <div className="w-full min-h-screen bg-[#d2fcc7] flex gap-5 p-5">

            {/* ================= Sidebar ================= */}

            <div className="w-[20%] min-w-55 bg-white rounded-2xl shadow-md p-4">

                <h1 className="text-xl font-bold mb-5">
                    Categories
                </h1>

                <div className="flex flex-col gap-3">

                    {
                        categories.map((item, index) => (

                            <div
                                key={index}
                                onClick={() => fetch_filter(item.name)}
                                className="flex items-center gap-3 bg-[#eafde5] p-3 rounded-xl cursor-pointer hover:bg-[#d8f8cd] transition"
                            >
                                <img
                                    src={item.icon}
                                    alt=""
                                    className="w-12 h-12 object-contain"
                                />
                                <p className="font-medium">
                                    {item.name}
                                </p>

                            </div>

                        ))
                    }

                </div>

            </div>

            {/* ================= Products ================= */}

            <div className="flex-1 bg-white rounded-2xl shadow-md p-5">

                <div className="flex justify-between items-center mb-5">

                    <h1 className="text-2xl font-bold">
                        Products
                    </h1>

                    <p className="text-gray-500">
                        {allProducts.length} Products
                    </p>

                </div>

                <div className="flex flex-wrap gap-5">

                    {
                        allProducts.length === 0 ?

                            <p className="text-lg font-semibold">
                                Product not available
                            </p>

                            :

                            allProducts.map((product, index) => (

                                <div
                                    key={index}
                                    className="w-52 bg-white rounded-xl flex flex-col justify-between shadow hover:shadow-lg border overflow-hidden transition"
                                >

                                    <div className="h-36 bg-gray-100 flex justify-center items-center">

                                        <img
                                            src={product.image_url}
                                            alt=""
                                            className="w-28 h-28 object-contain"
                                        />

                                    </div>

                                    <div className="p-3">

                                        <h2 className="font-semibold text-sm line-clamp-2">
                                            {product.productname}
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            {product.brand} • {product.unit}
                                        </p>

                                        <div className="flex justify-between items-center mt-4">

                                            <p className="font-bold text-green-600">
                                                ₹{product.discount_price}
                                            </p>

                                            <button
                                                onClick={() => add_to_cart(product._id)}
                                                className="bg-[#16be06] text-white px-3 py-1 rounded hover:bg-green-700 transition"
                                            >
                                                Add
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))

                    }

                </div>

            </div>

        </div>
    )
}

export default Products