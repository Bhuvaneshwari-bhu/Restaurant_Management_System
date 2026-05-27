import { useEffect, useState } from "react";
import api from "../api/api";

export default function RestaurantOrders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await api.get("/orders/restaurant");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      getOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Restaurant Orders
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-5 rounded-xl shadow">
            <p className="font-bold">Order #{order._id}</p>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Status: {order.status}</p>

            <div className="flex gap-2 mt-3">
              <button onClick={() => updateStatus(order._id, "preparing")}
                className="px-3 py-1 bg-yellow-500 text-white rounded">
                Preparing
              </button>

              <button onClick={() => updateStatus(order._id, "delivered")}
                className="px-3 py-1 bg-green-600 text-white rounded">
                Delivered
              </button>

              <button onClick={() => updateStatus(order._id, "cancelled")}
                className="px-3 py-1 bg-red-500 text-white rounded">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}