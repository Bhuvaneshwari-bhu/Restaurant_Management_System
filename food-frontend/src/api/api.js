import axios from "axios";

const api = axios.create({
    baseURL: "https://restaurant-management-system-oqs9.onrender.com",
    withCredentials: true
});

export default api;