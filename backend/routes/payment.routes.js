const router = require("express").Router();
const razorpay = require("../config/razorpay");

const crypto = require("crypto");

const auth = require("../middleware/authMiddleware");
const User = require("../models/usermodel");
const Order = require("../models/ordermodel"); // IMPORTANT
router.post("/create-order", auth, async(req, res) => {
    try {

        const user = await User.findById(req.user.id)
            .populate("cart.product");

        if (!user.cart.length) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        let total = 0;

        user.cart.forEach(item => {
            total += item.product.price * item.quantity;
        });

        const options = {
            amount: total * 100, // Razorpay expects paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// router.post("/verify-payment", auth, async (req, res) => {
//     try {
//       const {
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//       } = req.body;

//       // Step 1: Create signature string
//       const body = razorpay_order_id + "|" + razorpay_payment_id;

//       // Step 2: Generate expected signature
//       const expectedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//         .update(body.toString())
//         .digest("hex");

//       // Step 3: Compare signatures
//       const isAuthentic = expectedSignature === razorpay_signature;

//       if (!isAuthentic) {
//         return res.status(400).json({
//           success: false,
//           message: "Payment not verified",
//         });
//       }

//       // ✅ PAYMENT IS REAL HERE

//       return res.status(200).json({
//         success: true,
//         message: "Payment verified successfully",
//       });

//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         message: "Verification failed",
//       });
//     }
//   });


router.post("/verify-payment", auth, async(req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        // STEP 1: VERIFY SIGNATURE
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            });
        }
        const existingOrder = await Order.findOne({
            paymentId: razorpay_payment_id
        });

        // STEP 2: GET USER CART
        const user = await User.findById(req.user.id).populate("cart.product");

        if (!user.cart.length) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        // STEP 3: CALCULATE TOTAL
        let total = 0;

        user.cart.forEach(item => {
            total += item.product.price * item.quantity;
        });



        if (existingOrder) {
            return res.json({
                success: true,
                message: "Order already exists",
                order: existingOrder
            });
        }

        // STEP 4: CREATE ORDER (ZOMATO STYLE)
        const order = await Order.create({
            user: req.user.id,

            restaurant: user.cart[0].product.restaurant,

            items: user.cart.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
            })),

            totalAmount: total,

            paymentId: razorpay_payment_id,

            status: "pending",
        });



        // STEP 5: CLEAR CART
        user.cart = [];
        await user.save();

        return res.json({
            success: true,
            message: "Order placed successfully",
            order,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});



module.exports = router;