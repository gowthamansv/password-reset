const express = require("express");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://password-reset-03.netlify.app", // Frontend URL
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

module.exports = app;
