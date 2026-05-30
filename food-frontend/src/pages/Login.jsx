// import { useState } from "react";
// import api from "../api/api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {

//     await api.post("/auth/login", form);

//     // small delay so cookie gets stored
//     await new Promise((r) => setTimeout(r, 200));

//     const res = await api.get("/auth/me");

//     const role = res.data.role;

//     console.log("ROLE:", role);

//     if (role === "admin") {
//       navigate("/admin/dashboard");

//     } else if (role === "restaurant_admin") {
//       navigate("/restaurant/dashboard");

//     } else {
//       navigate("/");
//     }

//   } catch (err) {
//     console.log(err.response?.data || err.message);
//   }
// };
//   return (
//     <div className="h-screen flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded-xl w-80">

//         <input
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full border p-2 mb-3"
//         />

//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full border p-2 mb-3"
//         />

//         <button className="w-full bg-black text-white py-2">
//           Login
//         </button>

//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/login", form);

      await new Promise((r) => setTimeout(r, 200));

      const res = await api.get("/auth/me");

      const role = res.data.role;

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black">
            FLavor
          </h1>
          <p className="text-gray-500 mt-2">
            Welcome back 👋
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl p-8"
        >
          <h2 className="text-2xl font-bold mb-1">
            Login
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Enter your credentials to continue
          </p>

          <div className="space-y-4">

            <div>
              <label className="text-sm font-medium text-gray-600">
                Email
              </label>

              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>

              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Sign In
            </button>

          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            Secure login for Users, Restaurants & Admins
          </div>
        </form>

      </div>
    </div>
  );
}