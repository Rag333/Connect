const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("helloooooo");
});
app.post("/user", (req, res) => {
  res.send("user updated in db ");
});
app.delete("/user", (req, res) => {
  res.send("user deleted successfully");
});

app.listen(3000, () => {
  console.log("listening at port no 3000");
});
