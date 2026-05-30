const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");
const analyzeSentiment = require("../utils/sentiment");

// CREATE REVIEW
router.post("/", async(req, res) => {
    try {
        const { text, rating, restaurantId } = req.body;

        const sentiment = analyzeSentiment(text);

        const review = await Review.create({
            user: req.user.id,
            restaurant: restaurantId,
            text,
            rating,
            sentiment
        });

        res.json(review);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET REVIEWS FOR RESTAURANT
router.get("/:restaurantId", async(req, res) => {
    const reviews = await Review.find({
        restaurant: req.params.restaurantId
    }).populate("user", "name");

    res.json(reviews);
});

module.exports = router;