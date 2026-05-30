const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const User = require("../models/usermodel");
const Order = require("../models/ordermodel");
const role = require("../middleware/roleMiddleware");
const Restaurant = require("../models/restaurantmodel");


router.post("/place", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate("cart.product");

        if (!user.cart.length) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        if (!user.cart[0].product) {
            return res.status(400).json({ message: "Invalid cart item" });
        }
        // 🧠 STEP 1: get restaurant from first item
        if (!user.cart[0].product.restaurant) {
            return res.status(400).json({ message: "Invalid restaurant data" });
        }

        const restaurantId = user.cart[0].product.restaurant.toString();

        if (!restaurantId) {
            return res.status(400).json({ message: "Invalid restaurant data" });
        }

        let total = 0;

        // 🧠 STEP 2: build order items safely
        const items = user.cart.map(item => {
            total += (item.product.price || 0) * item.quantity;

            return {
                product: item.product._id,
                quantity: item.quantity
            };
        });

        // 🧠 STEP 3: FINAL SAFETY CHECK (VERY IMPORTANT)
        const allSameRestaurant = user.cart.every(item =>
            item.product &&
            item.product.restaurant.toString() === restaurantId.toString()
        );

        if (!allSameRestaurant) {
            return res.status(400).json({
                message: "Invalid cart: multiple restaurants detected"
            });
        }

        // 🧠 STEP 4: create order
        const order = await Order.create({
            user: user._id,
            restaurant: restaurantId,
            items,
            totalAmount: total
        });

        // 🧠 STEP 5: clear cart
        user.cart = [];
        await user.save();

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/my", auth, async(req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate("items.product")
            .populate("restaurant");

        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.get("/restaurant", auth, role("restaurant_admin", "admin"), async(req, res) => {
    try {
        const restaurant = await Restaurant.findOne({
            owner: req.user.id
        });

        if (!restaurant) {
            return res.status(403).json({ message: "No restaurant found for user" });
        }

        const orders = await Order.find({
                restaurant: restaurant._id
            })
            .populate("items.product")
            .populate("user");
        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/all", auth, role("admin"), async(req, res) => {
    try {
        const orders = await Order.find()
            .populate("items.product")
            .populate("restaurant")
            .populate("user");

        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put("/:id/status", auth, role("restaurant_admin", "admin"), async(req, res) => {
    try {


        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // only restaurant owner can update
        const restaurant = await Restaurant.findOne({
            owner: req.user.id
        });

        if (!restaurant) {
            return res.status(403).json({ message: "Restaurant not found" });
        }

        if (order.restaurant.toString() !== restaurant._id.toString()) {
            return res.status(403).json({ message: "Not allowed" });
        }

        const allowedStatus = ["pending", "preparing", "delivered", "cancelled"];

        if (!allowedStatus.includes(req.body.status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const io = req.app.get("io"); // 👈 ADD THIS HERE

        order.status = req.body.status;
        await order.save();


        io.to(order.user.toString()).emit("order_updated", order);

        res.json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;