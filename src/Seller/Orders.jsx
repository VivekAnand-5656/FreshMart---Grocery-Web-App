import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import { FaFilter } from "react-icons/fa";


const Orders = () => {
  const { token } = useContext(AuthContext)
  const [allOrders, setAllOrders] = useState([])
  const apibase = "https://grocery-kirana-store.onrender.com"

  // ========== Order Fetch ========
  const fetch_orders = async () => {
    try {
      const response = await axios.get(
        `${apibase}/sellers/myorders`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ) 
      setAllOrders(response.data)
    } catch (error) {
      console.log(`Error:- ${error}`)
    }
  }

  // ============= Filter By Order Status ==============
  const [status, setStatus] = useState("Pending")
  const filter_by_order = async (txt) => {
    try {
      // setAllOrders([])
      const response = await axios.get(`${apibase}/sellers/orderbystatus/${txt}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )  
      setAllOrders(response.data)
    } catch (error) {
      console.log(`Error:- ${error}`)
      fetch_orders()

    }
  }

  // ============ Update Order Status ===========
  const [updateStatus, setUpdateStatus] = useState({});

  const update_order_status = async (orderId, status) => {
    try {
      const response = await axios.put(
        `${apibase}/sellers/statusupdate/${orderId}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 

      setUpdateStatus((prev) => ({
        ...prev,
        [orderId]: status,
      }));

      fetch_orders();
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  useEffect(() => {
    if (token) {
      fetch_orders()
    }
  }, [token])

  return (
    <>
      <div className="w-full h-full bg-[#d6ffce] p-3 sm:p-4">

        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-2 mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1b7d05]">
            My Orders
          </h1>

          {/* ----------- DropDown -------- */}
          <div className="flex justify-center items-center gap-2">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value)
                filter_by_order(e.target.value)
              }}
              className="cursor-pointer border-none bg-[#2c9b03] outline-0 text-white font-bold rounded p-1.5 text-sm sm:text-base" >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="w-full h-[85%] sm:h-[90%] overflow-y-scroll scrolling">

          {
            allOrders.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-base sm:text-lg font-semibold text-gray-500">
                  No Orders Found
                </p>
              </div>
            ) : (

              <div className="flex flex-col gap-5">

                {
                  allOrders.map((order, index) => (

                    <div
                      key={index}
                      className="bg-white rounded-xl shadow p-3 sm:p-4"
                    >

                      {/* Order Header */}

                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4 border-b pb-2">
                        <h2 className="font-bold text-green-700 text-sm sm:text-base">
                          Order #{index + 1}
                        </h2>

                        <div className="flex justify-between sm:justify-center items-center gap-2">
                          <select
                            value={updateStatus[order._id] || order.items[0]?.status}
                            onChange={(e) => {
                              update_order_status(order._id, e.target.value);
                            }}
                            className="text-[0.7rem] cursor-pointer border-none bg-[#031c9b] outline-none text-white font-bold rounded px-2 py-1"
                          >
                            <option value="Pending">Pending</option>
                            {/* <option value="Accepted">Accepted</option> */}
                            {/* <option value="Packed">Packed</option> */}
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <p className="font-semibold text-green-700 text-sm sm:text-base">
                            ₹ {order.totalAmount}
                          </p>
                        </div>
                      </div>

                      {/* Products */}

                      <div className="flex flex-wrap gap-4">

                        {
                          order.items.map((product, index) => (

                            <div
                              key={index}
                              className="w-full xs:w-[47%] sm:w-52 border cursor-pointer rounded-lg p-3 flex flex-col gap-2 bg-[#f8fff4] transition-all duration-500 hover:-translate-y-2"
                            >

                              <div className="flex justify-center">

                                <img
                                  src=""
                                  alt="order"
                                  className="w-24 h-24 object-contain"
                                />

                              </div>

                              <h3 className="font-semibold text-green-700 line-clamp-1 text-sm sm:text-base">
                                {product.productname}
                              </h3>

                              <div className="flex justify-between text-sm">

                                <span>
                                  Qty : {product.quantity}
                                </span>

                                <span className="font-semibold">
                                  ₹ {product.discount_price}
                                </span>

                              </div>

                              <p
                                className={`text-white text-center rounded py-1 text-sm ${product.status === "Pending"
                                    ? "bg-yellow-400"
                                    : product.status === "Accepted"
                                      ? "bg-blue-500"
                                      : product.status === "Packed"
                                        ? "bg-purple-500"
                                        : product.status === "Shipped"
                                          ? "bg-indigo-500"
                                          : product.status === "Delivered"
                                            ? "bg-green-600"
                                            : product.status === "Cancelled"
                                              ? "bg-red-500"
                                              : "bg-gray-500"
                                  }`}
                              >
                                {product.status}
                              </p>

                            </div>

                          ))
                        }

                      </div>

                    </div>

                  ))
                }

              </div>

            )
          }

        </div>

      </div>
    </>
  )
}

export default Orders