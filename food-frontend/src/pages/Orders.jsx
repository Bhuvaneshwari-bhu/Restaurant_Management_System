import { useEffect, useState } from "react";
import api from "../api/api";

import { io } from "socket.io-client";
// const socket = io("http://localhost:3000");

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await api.get("/orders/my");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  getOrders();

  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));

    const userId = decoded.id || decoded._id;

    if (!userId) return;

    socket.emit("join_room", userId);

    socket.on("order_updated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) =>
          o._id === updatedOrder._id
            ? { ...o, status: updatedOrder.status }
            : o
        )
      );
    });

  } catch (err) {
    console.log("Socket auth error:", err);
  }

  return () => {
    socket.off("order_updated");
  };

}, []);

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-10">
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.length === 0 && (
  <div className="text-center py-20">
    <h2 className="text-3xl font-bold text-gray-700">
      No orders yet 
    </h2>
    <p className="text-gray-500 mt-2">
      You haven’t placed any orders.
    </p>
  </div>
)}
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-6 rounded-2xl shadow">
            
            <h2 className="text-xl font-bold">
              Order ID: {order._id}
            </h2>

            <p className="text-gray-600 mt-1">
              Status: {order.status}
            </p>

            <p className="mt-2 font-semibold">
              Total: ₹{order.totalAmount}
            </p>

            <div className="mt-4">
              {order.items.map((item, i) => (
                <p key={i} className="text-gray-700">
                  {item.product?.name} × {item.quantity}
                </p>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}