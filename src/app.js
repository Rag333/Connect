const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
app.post("/signup", async (req, res) => {
  const user1 = {
    firstName: "Mahipal Singh",
    LastName: "Singh",
    Email: "mahipal98104",
    Password: "Lionenmess@123",
  };
  const user = new user(user1);
  await user.save();
  res.send("user added successfully ! ");
});

connectDB()
  .then(() => {
    console.log("database connected successfully!! ");
    app.listen(3000, () => {
      console.log("listening at port no 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected some error occured !");
  });
