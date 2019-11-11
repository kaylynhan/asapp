import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let CourseSchema = new Schema({
    name: {type: String},
    department: {type: String},
    number: {type: String},
    description: {type: String},
    prereqs: [String],
    units: {type: Number},
    sections: [{
        id: {type: String},
        number: {type: String},
        professor: {type: String},
        cape: {type: Number},
        gpa: {type: Number},
        workload: {type: Number},
        final: {
            date: {type: String},
            start_time: Number,
            end_time: Number,
            building: {type: String},
            room_num: {type: String}
        },
        meetings: [{
            id: {type: String},
            type: {type: String},
            day: {type: String},
            start_time: Number,
            end_time: Number,
            building: {type: String},
            room_num: {type: String}
        }]
    }]
}, {useNestedStrict: true});

var Course = mongoose.model('CourseSchema', CourseSchema, 'courses');

export default Course;
