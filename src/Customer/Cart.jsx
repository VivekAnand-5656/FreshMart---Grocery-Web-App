import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'
import { toast, Slide } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ImCross } from "react-icons/im";
import emptycart from '../Lotties/empty-cart.png'
import { BiSolidCoupon } from "react-icons/bi";
import { LuPanelRightClose } from "react-icons/lu";


const Cart = () => {
    const { token, selectAddress, setSelectAddress } = useContext(AuthContext)
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
    // --- Update in backend Delete Cart

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
    const choose_Address = async (addressId) => {
        try {
            setSelectAddress({})
            const response = await axios.get(`${apibase}/customer/chooseaddress/${addressId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setSelectAddress(response.data)

        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }

    // ============== Apply Coupon =============
    const [isCoupon, setIsCoupon] = useState(false)
    const [coupon, setCoupon] = useState("")
    const [finalprice, setFinalprice] = useState(0)
    const [allCoupons, setAllCoupons] = useState([])

    const fetch_coupon = async () => {
        try {
            const response = await axios.get(`${apibase}/customer/getcoupon`,
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

    // ============ Apply Coupon ============
    const apply_coupon = async (cpn) => {
        try {
            const response = await axios.post(`${apibase}/customer/applycoupon/${cpn}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            await fetch_carts()
            setCoupon(response.data.coupon)
            setFinalprice(response.data.final_price)
            setIsCoupon(false)
        } catch (error) {
            console.log(`Error:- ${error}`)
            toast.error(`${error.response.data.detail}`, {
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
    }

    // ========== CheckOut ============
    const [success, setSuccess] = useState(false)
    const checked_out = async () => {
        try {
            if (Object.keys(selectAddress).length === 0) {
                toast.error('Please select address', {
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
                return;
            }
            setSuccess(true)

            const response = await axios.put(`${apibase}/customer/placeorder`,
                selectAddress,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
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
        } finally {
            setSuccess(false)
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
            <div className="w-full h-screen flex gap-4 p-2 overflow-hidden">
                {/* Left Side */}
                <div className="scrolling w-[70%] h-full bg-[#a9fa95] rounded-2xl p-2 flex flex-col overflow-y-auto overflow-x-hidden">

                    <h1 className="text-2xl font-bold">
                        My Carts
                    </h1>

                    <div className="  flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center gap-2">
                        {carts.length === 0 ? (
                            <div className='h-[90vh] w-full flex flex-col justify-center items-center ' >
                                <img src={emptycart} alt="emptycart" className=' w-30 h-30 animate-bounce transition-all duration-1000 ' />
                            </div>
                        ) : (
                            carts.map((cart) => (
                                <div
                                    key={cart._id}
                                    className="w-[60%] h-20  bg-white rounded-xl shadow-md p-2 flex justify-between items-center gap-2 "
                                >

                                    {/* Image */}
                                    <div className="w-32 h-full flex justify-center items-center">
                                        <img
                                            src={cart.allcarts.image_url}
                                            alt={cart.allcarts.productname}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex gap-2 justify-between ">

                                        <h2 className="text-[0.8rem] line-clamp-1 font-semibold">
                                            {cart.allcarts.productname}
                                        </h2>

                                        <p className="text-[0.7rem] text-gray-500 mt-1">
                                            {cart.allcarts.brand} {cart.allcarts.unit}
                                        </p>

                                        <div className="flex justify-between items-center gap-2 mt-1.5">

                                            <p className="text-[1rem] font-bold text-green-600">
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
                                    <div className=' flex gap-1 ' >
                                        <div
                                            className="flex justify-center items-center text-[1rem] gap-1.5">
                                            <button
                                                onClick={() => decrease_quantity(cart.allcarts._id)}
                                                className=' bg-[#e8e3e3] px-1 rounded cursor-pointer ' >-</button>
                                            <span>{cart.quantity}</span>
                                            <button
                                                onClick={() => increase_quantity(cart.allcarts._id)}
                                                className=' bg-[#e8e3e3] px-1 rounded cursor-pointer '>+</button>
                                        </div>
                                        <button
                                            onClick={() => remove_cart(cart.allcarts._id)}
                                            className=' text-[#ff0101] cursor-pointer ' > <MdDelete /> </button>
                                    </div>

                                </div>
                            ))
                        )}
                    </div>

                </div>

                {/* Right Side */}
                <div className="w-80 relative ">
                    <div className="bg-white border shadow-md rounded-xl p-5  ">

                        <h2 className="text-xl font-bold mb-4">
                            Checkout
                        </h2>

                        <p className=' flex justify-between items-center font-semibold  '>Total Items : <span>{carts.length}</span></p>
                        <p className=' flex justify-between items-center font-semibold ' >Delivery Charges : <span className=' text-[#26cb05] ' >Free</span> </p>
                        <p className=' flex justify-between items-center font-semibold ' >Total Ammount : <span>₹ {
                            finalprice === 0 ? (total) :
                                (finalprice)
                        }</span> </p>

                        <hr className="my-4" />

                        {/* ----------- Address ----------- */}
                        {
                            selectAddress && (
                                <p className=' text-[0.8rem] font-semibold text-end '>{selectAddress.area} {selectAddress.house_no} {selectAddress.city} {selectAddress.pincode}</p>
                            )
                        }

                    </div>
                    {/* ---- Address ---- */}
                    <div className="bg-white gap-2  shadow-md rounded-xl p-5 sticky top-5 flex flex-col ">

                        <div className=' rounded border border-[#4ddd0a] flex ' >
                            <input type="text" placeholder={coupon === "" ? "COUPON" : coupon}
                                className=' outline-0 w-[70%] ' />
                            <button
                                onClick={() => {
                                    setIsCoupon(true)
                                    fetch_coupon()
                                }}
                                className="w-[30%] h-full self-end flex justify-center items-center  bg-green-600 text-white p-1 text-[0.7rem] cursor-pointer ">
                                <BiSolidCoupon /> All Offer's
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                getAddress()
                                setIsAddres(true)
                            }}
                            className="w-auto self-end  bg-green-600 text-white p-1 text-[0.7rem] rounded-lg cursor-pointer ">
                            Select Address
                        </button>
                        <button
                            onClick={checked_out}
                            className="w-full bg-green-600 text-white py-3 rounded-lg mt-4">
                            Proceed to Checkout
                        </button>
                    </div>
                    {/* ------- All Address ----- */}
                    <div
                        className={`w-[40vw] h-[50vh] bg-white rounded-xl shadow-lg fixed top-20 left-95 z-50 p-4 overflow-y-auto transition-all duration-300
                    ${isAddres
                                ? "translate-y-5 opacity-100 visible"
                                : "-translate-y-20 opacity-0 invisible"
                            }`}
                    >
                        {/* Close Button */}
                        <ImCross
                            onClick={() => setIsAddres(false)}
                            className="absolute top-3 right-3 text-red-500 cursor-pointer hover:text-red-700"
                        />

                        <h2 className="text-xl font-semibold text-green-700 mb-3">
                            Select Address
                        </h2>

                        <button
                            onClick={() => {
                                getCurentLocation();
                                addAddress();
                            }}
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mb-4"
                        >
                            + Add Address
                        </button>

                        {alladdress.length === 0 ? (
                            <p className="text-gray-500 text-center">No Address Found</p>
                        ) : (
                            alladdress.map((addr, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded-lg p-3 mb-3 hover:border-green-500"
                                >
                                    <h3 className="font-semibold">{addr.house_no}</h3>

                                    <p className="text-gray-600">{addr.area}</p>

                                    {addr.landmark && (
                                        <p className="text-gray-500">{addr.landmark}</p>
                                    )}

                                    <p className="text-gray-700">
                                        {addr.city}, {addr.state}
                                    </p>

                                    <p className="text-gray-700 mb-3">{addr.pincode}</p>

                                    <button
                                        onClick={() => choose_Address(addr.add_id)}
                                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                                    >
                                        Select
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    {/* =========== Payment Success =========== */}
                    {
                        <div
                            className={`w-full h-full flex flex-col fixed top-0 left-0 bg-[#ffffff76]  items-center justify-center transition-all duration-500 ease-in-out 
                        ${success
                                    ? " visible scale-105 "
                                    : " invisible scale-0 "
                                }
                        `} >

                            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-10 h-10 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>

                            <h2 className="mt-4 text-2xl font-bold text-green-600">
                                Payment Successful
                            </h2>

                            <p className="text-gray-500">
                                Your order has been placed.
                            </p>

                        </div>
                    }

                    {/* =============== All Coupons ============ */}
                    <div className={`fixed top-15 right-0 w-[20vw] h-[90vh] flex flex-col gap-2 p-2 rounded-l-2xl  bg-[#196203] transition-all duration-500 ease-linear 
                        ${isCoupon ? " visible translate-x-0 opacity-100 "
                            : " invisible translate-x-20 opacity-0 "
                        }
                        `} >
                        <LuPanelRightClose
                            onClick={() => setIsCoupon(false)}
                            className=' text-[1.5rem] font-semibold left-0 z-50 absolute cursor-pointer text-white ' />
                        <p className=' text-center font-semibold text-white uppercase ' >All Coupon's</p>
                        {
                            allCoupons.length === 0 ? (
                                <p>No Coupons</p>
                            ) : (
                                allCoupons.map((cpn, index) => (
                                    <div
                                        key={index}
                                        className="w-full bg-white rounded-lg p-2"
                                    >
                                        <div className="flex justify-around items-center">
                                            <p className=' font-bold text-[#1144ec] ' >{cpn.code}</p>

                                            <p>
                                                {cpn.type_discount === "percentage"
                                                    ? `${cpn.discount}%`
                                                    : `₹${cpn.discount}`}
                                            </p>

                                            <button
                                                onClick={() => apply_coupon(cpn.code)}
                                                className="bg-[#f98705] px-1 font-semibold text-white rounded text-[0.8rem] cursor-pointer">
                                                Apply
                                            </button>
                                        </div>

                                        <p className="text-sm text-gray-500 mt-2">
                                            Coupon will be applied on minimum order {cpn.minimum_value}
                                        </p>
                                    </div>
                                ))
                            )
                        }
                    </div>


                </div>

            </div>
        </>
    )
}

export default Cart