const User = require("../models/User");

const { JWT_SECRET } = require("../configs");
const JWT = require("jsonwebtoken");

const encodedToken = (userID) => {
  return JWT.sign(
    {
      iss: "Bin Truong",
      sub: userID,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 3),
    },
    JWT_SECRET
  );
};

const index = async (req, res, next) => {
  const users = await User.find({});

  return res.status(200).json({ users });
};

module.exports = {
  index
};
