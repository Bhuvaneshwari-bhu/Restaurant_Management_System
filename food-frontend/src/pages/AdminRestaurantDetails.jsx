import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function AdminRestaurantDetails() {

  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    loadRestaurant();
  }, []);

  const loadRestaurant = async () => {
    try {
      const res = await api.get(`/admin/restaurants/${id}`);

      setRestaurant(res.data.restaurant);
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async () => {
    try {
      await api.post("/admin/products", {
        ...form,
        restaurant: id,
      });

      setForm({
        name: "",
        price: "",
        category: "",
        image: "",
        description: "",
      });

      loadRestaurant();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await api.delete(`/admin/products/${productId}`);
      loadRestaurant();
    } catch (err) {
      console.log(err);
    }
  };

  if (!restaurant)
    return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-6">
        {restaurant.name}
      </h1>

      {/* Add Product */}

      <div className="bg-white p-5 rounded shadow mb-8">

        <h2 className="text-xl font-bold mb-4">
          Add Product
        </h2>

        <div className="grid grid-cols-2 gap-3">

          <input
            className="border p-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            className="border p-2"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
          />

          <input
            className="border p-2"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          />

          <input
            className="border p-2"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.value,
              })
            }
          />

        </div>

        <textarea
          className="border p-2 w-full mt-3"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <button
          onClick={addProduct}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Add Product
        </button>

      </div>

      {/* Products */}

      <div className="grid grid-cols-3 gap-4">

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded shadow p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="font-bold mt-3">
              {product.name}
            </h3>

            <p>₹{product.price}</p>

            <p className="text-sm text-gray-500">
              {product.category}
            </p>

            <button
              onClick={() =>
                deleteProduct(product._id)
              }
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}