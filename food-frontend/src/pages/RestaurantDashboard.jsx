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

<div className="p-8 space-y-10">

{/* ================= FOODS SECTION ================= */}

  <div className="bg-white rounded-2xl shadow p-6">

<div className="flex items-center justify-between mb-6">
  <div>
    <h2 className="text-2xl font-bold text-gray-800">
      Your Foods
    </h2>

    <p className="text-gray-500 text-sm">
      Manage your restaurant menu
    </p>
  </div>

  <button
    onClick={() => {
      const form = document.getElementById("foodForm");
      form.classList.toggle("hidden");
    }}
    className="bg-black text-white px-4 py-2 rounded-lg"
  >
    + New Item
  </button>
</div>

{/* ================= ADD FOOD FORM ================= */}
<div id="foodForm" className="hidden mb-8">

  <div className="grid md:grid-cols-2 gap-3 mb-3">

    <input
      className="border p-3 rounded-lg"
      placeholder="Food Name"
      value={form.name}
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
    />

    <input
      className="border p-3 rounded-lg"
      placeholder="Price"
      value={form.price}
      onChange={(e) =>
        setForm({ ...form, price: e.target.value })
      }
    />

    <input
      className="border p-3 rounded-lg"
      placeholder="Category"
      value={form.category}
      onChange={(e) =>
        setForm({ ...form, category: e.target.value })
      }
    />

    <input
      className="border p-3 rounded-lg"
      placeholder="Image URL"
      value={form.image}
      onChange={(e) =>
        setForm({ ...form, image: e.target.value })
      }
    />
  </div>

  <textarea
    className="border p-3 rounded-lg w-full mb-3"
    placeholder="Description"
    value={form.description}
    onChange={(e) =>
      setForm({ ...form, description: e.target.value })
    }
  />

  <button
    onClick={addFood}
    className="bg-green-600 text-white px-5 py-2 rounded-lg"
  >
    Save Food
  </button>
</div>

{/* ================= HORIZONTAL FOOD SCROLL ================= */}
<div className="flex gap-5 overflow-x-auto pb-3">

  {foods.length === 0 ? (
    <p className="text-gray-500">No foods added yet</p>
  ) : (
    foods.map((food) => (
      <div
        key={food._id}
        className="min-w-[260px] bg-gray-50 rounded-2xl overflow-hidden border shadow-sm"
      >

        <img
          src={food.image}
          alt={food.name}
          className="h-40 w-full object-cover"
        />

        <div className="p-4">

          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg">
              {food.name}
            </h3>

            <span className="font-bold text-green-600">
              ₹{food.price}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            {food.category}
          </p>

          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {food.description}
          </p>

          <button
            onClick={() => deleteFood(food._id)}
            className="mt-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ))
  )}
</div>
```

  </div>

{/* ================= ORDERS SECTION ================= */}

  <div className="bg-white rounded-2xl shadow p-6">

```
<div className="mb-6">
  <h2 className="text-2xl font-bold text-gray-800">
    Live Orders
  </h2>

  <p className="text-gray-500 text-sm">
    Track and manage customer orders
  </p>
</div>

{orders.length === 0 ? (
  <p className="text-gray-500">No orders yet</p>
) : (
  <div className="space-y-4">

    {orders.map((order) => (
      <div
        key={order._id}
        className="border rounded-xl p-4 flex items-center justify-between"
      >

        <div>
          <p className="font-bold">
            Order #{order._id.slice(-5)}
          </p>

          <p className="text-sm text-gray-500">
            Total: ₹{order.totalAmount}
          </p>

          <p className="mt-1">
            Status:
            <span className="ml-2 font-semibold capitalize">
              {order.status}
            </span>
          </p>
        </div>

        <div className="flex gap-2">

          <button
            onClick={() =>
              updateStatus(order._id, "preparing")
            }
            className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
          >
            Preparing
          </button>

          <button
            onClick={() =>
              updateStatus(order._id, "delivered")
            }
            className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
          >
            Delivered
          </button>

          <button
            onClick={() =>
              updateStatus(order._id, "cancelled")
            }
            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
          >
            Cancel
          </button>

        </div>
      </div>
    ))}
  </div>
)}


  </div>
</div>

      
    </div>
  );
}