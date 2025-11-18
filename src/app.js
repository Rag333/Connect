const express = require("express");
const app = express();
const { adminAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);
app.get("/admin/allUserData", (req, res) => {
  res.send("all data is send ");
});

app.use("/", (err, req, res, next) => {
  if (req.err) {
    res.status(500).send("something went wrong");
  }
});

app.listen(3000, () => {
  console.log("listening at port no 3000");
});
