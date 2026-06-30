import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { Slide, toast } from 'react-toastify'

const SearchProducts = () => {
    const { searchProducts, token } = useContext(AuthContext)


    const apibase = "https://grocery-kirana-store.onrender.com"
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

    return (
        <>
            <div className=' w-full bg-[#ffffff] h-screen border-t p-2 ' >
                {
                    searchProducts.length === 0 ?

                        (
                            <div className="w-full flex justify-center items-center">
                                <p className="text-xl font-semibold text-gray-500">
                                    Product not available
                                </p>
                            </div>
                        )

                        :

                        (
                            searchProducts.map((product, index) => (

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
        </>
    )
}

export default SearchProducts