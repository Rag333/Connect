const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
require("./utils/cronJob");
app.set("trust proxy", 1);
app.use(
  cors({
    origin: [
      "http://localhost:5173", // dev
      "https://connectwme.site", // prod
      "https://www.connectwme.site",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);

connectDB()
  .then(() => {
    console.log("database connected successfully!! ");
    app.listen(process.env.PORT || 3000, () => {
      console.log("listening at port no 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected some error occured !");
  });
