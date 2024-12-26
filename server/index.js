const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to the database");
    app.listen(3001, () => {
      console.log("Server is running @ http://localhost:3001");
    });
  })
  .catch((error) => {
    console.log("connection failed");
    console.log(error);
  });
