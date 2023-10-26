const jwt = require("jsonwebtoken");

const authValidator = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ response: "bad auth" });
    }
    req.body.userId = decoded.userId; // idedme i body userId
    return next();
  });
};

module.exports = authValidator;
