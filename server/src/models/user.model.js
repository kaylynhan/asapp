import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: { type: String, 
            match: [/^[A-Za-z]+[0-9]*@ucsd\.edu$/, 'You must input a ucsd email!'],
            required: [true, 'A user must have an email!'] 
    },
    password: { type: String, 
        required: [true, 'A user must have a password!'] 
    },
    schedules: [{
        label: { type: String },
        footnotes: { type: String },
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
    }]
}, {strict: "throw", useNestedStrict: true});

var User = mongoose.model('UserSchema', UserSchema, 'users');

export default User;