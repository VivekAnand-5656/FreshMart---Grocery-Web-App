import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Slide, toast } from "react-toastify";

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

    return (
        <div className="max-w-3xl mx-auto p-5">
            <h1 className="text-3xl font-bold mb-5">Add Product</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="productName"
                    placeholder="Product Name"
                    value={product.productname}
                    onChange={handleChange}
                    className="border w-full p-2"
                />

                <textarea
                    name="detail"
                    placeholder="Product Detail"
                    value={product.detail}
                    onChange={handleChange}
                    className="border w-full p-2"
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                    className="border w-full p-2"
                />

                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={product.brand}
                    onChange={handleChange}
                    className="border w-full p-2"
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    className="border w-full p-2"
                />

                <input
                    type="number"
                    name="discount"
                    placeholder="Discount"
                    value={product.discount}
                    onChange={handleChange}
                    className="border w-full p-2"
                />

                <input
                    type="text"
                    name="unit"
                    placeholder="Unit"
                    value={product.unit}
                    onChange={handleChange}
                    className="border w-full p-2"
                />

                <label>
                    Available
                    <input
                        type="checkbox"
                        name="isAvailable"
                        checked={product.isAvailable}
                        onChange={handleChange}
                        className="ml-2"
                    />
                </label>

                <input
                    type="file"
                    name="file"
                    accept=".jpg, .png, .jpeg"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="border w-full p-2"
                />

                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded"
                >
                    Add Product
                </button>

            </form>
        </div>
    );
};

export default AddProduct;