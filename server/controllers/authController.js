const User = require("../models/user");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      //   const passwordPattern =
      //     /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

      const userExist = await User.findOne({ email: email });

      const hashedPassword = await bcrypt.hash(password, 10);

      if (userExist) {
        return res.status(400).json({ message: "User already exist" });
      }
      //   if (!passwordPattern.test(password)) {
      //     return res
      //       .status(422)
      //       .json({ message: "Password does not meet the required pattern." });
      //   }

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });
      await newUser.save();
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const userExist = await User.findOne({ email: email });
      if (!userExist) {
        return res.status(404).json({ message: "User does not exist" });
      }

      const passwordIsValid = await bcrypt.compare(
        password,
        userExist.password
      );
      if (!passwordIsValid) {
        return res.status(400).json({ message: "Invalid Password" });
      }

      const token = jwt.sign({ id: userExist.id }, process.env.SECRET_KEY, {
        expiresIn: "1h", // Set token expiration
      });

      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({
        message: "Login successfully",
        token, // Send token in the response
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Logout sucessfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  userdetails: async (req, res) => {
    try {
      const userId = req.userId;

      const user = await User.findById(userId).select(
        "-password -__v -createdAt -updatedAt -_id"
      );

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  forgotpassword: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetToken = resetToken;
      user.resetTokenExpiry = Date.now() + 3600000; // valid for 1 hour
      await user.save();

      const resetLink = `https://password-reset-03.netlify.app/resetpassword/${resetToken}`;

      // Use sendEmail utility
      await sendEmail(email, resetLink);

      res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  resetpassword: async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpiry = null;
      await user.save();
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = authController;
