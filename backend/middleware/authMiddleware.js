const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // const authHeader = req.headers.authorization;

    // if (!authHeader) {
    //     return res.status(401).json({ message: "No token" });

    // }

    // const token = authHeader.split(" ")[1];
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: "No token" });
    }
    try {
        const decoded = jwt.verify(token, "secretKey");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" })
    }
}