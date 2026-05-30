export default function RestaurantCard({ restaurant }) {
  return (
    <div className="min-w-[280px] bg-white rounded-2xl shadow p-5">

      <h3 className="text-xl font-bold">
        {restaurant.name}
      </h3>

      <p className="text-gray-500 mt-2">
        {restaurant.address}
      </p>

      <div className="mt-4">
        {restaurant.isOpen ? (
          <span className="text-green-600 font-medium">
            ● Open
          </span>
        ) : (
          <span className="text-red-500 font-medium">
            ● Closed
          </span>
        )}
      </div>

    </div>
  );
}