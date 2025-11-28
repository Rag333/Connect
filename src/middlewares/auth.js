const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    //read the token from req cookies
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Token is not valid ! ");
    }
    //validate cookies
    const decodedObj = await jwt.verify(token, "Lionenmess@123");
    //find the user name
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found ! ");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
};

module.exports = {
  userAuth,
};
