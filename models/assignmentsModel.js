const mongodb = require("mongoose");
const Schema = mongodb.Schema;

const AssignmentSchema = new Schema({
    unitId: { type: Schema.Types.ObjectId, ref: 'Unit', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    deadline: { type: Date, required: true },
    maxMarks: { type: Number, required: true },
    marks: { type: Number, required: false },
    submissions: [{  studentId : {type: Schema.Types.ObjectId, ref: 'User'}, submissionDate: { type: Date, required: true }, file: { type: String, required: true } ,grade : {type : Number, required : false} }],
}, { timestamps: true });

const Assignment = mongodb.model('Assignment', AssignmentSchema)
module.exports = Assignment