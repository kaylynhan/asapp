import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let CourseSchema = new Schema({
    name: {type: String},
    department: {type: String},
    number: {type: String},
    description: {type: String},
    prereqs: {type: String},
    units: {type: Number},
    gpa: {type: Number},
    workload: {type: Number},
    class_rating: {type: Number},
    sections: [{
        id: {type: String},
        number: {type: String},
        professor: {type: String},
        gpa: {type: Number},
        workload: {type: Number},
        prof_rating: {type: Number},
        link: {type: String},
        final: {
            date: {type: String},
            start_time: {type: String},
            end_time: {type: String}
        },
        meetings: [{
            id: {type: String},
            code: {type: String},
            type: {type: String},
            day: {type: String},
            start_time: {type: String},
            end_time: {type: String},
            building: {type: String},
            room_num: {type: String}
        }]
    }]
}, {strict: "throw", useNestedStrict: true});

var Course = mongoose.model('CourseSchema', CourseSchema, 'courses');

export default Course;
