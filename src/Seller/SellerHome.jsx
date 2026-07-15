import React, { useState } from "react";
import { FaFirstOrder, FaHome } from "react-icons/fa";
import { MdAddBox, MdOutlineProductionQuantityLimits } from "react-icons/md";

import AddProduct from "./AddProduct";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import MyProducts from "./MyProducts";

const SellerHome = () => {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard />;

      case "orders":
        return <Orders />;

      case "products":
        return <MyProducts />;

      case "addproduct":
        return <AddProduct />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 p-2 sm:p-3 flex flex-col lg:flex-row gap-2">

      {/* ================= Sidebar ================= */}

      <div className="w-full lg:w-[18%] bg-white rounded-xl shadow-md p-2">

        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide">

          <button
            onClick={() => setPage("dashboard")}
            className={`flex-shrink-0 flex items-center justify-center lg:justify-start gap-2 px-4 py-3 rounded-lg transition ${
              page === "dashboard"
                ? "bg-[#bdf5ac] text-green-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <FaHome />
            <span className="text-sm">Home</span>
          </button>

          <button
            onClick={() => setPage("orders")}
            className={`flex-shrink-0 flex items-center justify-center lg:justify-start gap-2 px-4 py-3 rounded-lg transition ${
              page === "orders"
                ? "bg-[#bdf5ac] text-green-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <FaFirstOrder />
            <span className="text-sm">Orders</span>
          </button>

          <button
            onClick={() => setPage("products")}
            className={`flex-shrink-0 flex items-center justify-center lg:justify-start gap-2 px-4 py-3 rounded-lg transition ${
              page === "products"
                ? "bg-[#bdf5ac] text-green-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <MdOutlineProductionQuantityLimits />
            <span className="text-sm">Products</span>
          </button>

          <button
            onClick={() => setPage("addproduct")}
            className={`flex-shrink-0 flex items-center justify-center lg:justify-start gap-2 px-4 py-3 rounded-lg transition ${
              page === "addproduct"
                ? "bg-[#bdf5ac] text-green-700 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            <MdAddBox />
            <span className="text-sm whitespace-nowrap">
              Add Product
            </span>
          </button>

        </div>
      </div>

      {/* ================= Main Content ================= */}

      <div className="flex-1 bg-white rounded-xl shadow-md p-2 overflow-y-auto">
        {renderPage()}
      </div>

    </div>
  );
};

export default SellerHome;