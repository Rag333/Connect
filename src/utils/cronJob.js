const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequest = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");

cron.schedule(
  "0 8 * * *",
  async () => {
    // send emails to all the user who got the request yesterday
    try {
      console.log("🕒 Cron executed at:", new Date().toLocaleString("en-IN"));

      const yesterday = subDays(new Date(), 1);
      const yesterdayStart = startOfDay(yesterday);
      const yesterdayEnd = endOfDay(yesterday);
      const pendingRequest = await ConnectionRequest.find({
        status: "interested",
        createdAt: {
          $gte: yesterdayStart,
          $lt: yesterdayEnd,
        },
      }).populate("toUserId fromUserId");

      const listOfEmails = [
        ...new Set(pendingRequest.map((request) => request.toUserId.emailId)),
      ];

      for (const email of listOfEmails) {
        try {
          const res = await sendEmail.run(
            email,
            "New Friend Requests Pending 🙂",
            "You have pending friend requests. Please login to ConnectwMe."
          );
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  {
    timezone: "Asia/Kolkata",
  }
);
