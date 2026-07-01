import React, { useContext, useEffect, useState } from "react";
import {
    FaFirstOrder,
    FaHome,
} from "react-icons/fa";
import { MdAddBox, MdOutlineProductionQuantityLimits } from "react-icons/md";
import AddProduct from "./AddProduct";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import MyProducts from "./MyProducts";
import axios from "axios"; 

const SellerHome = () => { 

    const apibase = "https://grocery-kirana-store.onrender.com";

    

    // =========== Render Pages ===========
    const [page, setPage] = useState("dashboard");

    const renderPage = () => {
        switch (page) {
            case "dashboard":
                return <Dashboard />;

            case "orders":
                return <Orders />;

            case "addproduct":
                return <AddProduct />;

            case "products":
                return <MyProducts />;

            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="h-screen bg-slate-100 p-2 flex justify-between items-center gap-2">

            {/* =========== SideBar ============= */}

            <div className="w-[15%] h-full bg-white flex flex-col gap-2 p-2">

                <button
                    onClick={() => setPage("dashboard")}
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-all ${page === "dashboard"
                        ? "bg-[#bdf5ac] text-green-700 font-semibold"
                        : "hover:bg-gray-100"
                        }`}
                >
                    <FaHome />
                    Home
                </button>

                <button
                    onClick={() => setPage("orders")}
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-all ${page === "orders"
                        ? "bg-[#bdf5ac] text-green-700 font-semibold"
                        : "hover:bg-gray-100"
                        }`}
                >
                    <FaFirstOrder />
                    Orders
                </button>

                <button
                    onClick={() => setPage("products")}
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-all ${page === "products"
                        ? "bg-[#bdf5ac] text-green-700 font-semibold"
                        : "hover:bg-gray-100"
                        }`}
                >
                    <MdOutlineProductionQuantityLimits />
                    Products
                </button>

                <button
                    onClick={() => setPage("addproduct")}
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-all ${page === "addproduct"
                        ? "bg-[#bdf5ac] text-green-700 font-semibold"
                        : "hover:bg-gray-100"
                        }`}
                >
                    <MdAddBox />
                    Add Product
                </button>

            </div>

            {/* =========== Right Side Main ======== */}

            <div className="w-[85%] h-full overflow-scroll">
                {renderPage()}
            </div>

        </div>
    );
};

export default SellerHome;