const express = require("express");
const authController = require("../controllers/authController");
const auth = require("../utils/auth");

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/forgotpassword", authController.forgotpassword);
authRouter.post("/resetpassword/:token", authController.resetpassword);
authRouter.get(
  "/userdetails",
  auth.isAuthenticated,
  authController.userdetails
);

module.exports = authRouter;
