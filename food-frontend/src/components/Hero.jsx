export default function Hero() {
  return (
    <section className="px-10 pt-16 pb-12">

      <div className="max-w-5xl">

        <p className="text-sm font-semibold tracking-[0.2em] text-gray-400 uppercase">
          Premium Food Delivery
        </p>

        <h1 className="text-6xl font-bold text-gray-900 leading-tight mt-4">
          Discover Exceptional Food Near You
        </h1>

        <p className="text-lg text-gray-500 mt-6 max-w-2xl leading-relaxed">
          Explore curated restaurants, premium dishes, and fast delivery
          experiences designed for modern food lovers.
        </p>

        <div className="flex items-center gap-4 mt-10">

          <button className="px-7 py-3 bg-black text-white rounded-2xl font-medium hover:bg-gray-800 transition">
            Order Now
          </button>

          <button className="px-7 py-3 border border-gray-300 rounded-2xl font-medium hover:border-black transition">
            Explore Menu
          </button>

        </div>

      </div>

    </section>
  );
}