const Roles = require("../constants/roles");
const Course = require("../models/courseModel");
const User = require("../models/userModel");

const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json({ success: true, data: courses });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

const createCourse = async (req, res) => {
  try {
    let courseExist = await Course.find({ name: req.body.name });

    if (courseExist.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Course is existed!" });
    }

    let teacher = await User.findOne({ _id: req.body.headOfDepartment });
    if (teacher.role !== Roles.TEACHER) {
      return res
        .status(400)
        .json({ success: false, message: "auth is not a teacher" });
    }

    let course = new Course(req.body);

    await course.save();

    return res
      .status(201)
      .json({ success: true, message: "Course created successfully!" });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

const createManyCourses = async (req, res) => {
  try {
    const options = { ordered: true };
    const courses = await Course.insertMany(req.body, options);
    return res
      .status(201)
      .json({ success: true, data: courses, message: "Insert Success" });
  } catch (e) {
    return res.status(400).json({ success: false, message: e.message });
  }
};

module.exports = {
  getAllCourse,
  createCourse,
  createManyCourses,
};
