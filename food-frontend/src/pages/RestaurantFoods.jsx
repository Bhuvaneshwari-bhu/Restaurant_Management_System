import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";

export default function RestaurantFoods() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadRestaurant();
  }, []);

  const loadRestaurant = async () => {
    try {
      const res = await api.get(`/restaurants/${id}`);

      setRestaurant(res.data.restaurant);
      setFoods(res.data.foods);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <div className="px-10 py-8">

        <h1 className="text-4xl font-bold mb-2">
          {restaurant?.name}
        </h1>

        <p className="text-gray-500 mb-8">
          {restaurant?.address}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {filteredFoods.map((food) => (
            <FoodCard
              key={food._id}
              food={food}
            />
          ))}

        </div>

      </div>

    </div>
  );
}