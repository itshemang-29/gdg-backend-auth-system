const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  description: String,
  amount: Number,
  category: String,
  deadline: Date,
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Payment", paymentSchema);
