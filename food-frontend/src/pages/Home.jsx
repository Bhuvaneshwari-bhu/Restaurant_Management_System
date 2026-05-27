import { useEffect, useState } from "react";
import api from "../api/api";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Restaurants from "../components/Restaurants";
import FoodCard from "../components/FoodCard";

export default function Home() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
   

  const getFoods = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setFoods(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);


   
  const addToCart = async (productId) => {
  try {
    await api.post("/cart/add", {
      productId,
      quantity: 1,
    });
alert("Added to cart ✅"); 
    
  } catch (error) {
  console.log("CART ERROR:", error.response?.data || error.message);
  alert("Failed to add ❌");
}
};
  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
        

      <Navbar search={search} setSearch={setSearch} />

      <Hero />
      <Restaurants />

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="px-10 pb-10">
        <h1 className="text-4xl font-bold mb-10">
          Featured Foods
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFoods.map((food) => (
              <FoodCard
                key={food._id}
                food={food}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}