const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = {
  isAuthenticated: (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      // const token = res.cookies.token;
      if (!token) {
        res.status(401).json({ message: "Unautherized" });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      req.userId = decoded.id;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = auth;
