const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validation");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user does not exist ! ");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach(
      (keys) => (loggedInUser[keys] = req.body[keys])
    );
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firsName} , your profile updated Successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(404).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/password", async (req, res) => {
  const { emailId, password } = req.body;
  const user = User.findOne({ emailId });
  if (!user) {
    throw new Error("User not found !");
  }
  if (user.password === password) {
  }
});

module.exports = profileRouter;
