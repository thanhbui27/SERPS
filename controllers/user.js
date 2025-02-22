const User = require("../models/User");

const { JWT_SECRET } = require("../configs");
const JWT = require("jsonwebtoken");

const encodedToken = (user) => {
  const payload = {
    userId : user._id,
    email : user.email,
    sub: user._id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1),
  }
  return JWT.sign(
    payload,
    JWT_SECRET
  );
};

const index = async (req, res, next) => {
  const users = await User.find({});

  return res.status(200).json({ users });
};


const signIn = async (req, res, next) => {
  const token = encodedToken(req.user);

  res.setHeader("Authorization", token);

  return res.status(200).json({ success: true, token : token });
};

const secret = async (req, res, next) => {
  return res.status(200).json({ resources: true });
};

module.exports = {
  index,
  signIn,
  secret
};
