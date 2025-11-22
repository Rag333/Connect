const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  console.log(user);
  try {
    await user.save();
    res.send("user added successfully ! ");
  } catch (err) {
    res.status(400).send("error while adding the user " + err.message);
  }
});

//get user by firstName
app.get("/user", async (req, res) => {
  const userFirstName = req.body.firstName;

  try {
    const users = await User.find({
      firstName: userFirstName,
    });
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong !");
  }
});

//FEED API  - GET/Feed - get all user data from the database ;
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("User not found !");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).send("User not found");

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const data = req.body;
  const userId = req.body._id;
  try {
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("user updated successfully");
  } catch (err) {
    res.status(404).send("something went wrong");
  }
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
