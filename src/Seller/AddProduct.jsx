import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Slide, toast } from "react-toastify";
import { ImCross } from "react-icons/im";

const AddProduct = () => {
    const { token } = useContext(AuthContext)
    const [product, setProduct] = useState({
        productname: "",
        detail: "",
        category: "",
        brand: "",
        price: "",
        discount: "",
        unit: "",
        isAvailable: true,
        file: null,
    });
    const [file, setFile] = useState(null)

    const apibase = "https://grocery-kirana-store.onrender.com"
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error('Please select image', {
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

        try {
            const formData = new FormData();

            formData.append("productname", product.productname);
            formData.append("detail", product.detail);
            formData.append("category", product.category);
            formData.append("brand", product.brand);
            formData.append("price", product.price);
            formData.append("discount", product.discount);
            formData.append("unit", product.unit);
            formData.append("isAvailable", product.isAvailable);
            formData.append("file", file);

            const res = await axios.put(`${apibase}/sellers/addproduct`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                }
            )

            console.log(res.data);
            toast.success('Product Added Successfully ✅', {
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

            setProduct({
                productname: "",
                detail: "",
                category: "",
                brand: "",
                price: "",
                discount: "",
                unit: "",
                isAvailable: true,
                file: null,
            });
            setFile(null)
            e.target.reset()
        } catch (err) {
            console.log("Status:", err.response?.status);
            console.log("Error:", err.response?.data);
        }
    };

    // =============== Add Coupon ============
    const [isCoupon, setIsCoupon] = useState(false)
    const [coupon, setCoupon] = useState({
        code: "",
        type_discount: "",
        discount: "",
        minimum_value: "",
        expiry_time: "",
        is_Active: true,
    });
    const handleCouponChange = (e) => {
        const { name, value, type, checked } = e.target;

        setCoupon((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    const add_coupon = async (e) => {
        e.preventDefault();

        try {
            const data = {
                code: coupon.code.trim(),
                type_discount: coupon.type_discount,
                discount: Number(coupon.discount),
                minimum_value: Number(coupon.minimum_value),
                expiry_time: new Date(coupon.expiry_time).toISOString(),
                is_Active: coupon.is_Active,
                created_at: new Date().toISOString(),
            };

            console.log(data);

            const response = await axios.post(
                `${apibase}/sellers/addcoupon`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response.data);

            toast.success("Coupon Created Successfully ✅");

            setCoupon({
                code: "",
                type_discount: "",
                discount: "",
                minimum_value: "",
                expiry_time: "",
                is_Active: true,
            });

            setIsCoupon(false);
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#f5f7fa] flex justify-center p-6">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-8 relative ">
                {/* --- Coupon Add Button ---- */}
                <button
                    onClick={() => setIsCoupon(true)}
                    className=" bg-[#30d208] rounded px-1.5 text-white font-semibold cursor-pointer absolute right-5 " >Add Coupon</button>
                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Add New Product
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Fill in the details below to add a new product to your store.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col lg:flex-row gap-8"
                >

                    {/* Left Section */}
                    <div className="flex-1 flex flex-col gap-5">

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Product Name
                            </label>

                            <input
                                type="text"
                                name="productname"
                                placeholder="Fresh Basmati Rice"
                                value={product.productname}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3 outline-none focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Description
                            </label>

                            <textarea
                                rows="5"
                                name="detail"
                                placeholder="Write product description..."
                                value={product.detail}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3 outline-none focus:border-green-500 resize-none"
                            />
                        </div>

                        <div className="flex gap-4 flex-wrap">

                            <div className="flex-1 min-w-[180px]">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Category
                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Vegetables"
                                    value={product.category}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 outline-none focus:border-green-500"
                                />
                            </div>

                            <div className="flex-1 min-w-[180px]">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Brand
                                </label>

                                <input
                                    type="text"
                                    name="brand"
                                    placeholder="Fresh Farm"
                                    value={product.brand}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 outline-none focus:border-green-500"
                                />
                            </div>

                        </div>

                        <div className="flex gap-4 flex-wrap">

                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    placeholder="₹500"
                                    value={product.price}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 outline-none focus:border-green-500"
                                />
                            </div>

                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Discount %
                                </label>

                                <input
                                    type="number"
                                    name="discount"
                                    placeholder="10"
                                    value={product.discount}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 outline-none focus:border-green-500"
                                />
                            </div>

                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-gray-700 font-medium mb-2">
                                    Unit
                                </label>

                                <input
                                    type="text"
                                    name="unit"
                                    placeholder="1 Kg"
                                    value={product.unit}
                                    onChange={handleChange}
                                    className="w-full border rounded-xl p-3 outline-none focus:border-green-500"
                                />
                            </div>

                        </div>

                    </div>

                    {/* Right Section */}
                    <div className="w-full lg:w-[320px] flex flex-col gap-5">

                        <div className="border-2 border-dashed border-green-400 rounded-2xl p-5 flex flex-col items-center">

                            <div className="w-40 h-40 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">

                                {file ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-5xl">📦</span>
                                )}

                            </div>

                            <p className="text-gray-500 mt-4 mb-3">
                                Upload Product Image
                            </p>

                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full border rounded-lg p-2 text-sm"
                            />

                        </div>

                        <div className="bg-gray-50 rounded-2xl p-5">

                            <h2 className="font-semibold text-lg mb-4">
                                Availability
                            </h2>

                            <label className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    name="isAvailable"
                                    checked={product.isAvailable}
                                    onChange={handleChange}
                                    className="w-5 h-5 accent-green-600"
                                />

                                <span className="text-gray-700">
                                    Product Available
                                </span>

                            </label>

                        </div>

                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl duration-300"
                        >
                            + Add Product
                        </button>

                    </div>

                </form>

                {/* ============== Coupon Form ============== */}

                <div
                    className={`fixed inset-0 z-50 flex justify-center items-center bg-black/40 transition-all duration-300 ${isCoupon ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                >
                    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-8 relative max-h-[90vh] overflow-y-auto">

                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={() => setIsCoupon(false)}
                            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-red-100 hover:bg-red-500 hover:text-white flex justify-center items-center duration-300"
                        >
                            <ImCross size={14} />
                        </button>

                        {/* Heading */}
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-800">
                                Create Coupon
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Create discount coupons for your customers.
                            </p>
                        </div>

                        <form onSubmit={add_coupon} className="flex flex-col gap-5">

                            <input
                                type="text"
                                name="code"
                                value={coupon.code}
                                onChange={handleCouponChange}
                                placeholder="Coupon Code (SAVE20)"
                                className="border rounded-xl p-3"
                                required
                            />

                            <select
                                name="type_discount"
                                value={coupon.type_discount}
                                onChange={handleCouponChange}
                                className="border rounded-xl p-3"
                                required
                            >
                                <option value="">Select Discount Type</option>
                                <option value="percentage">Percentage</option>
                                <option value="flat">Flat Amount</option>
                            </select>

                            <input
                                type="number"
                                name="discount"
                                value={coupon.discount}
                                onChange={handleCouponChange}
                                placeholder="Discount"
                                min={1}
                                className="border rounded-xl p-3"
                                required
                            />

                            <input
                                type="number"
                                name="minimum_value"
                                value={coupon.minimum_value}
                                onChange={handleCouponChange}
                                placeholder="Minimum Order Value"
                                min={1}
                                className="border rounded-xl p-3"
                                required
                            />

                            <input
                                type="datetime-local"
                                name="expiry_time"
                                value={coupon.expiry_time}
                                onChange={handleCouponChange}
                                className="border rounded-xl p-3"
                                required
                            />

                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="is_Active"
                                    checked={coupon.is_Active}
                                    onChange={handleCouponChange}
                                    className="accent-green-600"
                                />
                                Active Coupon
                            </label>

                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                            >
                                Create Coupon
                            </button>

                        </form>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default AddProduct;