const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const http = require("http");
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
app.post(
  "/payment/webhook",
  express.raw({ type: "application/json" }),
  require("./routes/payment")
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("database connected successfully!! ");
    server.listen(process.env.PORT || 3000, () => {
      console.log("listening at port no 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected some error occured !");
  });
