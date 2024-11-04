import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    FullName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    profile: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    year: {
        type: String,
    },
    resume_link: {
        type: String,
        default:"null"
    },
    CGPA: {
        type: String,
    },
    primary_lang: {
        type: String,
    },
    skills: [{
        type: String,
    }],
}, { timestamps: true })

const UserModal = mongoose.model('User', UserSchema)

export default UserModal