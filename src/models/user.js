const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  Password: {
    type: String,
  },
  Age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
