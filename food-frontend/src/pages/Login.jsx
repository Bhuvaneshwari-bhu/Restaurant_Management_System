import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    await api.post("/auth/login", form);

    // small delay so cookie gets stored
    await new Promise((r) => setTimeout(r, 200));

    const res = await api.get("/auth/me");

    const role = res.data.role;

    console.log("ROLE:", role);

    if (role === "admin") {
      navigate("/admin/dashboard");

    } else if (role === "restaurant_admin") {
      navigate("/restaurant/dashboard");

    } else {
      navigate("/");
    }

  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};
  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded-xl w-80">

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <button className="w-full bg-black text-white py-2">
          Login
        </button>

      </form>
    </div>
  );
}