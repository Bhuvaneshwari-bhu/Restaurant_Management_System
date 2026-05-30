const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },

    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: Number
    }],

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "preparing", "delivered", "cancelled"],
        default: "pending"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);