const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const analyzeSentiment = (text) => {
    const result = sentiment.analyze(text);

    if (result.score > 0) return "Positive";
    if (result.score < 0) return "Negative";
    return "Neutral";
};

module.exports = analyzeSentiment;