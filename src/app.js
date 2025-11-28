const express = require("express");
const connectDB = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser);

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //create a jwt token
      const token = user.getJWT(); //(hide data , secret key )
      //add the token to the cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successful!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user does not exist ! ");
    }
    res.send(user);
    res.send("reading cookies");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.post("/signup", async (req, res) => {
  try {
    //validate the user
    validateSignUpData(req);

    //encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });

    await user.save();
    res.send("user added successfully ! ");
  } catch (err) {
    res.status(400).send("Error :" + err.message);
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

app.patch("/user/:userId", async (req, res) => {
  const data = req.body;
  const userId = req.params.userId;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Updates Not Allowed!  ");
    }

    await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send(err.message || "something went wrong");
  }
});

app.post("/connectionRequest", async (req, res) => {
  const user = req.user;
  console.log("sending you a request ");
  res.send(user.firstName + "sent the connection request ");
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
