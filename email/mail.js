const nodemailer = require("nodemailer");
const User = require("../models/register");

// create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

// generate OTP function
const generateOTP = () => {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

function sendOTP(email, otp) {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "WELCOME TO Singh's World",
    text:
      "This Email has attach Your Otp for Registration : " +
      otp +
      " Use This Otp For Verification",
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Email sent successfully");
    }
  });
}

module.exports = {
  generateOTP,
  sendOTP,
};
// ===============  for sending response to the user =======================================
// const transporter = nodemailer.createTransport({service: "Gmail", 
// auth: {
//    user: "shivakantyuvasoft357@gmail.com",
//     pass: "llwjwasioxhqkcx", },});
//   //  Function to send the OTP emailfunction 
//    sendOTPEmail(email, otp) { 
//     const mailOptions = {
//       from: "shiva@gmail.com",to: email,
//       subject: "Your 4 digit OTP Code ",
//       text: `Your OTP code is: ${otp}`, };
//        return new Promise((resolve, reject) => {
//          transporter.sendMail(mailOptions, (err, info) => {
//           if (err) { console.log(err, "Errorkjhkjdhjdkh");
//            reject((response = "error"));} 
//            else { console.log(info, "kjhedjhhewdkj");
//            resolve((response = "success")); } }); });
//           }
