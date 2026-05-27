const categories = [
  "All",
  "Biryani",
  "Pizza",
  "Burger",
  "Dessert",
  "Indian",
  "Pasta",
];

export default function Categories({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="px-10 mb-10">

      <div className="flex gap-4 overflow-x-auto">

        {categories.map((category) => (

          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all

              ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-white border border-gray-200 hover:border-black"
              }
            `}
          >
            {category}
          </button>

        ))}

      </div>

    </div>
  );
}