import { useNavigate } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/restaurants/${restaurant._id}`)}
      className="min-w-[300px] bg-white border border-gray-100 rounded-3xl p-6 cursor-pointer hover:shadow-xl hover:border-black/10 transition-all duration-300"
    >
      <div className="flex items-start justify-between">

        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {restaurant.name}
          </h3>

          <p className="text-gray-500 mt-2">
            {restaurant.address}
          </p>
        </div>

        <div>
          {restaurant.isOpen ? (
            <span className="text-green-600 text-sm font-medium">
              ● Open
            </span>
          ) : (
            <span className="text-red-500 text-sm font-medium">
              ● Closed
            </span>
          )}
        </div>

      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">

        <span className="text-sm text-gray-400">
          Restaurant
        </span>

        <span className="text-sm font-medium text-black">
          View Menu →
        </span>

      </div>
    </div>
  );
}