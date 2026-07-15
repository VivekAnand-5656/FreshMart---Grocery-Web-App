import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

// Images
import rice from "../assets/rice.png";
import dairy from "../assets/dairy.png";
import snack from "../assets/snack.png";
import fruits from "../assets/fruits.png";
import bevarage from "../assets/bevarage.png";
import household from "../assets/household.png";
import spices from "../assets/spices.png";

import { Slide, toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

const Products = () => {
  const { token } = useContext(AuthContext);

  const apibase = "https://grocery-kirana-store.onrender.com";

  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apibase}/allproducts`);
      setAllProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= Filter =================

  const fetch_filter = async (search) => {
    try {
      setAllProducts([]);
      const response = await axios.get(`${apibase}/filter/${search}`);
      setAllProducts(response.data);
    } catch (error) {
      console.log(error);
      fetchProducts();
    }
  };

  // ================= Add Cart =================

  const add_to_cart = async (productid) => {
    try {
      await axios.put(
        `${apibase}/customer/addtocart/${productid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Cart Added", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
        transition: Slide,
      });
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.detail);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    { name: "Rice", icon: rice },
    { name: "Dairy", icon: dairy },
    { name: "Snacks", icon: snack },
    { name: "Fruits", icon: fruits },
    { name: "Beverages", icon: bevarage },
    { name: "Household", icon: household },
    { name: "Spices", icon: spices },
  ];

  return (
    <div className="w-full min-h-screen bg-[#d2fcc7] flex flex-col lg:flex-row gap-3 lg:gap-5 p-2 sm:p-4 lg:p-5">

      {/* ================= Sidebar ================= */}

      <div className="w-full lg:w-[20%] bg-white rounded-xl lg:rounded-2xl shadow-md p-3">

        <h1 className="hidden lg:block text-2xl font-bold mb-5">
          Categories
        </h1>

        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide">

          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => fetch_filter(item.name)}
              className="flex-shrink-0 lg:w-full w-24 lg:h-auto h-20 border rounded-xl bg-[#eafde5] hover:bg-[#d8f8cd] transition cursor-pointer flex lg:flex-row flex-col items-center justify-center gap-2 p-2"
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-9 h-9 lg:w-10 lg:h-10 object-contain"
              />

              <p className="text-[11px] sm:text-xs lg:text-base font-medium text-center">
                {item.name}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* ================= Products ================= */}

      <div className="flex-1 bg-white rounded-xl lg:rounded-2xl shadow-md p-3 sm:p-4 lg:p-5">

        <div className="flex justify-between items-center mb-5">

          <h1 className="text-xl sm:text-2xl font-bold">
            Products
          </h1>

          <p className="text-sm sm:text-base text-gray-500">
            {allProducts.length} Products
          </p>

        </div>

        <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 lg:gap-5">

          {allProducts.length === 0 ? (
            <p className="text-lg font-semibold">
              Product not available
            </p>
          ) : (
            allProducts.map((product, index) => (
              <div
                key={index}
                className="w-[46%] sm:w-[31%] md:w-[30%] lg:w-52 bg-white rounded-xl shadow border hover:shadow-lg overflow-hidden transition flex flex-col"
              >
                <div className="h-32 sm:h-36 bg-gray-100 flex justify-center items-center">

                  <img
                    src={product.image_url}
                    alt={product.productname}
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain"
                  />

                </div>

                <div className="p-3 flex flex-col flex-1">

                  <h2 className="font-semibold text-xs sm:text-sm line-clamp-2 min-h-[38px]">
                    {product.productname}
                  </h2>

                  <p className="text-[11px] sm:text-sm text-gray-500 mt-1">
                    {product.brand} • {product.unit}
                  </p>

                  <div className="mt-auto pt-4 flex justify-between items-center">

                    <p className="font-bold text-green-600 text-sm sm:text-base">
                      ₹{product.discount_price}
                    </p>

                    <button
                      onClick={() => add_to_cart(product._id)}
                      className="bg-[#16be06] hover:bg-green-700 transition text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg"
                    >
                      Add
                    </button>

                  </div>

                </div>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
};

export default Products;