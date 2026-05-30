const express = require("express");
const Product = require("../models/productmodel.js")
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller.js")

const auth = require("../middleware/authMiddleware.js")
const admin = require("../middleware/adminMiddleware.js")
const roleMiddleware = require("../middleware/roleMiddleware");
//protected routes
// router.get('/', auth, getProducts)
router.get('/', getProducts)
router.get('/:id', auth, getProduct)

router.post('/', auth, roleMiddleware("restaurant_admin", "admin"), createProduct)

router.put('/:id', auth, roleMiddleware("restaurant_admin"), updateProduct)

router.delete('/:id', auth, roleMiddleware("restaurant_admin"), deleteProduct)


// Request
//  ↓
// auth middleware
//  ↓
// admin middleware
//  ↓
// delete controller


// Login
//  ↓
// JWT token generated
//  ↓
// Token sent in Authorization header
//  ↓
// authMiddleware verifies token
//  ↓
// adminMiddleware checks role
//  ↓
// Protected controller executes
//  ↓
// Product created in MongoDB




// LOGIN
//  ↓
// accessToken + refreshToken stored in cookies
//  ↓
// API request → accessToken cookie used
//  ↓
// accessToken expires
//  ↓
// /refresh called automatically
//  ↓
// server reads refreshToken from cookie
//  ↓
// new accessToken generated + stored again in cookie




// Login
//  ↓
// accessToken (cookie, 15 min)
// refreshToken (cookie, 7 days + DB stored)

// API call
//  ↓
// middleware checks accessToken

// If expired
//  ↓
// /refresh
//  ↓
// new accessToken issued automatically

// Logout
//  ↓
// refreshToken removed from DB + cookies cleared
module.exports = router;