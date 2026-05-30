// import RestaurantCard from "./RestaurantCard";

// const restaurants = [
//   {
//     id: 1,
//     name: "Spice Villa",
//     category: "Indian Cuisine",
//     rating: "4.8",
//     deliveryTime: "25 mins",
//     location: "Khar",
//   },
//   {
//     id: 2,
//     name: "Urban Bites",
//     category: "Fast Food",
//     rating: "4.6",
//     deliveryTime: "30 mins",
//     location: "Bandra",
//   },
//   {
//     id: 3,
//     name: "Casa Italiano",
//     category: "Italian",
//     rating: "4.9",
//     deliveryTime: "35 mins",
//     location: "Andheri",
//   },
// ];

// export default function Restaurants() {
//   return (
//     <section className="px-10 mb-16">

//       <div className="flex items-center justify-between mb-8">

//         <h2 className="text-3xl font-bold text-gray-900">
//           Top Restaurants
//         </h2>

//         <button className="text-sm font-medium text-gray-500 hover:text-black transition">
//           View All
//         </button>

//       </div>

//       <div className="flex gap-6 overflow-x-auto pb-2">

//         {restaurants.map((restaurant) => (
//           <RestaurantCard
//             key={restaurant.id}
//             restaurant={restaurant}
//           />
//         ))}

//       </div>

//     </section>
//   );
// }

import { useEffect, useState } from "react";
import api from "../api/api";
import RestaurantCard from "./RestaurantCard";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await api.get("/restaurants");
      setRestaurants(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="px-10 mb-16">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Top Restaurants
        </h2>

        <button className="text-sm font-medium text-gray-500 hover:text-black transition">
          View All
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-2">

        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            restaurant={restaurant}
          />
        ))}

      </div>

    </section>
  );
}