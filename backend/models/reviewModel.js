const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    text: String,
    rating: Number,
    sentiment: {
        type: String,
        enum: ["Positive", "Negative", "Neutral"]
    }
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);