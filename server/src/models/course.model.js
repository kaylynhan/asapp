import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let CourseSchema = new Schema({
    name: {type: String},
    department: {type: String},
    units: {type: Number},
    description: {type: String},
    prereqs: [String],
    sections: [new Schema({
        number: {type: String},
        professor: {type: String},
        final: {
            day: {type: String},
            start_time: Number,
            end_time: Number,
            building: {type: String},
            room_num: {type: String}
        },
        meetings: [new Schema({
            type: {type: String},
            day: {type: String},
            start_time: Number,
            end_time: Number,
            building: {type: String},
            room_num: {type: String}
        })]
    })]
});

var Course = mongoose.model('CourseSchema', CourseSchema, 'courses');

export default Course;