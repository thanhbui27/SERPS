const mongodb = require("mongoose");
const Schema = mongodb.Schema;

const CourseSchema = new Schema({
    name: { type: String, required: true, trim: true },
    totalCredits: { type: Number, required: true},
    headOfDepartment: { type: String, required: true, trim: true },
    
}, { timestamps: true });


const Course = mongodb.model('Course', CourseSchema)
module.exports = Course