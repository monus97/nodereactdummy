const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  profilePic: {
    type: String,
  },
  otp: {
    type: Number,
  },
  otpExpires: {
    type: Date,
  },
  otpResendCount: {
    type: Number,
    default: 0,
  },
  otpCooldown: Date,
});
userSchema.set("timestamps", true);
module.exports = mongoose.model("user", userSchema);
