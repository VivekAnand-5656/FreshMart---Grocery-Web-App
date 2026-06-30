import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

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
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-xl p-5 mb-5"
          >
            {/* Order Status */}
            <div className="flex justify-end mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm text-white ${
                  order.status === "Delivered"
                    ? "bg-green-600"
                    : order.status === "Pending"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Items */}
            {order.items.map((item) => (
              <div
                key={item.product_id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <h2 className="font-semibold text-lg">
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
                  className={`px-3 py-1 rounded-full text-sm text-white ${
                    item.status === "Delivered"
                      ? "bg-green-500"
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
  );
};

export default Orders;