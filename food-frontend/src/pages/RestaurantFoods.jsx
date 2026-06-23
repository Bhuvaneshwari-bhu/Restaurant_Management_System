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

  // REVIEWS
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadRestaurant();
    loadReviews();
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

  const loadReviews = async () => {
    try {
      const res = await api.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const submitReview = async () => {
    if (!reviewText.trim()) return;

    try {
      const res = await api.post("/reviews", {
        text: reviewText,
        rating: 5,
        restaurantId: id,
      });

      setReviews([res.data, ...reviews]);
      setReviewText("");

      alert(`Review classified: ${res.data.sentiment}`);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar search={search} setSearch={setSearch} />

      <div className="px-10 py-8">

        {/* RESTAURANT INFO */}
        <h1 className="text-4xl font-bold mb-2">
          {restaurant?.name}
        </h1>

        <p className="text-gray-500 mb-6">
          {restaurant?.address}
        </p>

        {/* FOODS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {filteredFoods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}

        </div>

        {/* REVIEW SECTION */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">

          <h2 className="text-2xl font-bold mb-4">
            Write a Review
          </h2>

          <textarea
            className="w-full border p-3 rounded-md mb-3"
            rows="3"
            placeholder="Write your experience..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />

          <button
            onClick={submitReview}
            className="bg-black text-white px-5 py-2 rounded-md"
          >
            Submit Review
          </button>

        </div>

        {/* REVIEWS LIST */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Customer Reviews
          </h2>

          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet</p>
          ) : (
            <div className="space-y-4">

              {reviews.map((r) => (
                <div
                  key={r._id}
                  className="bg-white p-4 rounded-xl shadow"
                >
                  <p className="font-medium">
                    {r.text}
                  </p>

                  <p className="text-sm mt-2 text-gray-500">
                    Sentiment:
                    <span
                      className={`ml-2 font-semibold ${
                        r.sentiment === "Positive"
                          ? "text-green-600"
                          : r.sentiment === "Negative"
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {r.sentiment}
                    </span>
                  </p>

                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// USER ACTION:
// Writes review
//     ↓
// FRONTEND:
// RestaurantFoods.jsx
//     ↓
// API CALL:
// POST /api/reviews
//     ↓
// BACKEND:
// AI sentiment analysis
//     ↓
// DATABASE:
// MongoDB (reviews collection)
//     ↓
// FRONTEND:
// GET /api/reviews/:restaurantId
//     ↓
// DISPLAY:
// Customer Reviews section