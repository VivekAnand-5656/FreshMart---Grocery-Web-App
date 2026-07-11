import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import ric from '../assets/rice.png'

const Orders = () => {
  const { token } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);

  const apibase = "https://grocery-kirana-store.onrender.com";

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${apibase}/customer/myorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="scrolling max-w-2xl h-[90vh] overflow-auto rounded-2xl mx-auto p-6 bg-[#aafaa8] ">

      <h1 className="text-2xl font-bold mb-6">
        My Orders
      </h1>

      <div className=" w-full  flex flex-col  " >
        {orders.length === 0 ? (
          <p>No Orders Found</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="w-full  bg-white shadow-md rounded-xl p-2 mb-2"
            >

              {/* Items */}
              {order.items.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between items-center border-b p-2"
                >
                  <img src={ric} alt="" className=" w-20 h-20 " />
                  <div className=" flex gap-2 " >
                    <h2 className="font-semibold text-[0.8rem] line-clamp-1 ">
                      {item.productname}
                    </h2>

                    <p className="text-gray-500">
                      Quantity : {item.quantity}
                    </p>

                    <p className="text-green-600 font-semibold">
                      ₹{item.discount_price}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm text-white ${item.status === "Delivered"
                        ? "bg-green-500"
                        : item.status === "Cancelled"
                        ? "bg-[#f81b1b]"
                        : "bg-yellow-500"
                      }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}

              {/* Total */}
              <div className="flex justify-between items-center mt-4">
                <h2 className="font-semibold text-lg">
                  Total Amount
                </h2>

                <h2 className="text-2xl font-bold text-green-600">
                  ₹{order.totalAmount}
                </h2>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;