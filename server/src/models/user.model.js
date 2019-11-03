import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: { type: String, match: /^[A-Za-z]+[0-9]*@ucsd\.edu$/ },
    password: { type: String },
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
                time: [String],
                building: { type: String },
                room_number: { type: Number }
            },
            meetings: [new Schema({
                type: { type: String },
                day: { type: String },
                time: [String],
                building: { type: String },
                room_number: { type: Number }
            })]
        })]
    })]
});

var User = mongoose.model('UserSchema', UserSchema, 'users');

export default User;