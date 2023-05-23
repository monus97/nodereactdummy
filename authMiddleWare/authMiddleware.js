const jwt = require("jsonwebtoken");
const User = require("../models/register");

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "only auth" });
  }
  const token = await authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      if (err.message == "jwt expired") {
        return res.status(401).json({ error: "jwt token expired" });
      }
      return res.status(401).json({ error: err });
    } else {
      const { id } = payload;

      const aauth = User.findById(id).then((userdata) => {
        req.user = userdata;

        next();
      });
    }
  });
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return res.status(400).json({ error: "only admin" });
      // throw new Error("You do not have permission to perform this action", 403)
    }
    next();
  };
};

module.exports = {
  verifyToken,
  restrictTo,
};
