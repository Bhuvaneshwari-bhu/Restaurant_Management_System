export default function RestaurantCard({ restaurant }) {
  return (
    <div className="min-w-[280px] bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">

      {/* Image Placeholder */}
      <div className="h-40 bg-gray-100"></div>

      {/* Content */}
      <div className="p-5">

        <div className="flex items-start justify-between">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {restaurant.name}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {restaurant.category}
            </p>
          </div>

          <div className="px-3 py-1 bg-black text-white text-sm rounded-xl">
            {restaurant.rating}
          </div>

        </div>

        <div className="flex items-center justify-between mt-6 text-sm text-gray-500">

          <span>{restaurant.deliveryTime}</span>

          <span>{restaurant.location}</span>

        </div>

      </div>
    </div>
  );
}