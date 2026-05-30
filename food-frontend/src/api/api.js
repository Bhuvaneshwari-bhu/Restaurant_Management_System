import axios from "axios";

const api = axios.create({
    baseURL: "https://restaurant-management-system-oqs9.onrender.com/api",
    withCredentials: true
});

export default api;