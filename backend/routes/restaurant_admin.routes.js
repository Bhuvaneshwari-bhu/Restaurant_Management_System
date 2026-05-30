const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const Restaurant = require("../models/restaurantmodel");
const Food = require("../models/productmodel"); // your Product = Food
const Order = require("../models/ordermodel");

router.get("/my", auth, role("restaurant_admin"), async(req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ owner: req.user.id });

        if (!restaurant) {
            return res.json(null); // IMPORTANT FIX
        }

        res.json(restaurant);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get("/foods", auth, role("restaurant_admin"), async(req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ owner: req.user.id });

        if (!restaurant) return res.json([]);

        const foods = await Food.find({ restaurant: restaurant._id });

        res.json(foods);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.put("/orders/:id/status", auth, role("restaurant_admin"), async(req, res) => {
    try {
        const { status } = req.body;

        const restaurant = await Restaurant.findOne({ owner: req.user.id });

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.restaurant.toString() !== restaurant._id.toString()) {
            return res.status(403).json({ message: "Not allowed" });
        }

        order.status = status;
        await order.save();

        res.json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/orders", auth, role("restaurant_admin"), async(req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ owner: req.user.id });

        if (!restaurant) return res.json([]);

        const orders = await Order.find({ restaurant: restaurant._id });

        res.json(orders);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.get("/earnings", auth, role("restaurant_admin"), async(req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ owner: req.user.id });

        if (!restaurant) {
            return res.json({ totalOrders: 0, totalEarnings: 0 });
        }

        const orders = await Order.find({
            restaurant: restaurant._id,
            status: "delivered"
        });

        let totalEarnings = 0;

        orders.forEach(o => {
            totalEarnings += o.totalAmount || 0;
        });

        res.json({
            totalOrders: orders.length,
            totalEarnings
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/foods", auth, role("restaurant_admin"), async(req, res) => {
    const restaurant = await Restaurant.findOne({ owner: req.user.id });

    if (!restaurant) {
        return res.status(400).json({ message: "Restaurant not found" });
    }

    const food = await Food.create({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image,
        description: req.body.description,
        restaurant: restaurant._id // 🔥 THIS IS MISSING IN YOUR SYSTEM
    });

    res.json(food);
});


router.delete("/foods/:id", auth, role("restaurant_admin"), async(req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ owner: req.user.id });

        const food = await Food.findById(req.params.id);

        if (!food || food.restaurant.toString() !== restaurant._id.toString()) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await Food.findByIdAndDelete(req.params.id);

        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;