const user = require("../models/register");
const jwt = require("jsonwebtoken");
const secure = require("../bcrypt/bcrypt");
const bcrypt = require("bcrypt");
const { generateOTP, sendOTP } = require("../email/mail");

const userRegister = async (req, res) => {
  try {
    const newUser = new user(req.body);
    const oldUser = await user.findOne({ email: req.body.email });
    if (!oldUser) {
      // const OTP = generateOTP()
      // newUser.otp = OTP
      newUser.profilePic = `${req.file.destination}/${req.file.filename}`;

      newUser.password = await secure(newUser.password);
      newUser.otp = await generateOTP(newUser.otp);
      newUser.otpExpires = Date.now() + 300000;
      const User = await newUser.save();
      sendOTP(newUser.email, newUser.otp);
      const email = newUser.email;

      setTimeout(async () => {
        // Expire OTP after 30 seconds
        const User = await user.findOneAndUpdate(
          { email },
          { otp: null, otpExpires: null }
        );
        if (!User) {
          return res.status(404).send({ error: "User not found" });
        }
        console.log("OTP Expired");
      }, 30000);
      res.status(201).json({
        message: "success",
      });
    } else {
      res.status(409).json({
        message: "user Already exits please login",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(401).json({ message: "Please provide otp" });
    }

    const User = await user.findOne({ otp });

    if (!User) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(401).json({ message: "Please provide email" });
    }
    const OTP = generateOTP();
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(401).json({ message: "Invalid email" });
    }
    User.otp = OTP;
    User.otpTries = 0;
    User.otpExpires = Date.now() + 30000; // otp will expire after 30 second
    await User.save();
    sendOTP(email, OTP);
    setTimeout(async () => {
      // Expire OTP after 30 seconds
      const User = await user.findOneAndUpdate(
        { email },
        { otp: null, otpExpires: null }
      );
      if (!User) {
        return res.status(404).send({ error: "User not found" });
      }
    }, 30000);
    res.status(201).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const UserDetails = await user.find({});

    res.status(201).json({
      message: "all users ",
      UserDetails,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const UserDetails = await user.findById(id);

    res.status(201).json({
      UserDetails,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const UserDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const User = await user.findByIdAndDelete(id);
    res.status(200).json({
      message: "user deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const payload = {
      name,
      email,
    };
    if (req.file) {
      const img = `${req.file.destination}/${req.file.filename}`;
      payload.profilePic = img;
    }
    const updatedUser = await user.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (updatedUser != null) {
      const update = await updatedUser.save();
      res.status(200).json({
        message: "updated successfull",
        updatedData: update,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const userdetails = await user
        .findOne({ email: email })
        .select("+password");
      const isMatch = await bcrypt.compare(
        req.body.password,
        userdetails.password
      );

      if (!userdetails) {
        return res.status(400).json({
          message: "email not found",
        });
      } else if (!isMatch) {
        return res.status(400).json({
          message: "password incorrect",
        });
      } else {
        if (userdetails.role === "admin") {
          userdetails.password = undefined;
          const token = jwt.sign({ id: userdetails._id }, process.env.JWT_KEY, {
            expiresIn: "30d",
          });
          res.status(200).json({
            message: "welcome admin",
            user: userdetails,
            token: token,
          });
        } else {
          userdetails.password = undefined;
          const token = jwt.sign({ id: userdetails._id }, process.env.JWT_KEY, {
            expiresIn: "3h",
          });
          res.status(200).json({
            user: userdetails,
            token: token,
          });
        }
      }
    } else {
      return res.status(400).json({
        message: "bad-credentials",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  userRegister,
  getUser,
  UserDelete,
  getUserById,
  updateUser,
  userLogin,
  resendOtp,
  verifyOtp,
};
