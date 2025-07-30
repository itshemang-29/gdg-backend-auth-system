const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/mailer");

exports.register = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  let user = await User.findOne({ email });
  if (!user) user = new User({ email });
  user.otp = otp;
  user.isVerified = false;
  await user.save();
  await sendMail(email, "Your OTP Code", `Your OTP is: ${otp}`);
  res.status(200).json({ message: "OTP sent to email" });
};

exports.verify = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.otp !== otp)
    return res.status(400).json({ error: "Invalid OTP" });
  user.isVerified = true;
  user.otp = null;
  await user.save();
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ token });
};
