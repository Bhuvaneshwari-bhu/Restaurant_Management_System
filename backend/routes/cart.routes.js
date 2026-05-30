const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const User = require("../models/usermodel");
const Product = require("../models/productmodel");


// router.post("/add", auth, async(req, res) => {
router.post("/add", auth, async(req, res) => {

    console.log("STEP 1");

    try {

        const { productId, quantity } = req.body;

        console.log("STEP 2", productId);

        const product = await Product.findById(productId);

        console.log("STEP 3", product);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const user = await User.findById(req.user.id);

        console.log("STEP 4", user);

        const productRestaurantId =
            product.restaurant.toString();

        console.log("STEP 5");

        if (user.cart.length > 0) {

            const existingProduct =
                await Product.findById(user.cart[0].product);

            console.log("STEP 6", existingProduct);

            const existingRestaurantId =
                existingProduct.restaurant.toString();

            if (existingRestaurantId !== productRestaurantId) {

                return res.status(400).json({
                    message: "You can only add items from ONE restaurant at a time"
                });
            }
        }

        console.log("STEP 7");

        const existingItem = user.cart.find(
            item => item.product.toString() === productId.toString()
        );

        if (existingItem) {

            existingItem.quantity += (quantity || 1);

        } else {

            user.cart.push({
                product: productId,
                quantity: quantity || 1
            });
        }

        console.log("STEP 8");

        await user.save();

        console.log("STEP 9 SAVED");

        res.json(user.cart);

    } catch (error) {

        console.log("ERROR:");
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
});
router.get("/", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate("cart.product");

        res.json(user.cart);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// router.post("/remove", auth, async(req, res) => {
router.post("/remove", auth, async(req, res) => {
    try {
        const { productId } = req.body;

        const user = await User.findById(req.user.id);

        const itemIndex = user.cart.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not in cart" });
        }

        // decrease quantity
        if (user.cart[itemIndex].quantity > 1) {
            user.cart[itemIndex].quantity -= 1;
        } else {
            // remove item completely
            user.cart.splice(itemIndex, 1);
        }

        await user.save();

        res.json(user.cart);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/delete", auth, async(req, res) => {
    try {
        const { productId } = req.body;

        const user = await User.findById(req.user.id);

        user.cart = user.cart.filter(
            item => item.product.toString() !== productId
        );

        await user.save();

        res.json(user.cart);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;