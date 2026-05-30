const router = require("express").Router();
const { register, login } = require("../controllers/auth.controller")
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const auth = require("../middleware/authMiddleware");
router.post("/refresh", async(req, res) => {
    // const { refreshToken } = req.body;
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({
            message: "No refresh token"
        });
    }


    try {
        const decoded = jwt.verify(refreshToken, "refreshSecretKey");
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        const newAccessToken = jwt.sign({
                id: decoded.id,
                role: decoded.role
            },
            "secretKey", { expiresIn: "15m" }
        );

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        });


        return res.json({
            accessToken: newAccessToken
        });

    } catch (error) {
        return res.status(403).json({
            message: "Invalid refresh token"
        });
    }
});


router.post("/register", [
    body("name").notEmpty().withMessage("Name is required"),
    body("email")
    .isEmail()
    .withMessage("Enter valid email"),
    body("password").isLength({ min: 6 })
    .withMessage("Password must be atleast 6 Characters"),
], register);
router.post("/login", login);

router.post("/logout", auth, async(req, res) => {

    await User.findByIdAndUpdate(req.user.id, {
        refreshToken: null
    });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({ message: "Logged out successfully" });
});

router.get("/me", auth, async(req, res) => {
    const user = await User.findById(req.user.id);

    res.json({
        id: user._id,
        role: user.role,
        name: user.name,
    });
});

module.exports = router