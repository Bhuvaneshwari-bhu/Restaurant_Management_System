// import { useEffect, useState } from "react";
// import api from "../api/api";
// import { useNavigate } from "react-router-dom";

// export default function RestaurantDashboard() {
//   const navigate = useNavigate();

//   const [foods, setFoods] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [earnings, setEarnings] = useState({
//     totalOrders: 0,
//     totalEarnings: 0,
//   });

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "",
//   });

//   // ---------------- FETCH ----------------
//   const getFoods = async () => {
//     const res = await api.get("/restaurant/foods");
//     setFoods(res.data);
//   };

//   const getOrders = async () => {
//     const res = await api.get("/orders/restaurant");
//     setOrders(res.data);
//   };

//   const getEarnings = async () => {
//     const res = await api.get("/restaurant/earnings");
//     setEarnings(res.data);
//   };

//   useEffect(() => {
//     getFoods();
//     getOrders();
//     getEarnings();
//   }, []);

//   // ---------------- FOOD ACTIONS ----------------
//   const addFood = async () => {
//     await api.post("/products", form);
//     setForm({ name: "", price: "", category: "" });
//     getFoods();
//   };

//   const deleteFood = async (id) => {
//     await api.delete(`/products/${id}`);
//     getFoods();
//   };

//   // ---------------- ORDER STATUS ----------------
//   const updateStatus = async (id, status) => {
//     await api.put(`/orders/${id}/status`, { status });
//     getOrders();
//     getEarnings(); // 🔥 revenue auto update
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* ================= NAVBAR ================= */}
//       <div className="bg-black text-white px-8 py-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold">Restaurant Panel</h1>

//         <div className="flex gap-4">
//           <button onClick={() => navigate("/")} className="text-sm">
//             Home
//           </button>
//           <button onClick={() => navigate("/restaurant/orders")} className="text-sm">
//             Orders
//           </button>
//         </div>
//       </div>

//       {/* ================= STATS ================= */}
//       <div className="p-6 grid grid-cols-2 gap-4">
//         <div className="bg-white p-5 rounded-xl shadow">
//           <p className="text-gray-500">Total Orders</p>
//           <p className="text-3xl font-bold">{earnings.totalOrders}</p>
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow">
//           <p className="text-gray-500">Revenue</p>
//           <p className="text-3xl font-bold text-green-600">
//             ₹{earnings.totalEarnings}
//           </p>
//         </div>
//       </div>

//       {/* ================= FOODS ================= */}
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4">Your Menu</h2>

//         {/* ADD FOOD */}
//         <div className="flex gap-3 mb-6">
//           <input
//             placeholder="Food name"
//             className="p-2 border rounded"
//             value={form.name}
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//           />
//           <input
//             placeholder="Price"
//             className="p-2 border rounded"
//             value={form.price}
//             onChange={(e) =>
//               setForm({ ...form, price: e.target.value })
//             }
//           />
//           <input
//             placeholder="Category"
//             className="p-2 border rounded"
//             value={form.category}
//             onChange={(e) =>
//               setForm({ ...form, category: e.target.value })
//             }
//           />

//           <button
//             onClick={addFood}
//             className="bg-black text-white px-4 rounded"
//           >
//             Add
//           </button>
//         </div>

//         {/* FOOD CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {foods.map((food) => (
//             <div
//               key={food._id}
//               className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
//             >
//               <h3 className="font-bold text-lg">{food.name}</h3>
//               <p>₹{food.price}</p>
//               <p className="text-sm text-gray-500">
//                 {food.category}
//               </p>

//               <button
//                 onClick={() => deleteFood(food._id)}
//                 className="mt-3 text-red-500 text-sm"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ================= ORDERS ================= */}
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4">
//           Live Orders
//         </h2>

//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className={`p-4 rounded-xl border shadow bg-white
//                 ${
//                   order.status === "delivered"
//                     ? "border-green-500 shadow-green-200"
//                     : order.status === "preparing"
//                     ? "border-yellow-500"
//                     : order.status === "cancelled"
//                     ? "border-red-500"
//                     : "border-gray-200"
//                 }
//               `}
//             >
//               <p className="font-bold">
//                 Order #{order._id}
//               </p>

//               <p>Total: ₹{order.totalAmount}</p>

//               <p>
//                 Status:
//                 <span className="ml-2 font-semibold">
//                   {order.status}
//                 </span>
//               </p>

//               {/* STATUS BUTTONS */}
//               <div className="flex gap-2 mt-3 flex-wrap">

