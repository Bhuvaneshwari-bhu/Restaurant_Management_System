const router = require("express").Router();
const Restaurant = require("../models/restaurantmodel.js");
const auth = require("../middleware/authMiddleware.js");
const admin = require("../middleware/adminMiddleware.js");
const Product = require("../models/productmodel.js");
const role = require("../middleware/roleMiddleware");

router.post("/", auth, role("restaurant_admin", "admin"), async(req, res) => {
    try {
        const restaurant = await Restaurant.create({
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            owner: req.user.id
        });

        res.status(201).json(restaurant);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async(req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/my", auth, role("restaurant_admin"), async(req, res) => {
    try {
        const restaurant = await Restaurant.findOne({
            owner: req.user.id
        });

        res.json(restaurant);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




router.delete("/:id", auth, role("admin"), async(req, res) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id);
        res.json({ message: "Restaurant deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/:id", async(req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        const foods = await Product.find({
            restaurant: restaurant._id
        });

        res.json({
            restaurant,
            foods
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;