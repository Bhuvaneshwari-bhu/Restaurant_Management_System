import { useNavigate } from "react-router-dom";

export default function Navbar({ search, setSearch }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between sticky top-0 z-50">

      {/* Logo */}
      <div>
        <h1
          className="text-2xl font-bold text-gray-900 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Flavor
        </h1>
      </div>

      {/* Search */}
      <div className="w-[40%]">
        <input
          type="text"
          placeholder="Search foods..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-2xl bg-gray-100 outline-none border border-transparent focus:border-black transition"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {token ? (
          <>

          <button
  onClick={() => navigate("/orders")}
  className="px-5 py-2 rounded-xl border border-gray-300 hover:border-black"
>
  My Orders
</button>
            <button
              onClick={() => navigate("/cart")}
              className="px-5 py-2 rounded-xl bg-black text-white hover:bg-gray-800"
            >
              Cart
            </button>

            

            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-xl border border-gray-300 hover:border-black"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-xl border border-gray-300 hover:border-black"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-5 py-2 rounded-xl bg-black text-white"
            >
              Register
            </button>
          </>
        )}

      </div>
    </nav>
  );
}