//                 <button
//                   onClick={() =>
//                     updateStatus(order._id, "preparing")
//                   }
//                   className="px-3 py-1 bg-yellow-500 text-white rounded"
//                 >
//                   Preparing
//                 </button>

//                 <button
//                   onClick={() =>
//                     updateStatus(order._id, "delivered")
//                   }
//                   className="px-3 py-1 bg-green-600 text-white rounded"
//                 >
//                   Delivered
//                 </button>

//                 <button
//                   onClick={() =>
//                     updateStatus(order._id, "cancelled")
//                   }
//                   className="px-3 py-1 bg-red-500 text-white rounded"
//                 >
//                   Cancel
//                 </button>

//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../api/api";

export default function RestaurantDashboard() {
  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [earnings, setEarnings] = useState({ totalOrders: 0, totalEarnings: 0 });
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: ""
  });

  // ================= LOAD DATA =================
  const loadData = async () => {
  try {
    setLoading(true);

    const [r, f, o, e] = await Promise.all([
      api.get("/restaurant-admin/my"),
      api.get("/restaurant-admin/foods"),
      api.get("/restaurant-admin/orders"),
      api.get("/restaurant-admin/earnings"),
    ]);

    setRestaurant(r.data || null);
    setFoods(f.data || []);
    setOrders(o.data || []);
    setEarnings(e.data || {
      totalOrders: 0,
      totalEarnings: 0
    });

  } catch (err) {
    console.log("LOAD ERROR:", err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadData();
  }, []);

  // ================= FOOD =================
  const addFood = async () => {
    try {
await api.post("/restaurant-admin/foods", form);
      setForm({
        name: "",
        price: "",
        category: "",
        image: "",
        description: ""
      });

      loadData();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const deleteFood = async (id) => {
    try {
await api.delete(`/restaurant-admin/foods/${id}`);      loadData();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ================= ORDER =================
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/restaurant-admin/orders/${id}/status`, { status });
      loadData();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}
      <div className="flex justify-between items-center px-10 py-4 bg-black text-white">
        <h1 className="text-xl font-bold">
          {restaurant?.name || "Restaurant Dashboard"}
        </h1>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="bg-white text-black px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="px-10 py-6 bg-white shadow">
        <div className="flex gap-10 text-gray-700">
          <p>🍽 Foods: {foods.length}</p>
          <p>📦 Orders: {orders.length}</p>
          <p>💰 Earnings: ₹{earnings.totalEarnings}</p>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="grid grid-cols-3 gap-6 p-10">

        {/* ================= FOODS ================= */}
        <div className="col-span-2 bg-white p-5 rounded shadow">

          <h2 className="text-xl font-bold mb-4">Your Foods</h2>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <input className="border p-2" placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input className="border p-2" placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input className="border p-2" placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <input className="border p-2" placeholder="Image"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>

          <textarea
            className="border p-2 w-full mb-3"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <button
            onClick={addFood}
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Add Food
          </button>

          {/* FOOD LIST */}
          <div className="grid grid-cols-2 gap-3 mt-5 max-h-[400px] overflow-y-auto">

            {foods.length === 0 ? (
              <p className="text-gray-500">No foods found</p>
            ) : (
              foods.map((food) => (
                <div key={food._id} className="border p-3 rounded bg-gray-50">
                  <h3 className="font-bold">{food.name}</h3>
                  <p>₹{food.price}</p>
                  <p className="text-sm text-gray-500">{food.category}</p>

                  <button
                    onClick={() => deleteFood(food._id)}
                    className="mt-2 bg-red-500 text-white px-2 py-1 text-sm rounded"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= ORDERS ================= */}
        <div className="bg-white p-5 rounded shadow max-h-[650px] overflow-y-auto">

          <h2 className="text-xl font-bold mb-4">Live Orders</h2>

          {orders.length === 0 ? (
            <p className="text-gray-500">No orders yet</p>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="p-3 mb-3 rounded border"
              >
                <p className="font-bold">Order #{order._id.slice(-5)}</p>
                <p>₹{order.totalAmount}</p>
                <p>Status: {order.status}</p>

                <div className="flex gap-1 mt-2">
                  <button onClick={() => updateStatus(order._id, "preparing")}
                    className="px-2 py-1 bg-yellow-500 text-white text-xs rounded">
                    Prep
                  </button>

                  <button onClick={() => updateStatus(order._id, "delivered")}
                    className="px-2 py-1 bg-green-600 text-white text-xs rounded">
                    Done
                  </button>

                  <button onClick={() => updateStatus(order._id, "cancelled")}
                    className="px-2 py-1 bg-red-500 text-white text-xs rounded">
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}