const express = require("express");

const userRoute = require("./user");
const courseRoute = require("./course");
const unitRoute = require("./unit");
const classRoute = require("./class");
const templateCourse = require("./templateData");

const router = express.Router();

router.use("/", templateCourse);
router.use("/", userRoute);
router.use("/", courseRoute);
router.use("/", classRoute);

module.exports = router;
