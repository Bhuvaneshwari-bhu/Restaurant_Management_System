export default function FoodCard({ food, addToCart }) {
  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">

      {/* Image Placeholder */}
      <div className="h-52 bg-gray-100 overflow-hidden">

  {
    food.image ? (

      <img
        src={food.image}
        alt={food.name}
        className="w-full h-full object-cover hover:scale-105 transition duration-500"
      />

    ) : (

      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
        No Image
      </div>

    )
  }

</div>

      {/* Content */}
      <div className="p-5">

        {/* Category */}
        <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
          {food.category}
        </p>

        {/* Food Name */}
        <h2 className="text-2xl font-bold text-gray-900 mt-2">
          {food.name}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-3 leading-relaxed">
          {food.description}
        </p>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-6">

          {/* Price */}
          <span className="text-2xl font-bold text-black">
            ₹{food.price}
          </span>

          {/* Button */}
          <button
  onClick={() => addToCart(food._id)}
  className="px-5 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all duration-300"
>
  Add to Cart
</button>

        </div>

      </div>
    </div>
  );
}