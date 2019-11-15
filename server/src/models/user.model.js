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
    schedules: [new Schema({
        label: { type: String },
        footnotes: { type: String },
        sections: [new Schema({
            section_id: { type: String },
            professor: { type: String },
            units: { type: Number },
            description: { type: String },
            prereqs: [String],
            final: {
                day: { type: String },
                start_time: Number,
                end_time: Number,
                building: { type: String },
                room_number: { type: Number }
            },
            meetings: [new Schema({
                type: { type: String },
                day: { type: String },
                start_time: Number,
                end_time: Number,
                building: { type: String },
                room_number: { type: Number }
            })]
        })]
    })]
});

var User = mongoose.model('UserSchema', UserSchema, 'users');

export default User;