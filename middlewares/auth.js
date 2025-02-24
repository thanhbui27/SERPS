const passport = require('passport');
const Roles = require('../constants/roles');

const protect = passport.authenticate("jwt", { session: false })
  
const isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== Roles.ADMIN) {
        return res.status(403).json({ message: "Access denied! Admins only." });
    }

  next();
}

module.exports = {
    protect,
    isAdmin
}