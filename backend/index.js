//brain of backend

require("dotenv").config();
const express = require('express')
const app = express()



const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

app.set("io", io);

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", (userId) => {
        console.log("Joining room:", userId);
        socket.join(userId);
    });

});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));


//middleware
app.use(express.json()) //middleware
app.use(express.urlencoded({ extended: false }));

const mongoose = require('mongoose')
const Product = require('./models/productmodel')

const productRoute = require("./routes/product.route.js")
const authRoute = require("./routes/auth.route.js")
const restaurantRoutes = require("./routes/restaurant.routes.js");
app.use("/api/restaurants", restaurantRoutes);

const restaurantAdminRoutes = require("./routes/restaurant_admin.routes.js");
app.use("/api/restaurant-admin", restaurantAdminRoutes);
const cartRoutes = require("./routes/cart.routes");
app.use("/api/cart", cartRoutes);

const adminRoutes = require("./routes/admin.routes");

app.use("/api/admin", adminRoutes);

// User logs in
//  ↓
// adds food to cart
//  ↓
// cart stored inside user document
//  ↓
// populate shows full food details

const orderRoutes = require("./routes/order.routes");

app.use("/api/orders", orderRoutes);

//User side:
// Add to cart
//    ↓
// Place order
//    ↓
// Cart cleared
//    ↓
// Order created


//Admin Side:
// View orders
//    ↓
// Update status
//    ↓
// Delivered



//routes
app.use('/api/products', productRoute)
app.use('/api/auth', authRoute)


app.get('/', (req, res) => {
    res.send("Hello from Node api : express, Nodemon is running")
})

// app.get('/api/products', async(req, res) => {
//     try {
//         const products = await Product.find({})
//         res.status(200).json(products)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// app.get('/api/products/:id', async(req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findById(id);
//         res.status(200).json(product)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// app.post('/api/products', async(req, res) => {
//     try {
//         const product = await Product.create(req.body)
//         res.status(200).json(product)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// //update product

// app.put('/api/products/:id', async(req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByIdAndUpdate(id, req.body);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" })
//         }

//         const updatedProduct = await Product.findById(id);
//         res.status(200).json(updatedProduct)

//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// //delete product
// app.delete('/api/products/:id', async(req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByIdAndDelete(id);

//         if (!product) {
//             return res.status(404).json({ message: "Product Not found" })
//         }

//         res.status(200).json({ message: "Product deleted Successfully" })
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

//Authentication Routes
//Register



mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to Database")
            // app.listen(3000, () => {
            //     console.log("sever is running on port 3000")
            // })
        server.listen(3000, () => {
            console.log("Server running on 3000");
        });
    })
    .catch((err) => {
        console.log(err)
    })