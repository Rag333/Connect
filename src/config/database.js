const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Mahipal:Messi@connect.bbuamvj.mongodb.net/ConnectDB"
  );
};

module.exports = connectDB;
