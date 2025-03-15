const express = require("express");

const userRoute = require("./user");
const courseRoute = require("./course");
const templateCourse = require("./templateData");

const router = express.Router();

router.use("/", templateCourse);
router.use("/", userRoute);
router.use("/", courseRoute);

module.exports = router;
