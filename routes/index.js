const express = require("express");

const userRoute = require("./user");
const courseRoute = require("./course");

const router = express.Router();

router.use("/", userRoute);
router.use("/", courseRoute);

module.exports = router;
