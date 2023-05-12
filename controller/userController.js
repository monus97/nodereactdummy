const user = require("../models/register");

const userRegister = async (req, res) => {
  try {
    const newUser = new user(req.body);
    const User = await newUser.save();
    res.status(201).json({
      message: User,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
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
    const updatedUser = await user.findByIdAndUpdate(id, req.body, {
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
      const userdetails = await user.findOne({ email: email });
      if (!userdetails) {
        return res.status(400).json({
          message: "email not found",
        });
      } else if (userdetails.password != password) {
        return res.status(400).json({
          message: "password incorrect",
        });
      } else {
        res.status(200).json({
          user: userdetails,
        });
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
};
