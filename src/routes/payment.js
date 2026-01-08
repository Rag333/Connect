const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const instance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { membershipAmount } = require("../utils/constant");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const membershipType = req.body?.membershipType;

    if (!membershipType) {
      return res.status(400).json({ message: "membershipType is required" });
    }
    if (!membershipAmount[membershipType]) {
      return res.status(400).json({ message: "Invalid membership type" });
    }
    const { firstName, lastName, emailId } = req.user;

    const order = await instance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });
    await payment.save();
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      notes: order.notes,
      keyId: process.env.YOUR_KEY_ID,
    });
  } catch (err) {
    res.status(400).json({
      message: "ERROR : " + err.message,
    });
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.headers["X-Razorpay-Signature"];
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(webhookBody),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );
    if (!isWebhookValid) {
      return res
        .status(400)
        .json({ message: "Webhook signature is invalid !!!" });
    }
    //update my payment status in database
    const paymentDetails = req.body.payload.payment.entity;
    const payment = await Payment.findOne({
      orderId: paymentDetails.orderId,
    });
    payment.status = paymentDetails.status;
    await payment.save();
    const user = User.findOne({ _id: payment.userId });
    user.isPremium = true;

    user.membershipType = payment.notes.membershipType;
    await user.save();
    //update the user as premium

    // if (req.body.event == "payment.captured") {
    // }
    // if (req.body.event == "payment.failed") {
    // }

    //return success to the razorpay
    return res.status(200).json({ message: "WEBHOOK RECEIVED SUCCESSFULLY" });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});
module.exports = paymentRouter;
