import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import RestaurantOrders from "./pages/RestaurantOrders";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/restaurant/orders" element={<RestaurantOrders />} />
        <Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>

<Route
  path="/restaurant/dashboard"
  element={<RestaurantDashboard />}
/>
    </Routes>
  );
}

export default App;