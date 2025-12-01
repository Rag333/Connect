//additional code
// apis to learn

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

//FEED API - GET/Feed - get all user data from the database ;
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
