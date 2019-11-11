import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let CourseSchema = new Schema({
    name: {type: String},
    units: {type: Number},
    description: {type: String},
    prereqs: [String],
    section_list: [new Schema({
        number: {type: String},
        professor: {type: String},
        final: {
            day: {type: String},
            start_time: {type: String},
            end_time: {type:String},
            building: {type: String},
            room_num: {type: String}
        },
        meetings: [new Schema({
            type: {type: String},
            day: {type: String},
            start_time: {type: String},
            end_time: {type:String},
            building: {type: String},
            room_num: {type: String}
        })]
    })]
});

var Course = mongoose.model('CourseSchema', CourseSchema, 'courses');

export default User;