import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, restaurantRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/restaurants"),
      ]);

      setStats(statsRes.data);
      setRestaurants(restaurantRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRestaurant = async (id) => {
    if (!window.confirm("Delete restaurant?")) return;

    try {
      await api.delete(`/admin/restaurants/${id}`);
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  if (!stats) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-black text-white px-8 py-4 flex justify-between">
        <h1 className="text-2xl font-bold">
          Admin Dashboard
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

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 p-6">

        <div className="bg-white p-4 rounded shadow">
          <h3>Users</h3>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3>Restaurants</h3>
          <p className="text-2xl font-bold">{stats.restaurants}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3>Products</h3>
          <p className="text-2xl font-bold">{stats.products}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3>Orders</h3>
          <p className="text-2xl font-bold">{stats.orders}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3>Revenue</h3>
          <p className="text-2xl font-bold">
            ₹{stats.totalRevenue}
          </p>
        </div>

      </div>

      {/* Restaurants */}
      <div className="p-6">

        <h2 className="text-2xl font-bold mb-4">
          Restaurants
        </h2>

        <div className="space-y-4">

          {restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="bg-white p-5 rounded shadow flex justify-between"
            >
              <div>
                <h3 className="font-bold text-lg">
                  {restaurant.name}
                </h3>

                <p>{restaurant.address}</p>

                <p className="text-sm text-gray-500">
                  Owner: {restaurant.owner?.email}
                </p>
              </div>

              <div className="flex gap-2">

                <button
                  onClick={() =>
                    navigate(
                      `/admin/restaurants/${restaurant._id}`
                    )
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Open
                </button>

                <button
                  onClick={() =>
                    deleteRestaurant(restaurant._id)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}