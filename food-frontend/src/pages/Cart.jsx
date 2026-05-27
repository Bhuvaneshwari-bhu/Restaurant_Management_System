import { useEffect, useState } from "react";
import api from "../api/api";

export default function Cart() {

  const [cart, setCart] = useState([]);

  const getCart = async () => {
    try {

      const response = await api.get("/cart");

      setCart(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);



  const total = cart.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  );


  const addItem = async (productId) => {
  try {
    setCart(prev =>
      prev.map(item =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    await api.post("/cart/add", {
      productId,
      quantity: 1,
    });

  } catch (err) {
    console.log(err);
    getCart(); // fallback sync
  }
};

const decreaseItem = async (productId) => {
  try {
    setCart(prev =>
      prev.map(item =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );

    await api.post("/cart/remove", {
      productId,
    });

  } catch (err) {
    console.log(err);
    getCart();
  }
};

const placeOrder = async () => {
  try {
    const res = await api.post("/orders/place");

    alert("Order placed successfully ✅");
    // setCart([]); // clear UI instantly
   await getCart();// sync with backend

  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Order failed");
  }
};

const removeItem = async (productId) => {
  try {
    await api.post("/cart/delete", {
      productId,
    });

    getCart(); // refresh
  } catch (err) {
    console.log(err);
  }
};



  return (
    <div className="min-h-screen bg-gray-50 px-10 py-10">

      <h1 className="text-5xl font-bold text-gray-900 mb-10">
        Your Cart
      </h1>

      <div className="space-y-6">
        {cart.length === 0 && (
  <div className="text-center py-20">
    <h2 className="text-3xl font-bold text-gray-700">
      Your cart is empty 🛒
    </h2>
    <p className="text-gray-500 mt-2">
      Add some delicious food to get started!
    </p>
  </div>
)}

        {cart.map((item) => (

          <div
            key={item._id}
            className="bg-white rounded-3xl p-6 flex items-center justify-between shadow-sm border border-gray-100"
          >

            <div className="flex items-center gap-5">

              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100">

                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-900">
                  {item.product.name}
                </h2>

                <div className="flex items-center gap-3 mt-1">

  <button
    onClick={() => decreaseItem(item.product._id)}
    className="px-3 py-1 bg-gray-200 rounded-lg"
  >
    -
  </button>

  <p className="text-gray-700 font-semibold">
    {item.quantity}
  </p>

  <button
    onClick={() => addItem(item.product._id)}
    className="px-3 py-1 bg-black text-white rounded-lg"
  >
    +
  </button>

</div>

              </div>

            </div>

            <div className="flex flex-col items-end gap-3">

  <h3 className="text-2xl font-bold">
    ₹{item.product.price * item.quantity}
  </h3>

  {/* REMOVE BUTTON HERE */}
  <button
    onClick={() => removeItem(item.product._id)}
    className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
  >
    Remove
  </button>

</div>

          </div>

        ))}

      </div>

      <div className="mt-10 bg-black text-white rounded-3xl p-8">

        <h2 className="text-4xl font-bold">
          Total: ₹{total}
        </h2>

        <button
  onClick={placeOrder}
  className="mt-6 bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition"
>
  Place Order
</button>

      </div>

    </div>
  );
}