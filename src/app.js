const express = require("express");
const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("1 response");
    // res.send("1 response");
    next();
  },
  (req, res, next) => {
    console.log("2 response");
    //  res.send("2 response");
    next();
  },
  (req, res, next) => {
    console.log("3 response");
    res.send("3 response");
    //  next();
  }
);
app.listen(3000, () => {
  console.log("listening at port no 3000");
});
