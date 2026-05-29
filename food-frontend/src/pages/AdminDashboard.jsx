import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        🛠️ Admin Dashboard
      </h1>

      {!stats ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Total Users</h2>
            <p className="text-2xl font-bold">{stats.users}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Total Orders</h2>
            <p className="text-2xl font-bold">{stats.orders}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Revenue</h2>
            <p className="text-2xl font-bold">
              ₹{stats.revenue}
            </p>
          </div>

        </div>
      )}
    </div>
  );
}