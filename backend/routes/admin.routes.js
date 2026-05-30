const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const User = require("../models/usermodel");
const Restaurant = require("../models/restaurantmodel");
const Order = require("../models/ordermodel");
const Product = require("../models/productmodel");


router.get("/stats", auth, role("admin"), async(req, res) => {
    try {

        const users = await User.countDocuments();
        const restaurants = await Restaurant.countDocuments();
        const products = await Product.countDocuments();
        const orders = await Order.countDocuments();

        const revenueAgg = await Order.aggregate([{
                $match: {
                    status: "delivered"
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" }
                }
            }
        ]);

        let totalRevenue = 0;

        if (revenueAgg.length > 0 && revenueAgg[0].totalRevenue) {
            totalRevenue = revenueAgg[0].totalRevenue;
        }

        res.json({
            users,
            restaurants,
            products,
            orders,
            totalRevenue
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/orders", auth, role("admin"), async(req, res) => {
    try {
        const orders = await Order.find()
            .populate("user")
            .populate("restaurant")
            .populate("items.product");

        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/restaurants", auth, role("admin"), async(req, res) => {
    try {
        const restaurants = await Restaurant.find()
            .populate("owner");

        res.json(restaurants);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.get("/products", auth, role("admin"), async(req, res) => {
    try {
        const products = await Product.find()
            .populate("restaurant");

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/restaurants/:id", auth, role("admin"), async(req, res) => {
    try {

        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        await Product.deleteMany({
            restaurant: restaurant._id
        });

        await Restaurant.findByIdAndDelete(restaurant._id);

        res.json({
            message: "Restaurant deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.delete("/products/:id", auth, role("admin"), async(req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product deleted"
        });



    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.get("/restaurants/:id", auth, role("admin"), async(req, res) => {
    try {

        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        const products = await Product.find({
            restaurant: req.params.id
        });

        res.json({
            restaurant,
            products
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.post("/products", auth, role("admin"), async(req, res) => {
    try {

        const restaurant = await Restaurant.findById(req.body.restaurant);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        const product = await Product.create(req.body);

        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;