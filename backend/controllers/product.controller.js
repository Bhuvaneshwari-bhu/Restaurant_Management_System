const Product = require("../models/productmodel")
const getProducts = async(req, res) => {
    try {
        const products = await Product.find().populate("restaurant");
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate("restaurant");
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// const createProduct = async(req, res) => {
//     try {
//         const product = await Product.create(req.body)
//         res.status(200).json(product)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }
const createProduct = async(req, res) => {
    try {
        const {
            name,
            price,
            category,
            image,
            description,
            restaurant
        } = req.body;

        //validation (important)
        if (!restaurant) {
            return res.status(400).json({
                message: "Restaurant is required"
            });
        }

        const product = await Product.create({
            name,
            price,
            category,
            image,
            description,
            restaurant
        });

        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product Not found" })
        }

        res.status(200).json({ message: "Product deleted Successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}