import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'
import { toast, Slide } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ImCross } from "react-icons/im";


const Cart = () => {
    const { token } = useContext(AuthContext)
    const [carts, setCarts] = useState([])
    const navigate = useNavigate()

    // =============== API ===============
    const apibase = "https://grocery-kirana-store.onrender.com"
    const fetch_carts = async () => {
        try {
            const response = await axios.get(`${apibase}/customer/mycarts`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setCarts(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(`Error:- ${error}`)
            console.log(`Raise Error:- ${error.response.data.detail}`)
        }
    }


    // ========= Remove Cart ==========
    const remove_cart = async (productid) => {
        try {
            const response = await axios.put(`${apibase}/customer/removeCart/${productid}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            await fetch_carts()
            await fetch_total()
            toast.success('Item Removed ✅', {
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
    // --- Update in backend 

    // =============== Increase Quantity =============
    const increase_quantity = async (product_id) => {
        try {
            const response = await axios.put(`${apibase}/customer/increasecartquantity/${product_id}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            await fetch_carts()
            toast.success('Quantity Increased ✅', {
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

    // =============== Decrease Quantity =============
    const decrease_quantity = async (productId) => {
        try {
            const response = await axios.put(`${apibase}/customer/decreasecartquantity/${productId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            await fetch_carts()
            toast.success('Quantity Decreased ✅', {
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



    // ------------ Select Address ------------
    const [isAddres, setIsAddres] = useState(false)
    const [alladdress, setAlladdress] = useState([])
    const getAddress = async () => {
        try {
            const response = await axios.get(`${apibase}/customer/alladdress`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setAlladdress(response.data)
            console.log("Address:- ", response.data)

        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }

    // ---------- Select GeoLocation Address ------
    const [location, setLocation] = useState(null)
    const [loading, setLoading] = useState(false)

    const getCurentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geo Location is not supported")
            return;
        }
        setLoading(true)
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const latitude = position.coords.latitude
                    const longitude = position.coords.longitude

                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    )
                    const data = await response.json()

                    const address = {
                        house_no: data.address.house_number || "",
                        area:
                            data.address.suburb ||
                            data.address.neighbourhood ||
                            data.address.residential ||
                            "",
                        landmark: data.address.road || "",
                        city:
                            data.address.city ||
                            data.address.town ||
                            data.address.village ||
                            data.address.hamlet ||
                            "",
                        state: data.address.state || "",
                        pincode: data.address.postcode || "",
                    };

                    console.log(address);
                    setLocation(address)
                    await addAddress(address)
                    await getAddress()

                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }
        )
    }

    // --------- Add Address --------
    const addAddress = async (address) => {
        try {
            const response = await axios.put(`${apibase}/customer/addaddress`, address,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            await getAddress()
            console.log("Address Added")
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }

    // ==== Pure Total ==== 
    const [total, setTotal] = useState(0)
    useEffect(() => {
        const price = carts.reduce((sum, item) => {
            return sum + (item["allcarts"]["discount_price"] * item["quantity"])
        }, 0)
        setTotal(price)
    }, [carts])

    // --------- Choose Address ------------
    const [selectAddress,setSelectAddress] = useState({})
    const choose_Address = async(addressId)=>{
        try {
            const response = await axios.get(`${apibase}/customer/chooseaddress/${addressId}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            setSelectAddress(response.data)
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }

    // ========== CheckOut ============
    const checked_out = async () => {
        try {
            const response = await axios.put(`${apibase}/customer/placeorder`,
                selectAddress,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }

            )
            toast.success('Order Placed Successfully ✅', {
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
            navigate("/")

        } catch (error) {
            console.log(`Error:- ${error}`)
            console.log(`Raise Error:- ${error.response.data.detail}`)
        }
    }

    useEffect(() => {
        if (token) {
            fetch_carts()
            getAddress()
        }
    }, [token])

    return (
        <>
            <div className="w-full flex gap-6">
                {/* Left Side */}
                <div className="flex-1">

                    <h1 className="text-2xl font-bold mb-5">
                        My Carts
                    </h1>

                    {carts.length === 0 ? (
                        <p>Empty Carts</p>
                    ) : (
                        carts.map((cart) => (
                            <div
                                key={cart._id}
                                className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-4 mb-4"
                            >

                                {/* Image */}
                                <div className="w-32 h-32 flex justify-center items-center">
                                    <img
                                        src={cart.allcarts.image_url}
                                        alt={cart.allcarts.productname}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1">

                                    <h2 className="text-lg font-semibold">
                                        {cart.allcarts.productname}
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {cart.allcarts.brand}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {cart.allcarts.unit}
                                    </p>

                                    <div className="flex items-center gap-3 mt-3">

                                        <p className="text-xl font-bold text-green-600">
                                            ₹{cart.allcarts.discount_price}
                                        </p>

                                        {cart.allcarts.discount > 0 && (
                                            <p className="text-gray-400 line-through">
                                                ₹{cart.allcarts.price}
                                            </p>
                                        )}

                                    </div>

                                </div>

                                {/* Quantity + Button */}
                                <div className=' flex gap-2 ' >
                                    <div
                                        className="flex justify-center items-center text-2xl gap-3">
                                        <button
                                            onClick={() => decrease_quantity(cart.allcarts._id)}
                                            className=' bg-[#e8e3e3] px-2 rounded cursor-pointer ' >-</button>
                                        <span>{cart.quantity}</span>
                                        <button
                                            onClick={() => increase_quantity(cart.allcarts._id)}
                                            className=' bg-[#e8e3e3] px-2 rounded cursor-pointer '>+</button>
                                    </div>
                                    <button
                                        onClick={() => remove_cart(cart.allcarts._id)}
                                        className=' text-[#ff0101] cursor-pointer ' > <MdDelete /> </button>
                                </div>

                            </div>
                        ))
                    )}

                </div>

                {/* Right Side */}
                <div className="w-80">
                    <div className="bg-white border shadow-md rounded-xl p-5 sticky top-5">

                        <h2 className="text-xl font-bold mb-4">
                            Checkout
                        </h2>

                        <p className=' flex justify-between items-center font-semibold  '>Total Items : <span>{carts.length}</span></p>
                        <p className=' flex justify-between items-center font-semibold ' >Delivery Charges : <span className=' text-[#26cb05] ' >Free</span> </p>
                        <p className=' flex justify-between items-center font-semibold ' >Total Ammount : <span>₹ {total}</span> </p>

                        <hr className="my-4" />



                    </div>
                    {/* ---- Address ---- */}
                    <div className="bg-white  shadow-md rounded-xl p-5 sticky top-5">
                        <button
                            onClick={() => {
                                getAddress()
                                setIsAddres(true)
                            }}
                            className="  bg-green-600 text-white p-2 rounded-lg cursor-pointer ">
                            Select Address
                        </button>
                        <button
                            onClick={checked_out}
                            className="w-full bg-green-600 text-white py-3 rounded-lg mt-4">
                            Proceed to Checkout
                        </button>
                    </div>
                    {/* ------- All Address ----- */}
                    {
                        isAddres && (
                            <div className=' w-[40vw] h-[50vh] bg-[#d1c3c3] flex flex-col gap-2 fixed top-20 left-95 rounded-2xl z-50 overflow-scroll scrolling p-2   ' >
                                <button
                                    onClick={() => {
                                        getCurentLocation()
                                        addAddress()
                                    }}
                                    className=' bg-[#2a36da] px-2 rounded cursor-pointer text-white font-semibold mb-1 ' >Add Address</button>
                                {
                                    alladdress.length === 0 ? (
                                        <p>Please Select Address</p>
                                    )
                                        : (

                                            alladdress.map((addr, index) => (
                                                <div key={index} className=" bg-[#ffffff] rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer transition flex  justify-between items-center ">
                                                    <ImCross
                                                        onClick={() => setIsAddres(false)}
                                                        className=' absolute top-0 right-2 cursor-pointer text-[#ff0404] ' />
                                                    <div  >
                                                        <h3 className="text-lg font-semibold">{addr.house_no}</h3>

                                                        <p className="text-gray-600 mt-1">{addr.area}</p>

                                                        {addr.landmark && (
                                                            <p className="text-gray-600">{addr.landmark}</p>
                                                        )}

                                                        <p className="text-gray-700 mt-2">
                                                            {addr.city}, {addr.state}
                                                        </p>

                                                        <p className="text-gray-700">
                                                            {addr.pincode}
                                                        </p>
                                                    </div>
                                                    <button 
                                                    onClick={()=>choose_Address(addr.add_id)}
                                                    className=' bg-[#ff0505] font-semibold text-white px-2 cursor-pointer rounded ' >Select</button>

                                                </div>
                                            ))

                                        )
                                }
                            </div>
                        )
                    }

                </div>

            </div>
        </>
    )
}

export default Cart