import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import pic from '../assets/gr3.png'
import userpic from '../assets/user.png'
import { ImCross } from "react-icons/im";
import { Slide, toast } from "react-toastify";

const Profile = () => {
    const { token, role, address, setAddress } = useContext(AuthContext);

    const [user, setUser] = useState({});

    const apibase = "https://grocery-kirana-store.onrender.com";

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

    // =================== Profile Update ============
    const [showUpdate, setShowUpdate] = useState(false)
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    })
    const handlechange = (e) => {
        setFormdata({
            ...formdata, [e.target.name]: e.target.value
        })
    }
    const updateprofile = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${apibase}/customer/updateprofile`, formdata,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setShowUpdate(false)
            await fetchProfile()
            toast.success('Profile Updated ✅', {
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
            setFormdata({
                name: "",
                email: "",
                mobile: "",
                address: "",
                city: "",
                state: "",
                pincode: ""
            })
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }


    useEffect(() => {
        if (token) {
            fetchProfile()
        }
    }, [token]);
    return (
        <div className="w-full bg-[#ebefe9] mx-auto p-2 flex flex-col justify-center items-center ">
            {/* -------------- Top ------------- */}
            <div className=" w-[60%] h-[30vh] rounded-2xl bg-[#236403] p-2 flex justify-between items-center text-white " >
                {/* ----------- left --------------- */}
                <div className=" w-[50%] h-full flex justify-center items-center " >
                    <div className="  " >
                        <img src={userpic} alt="profile" className=" w-20 h-20 rounded-full " />
                        <h1 className=" font-semibold font-sans " >{user.name}</h1>
                    </div>
                    <div>
                        <p className=" text-[1.2rem] " >Welcome back, {user?.name?.split(" ")[0]}!👋</p>
                    </div>
                </div>
                {/* ------------------ Right ------------ */}
                <div className=" w-[50%] h-full flex justify-center items-center " >
                    <img src={pic} alt="" className=" w-35 h-35 " />
                </div>
            </div>

            {/* ---------------------------------------------- */}
            <div className="bg-white w-[55%] shadow-md rounded-2xl -translate-y-5 p-6">

                <button
                    onClick={() => setShowUpdate(true)}
                    className="absolute top-3 right-3 bg-green-600 px-3 py-1 text-white rounded-lg cursor-pointer hover:bg-green-700">
                    Update
                </button>

                {/* Seller Extra Detail */}
                {
                    role === "seller" && (
                        <div className="flex items-center gap-5 border-b pb-5 mb-5">
                            <img
                                src={user.image_url}
                                alt=""
                                className="w-20 h-20 rounded-full border-2 border-green-500 object-cover"
                            />

                            <div>
                                <p className="text-gray-500 text-sm">Shop Name</p>
                                <h2 className="text-xl font-semibold">{user.shopname}</h2>
                            </div>
                        </div>
                    )
                }

                <div className="flex flex-wrap gap-4">

                    <div className="w-[48%] bg-[#f8faf8] p-3 rounded-xl">
                        <p className="text-sm text-gray-500">Name</p>
                        <h2 className="font-semibold">{user.name}</h2>
                    </div>

                    <div className="w-[48%] bg-[#f8faf8] p-3 rounded-xl">
                        <p className="text-sm text-gray-500">Email</p>
                        <h2>{user.email}</h2>
                    </div>

                    <div className="w-[48%] bg-[#f8faf8] p-3 rounded-xl">
                        <p className="text-sm text-gray-500">Mobile</p>
                        <h2>{user.mobile}</h2>
                    </div>

                    <div className="w-[48%] bg-[#f8faf8] p-3 rounded-xl">
                        <p className="text-sm text-gray-500">City</p>
                        <h2>{user.city}</h2>
                    </div>

                    <div className="w-[48%] bg-[#f8faf8] p-3 rounded-xl">
                        <p className="text-sm text-gray-500">State</p>
                        <h2>{user.state}</h2>
                    </div>

                    <div className="w-[48%] bg-[#f8faf8] p-3 rounded-xl">
                        <p className="text-sm text-gray-500">Pincode</p>
                        <h2>{user.pincode}</h2>
                    </div>

                    <div className="w-full bg-[#f8faf8] p-3 rounded-xl">
                        <p className="text-sm text-gray-500">Address</p>
                        <h2>{user.address}</h2>
                    </div>

                </div>

            </div>
            {/* ================ Profile Update ============= */}
            <div
                className={`w-[40%] bg-white rounded-2xl shadow-xl p-5 absolute z-50 transition-all duration-300
    ${showUpdate
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-20 opacity-0"
                    }`}
            >
                <ImCross
                    onClick={() => setShowUpdate(false)}
                    className="absolute top-3 right-3 text-red-500 cursor-pointer hover:text-red-700"
                />

                <h1 className="text-2xl font-semibold text-green-700 mb-5">
                    Update Profile
                </h1>

                <form 
                onSubmit={updateprofile}
                className="flex flex-wrap gap-3">

                    <input
                        type="text"
                        name="name"
                        value={formdata.name}
                        onChange={handlechange}
                        placeholder="Full Name"
                        required
                        className="w-[48%] border border-gray-300 rounded-lg p-2 outline-none focus:border-green-600"
                    />

                    <input
                        type="email"
                        name="email"
                        value={formdata.email}
                        onChange={handlechange}
                        placeholder="example@gmail.com"
                        required
                        className="w-[48%] border border-gray-300 rounded-lg p-2 outline-none focus:border-green-600"
                    />

                    <input
                        type="number"
                        name="mobile"
                        value={formdata.mobile}
                        onChange={handlechange}
                        placeholder="+91 **********"
                        required
                        className="w-[48%] border border-gray-300 rounded-lg p-2 outline-none focus:border-green-600"
                    />

                    <input
                        type="text"
                        name="city"
                        value={formdata.city}
                        onChange={handlechange}
                        placeholder="City"
                        required
                        className="w-[48%] border border-gray-300 rounded-lg p-2 outline-none focus:border-green-600"
                    />

                    <input
                        type="text"
                        name="state"
                        value={formdata.state}
                        onChange={handlechange}
                        placeholder="State"
                        required
                        className="w-[48%] border border-gray-300 rounded-lg p-2 outline-none focus:border-green-600"
                    />

                    <input
                        type="text"
                        name="pincode"
                        value={formdata.pincode}
                        onChange={handlechange}
                        placeholder="Pincode"
                        required
                        className="w-[48%] border border-gray-300 rounded-lg p-2 outline-none focus:border-green-600"
                    />

                    <textarea
                        name="address"
                        value={formdata.address}
                        onChange={handlechange}
                        placeholder="Street Address..."
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg p-2 outline-none resize-none focus:border-green-600"
                    ></textarea>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        Update Profile
                    </button>

                </form>
            </div>

        </div>
    );
};

export default Profile;