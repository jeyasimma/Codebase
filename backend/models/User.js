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
    dept:{
        type:String,
    },
    year: {
        type: String,
    },
    gender: {
        type: String,
    },
    status: {
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
    phone:{
        type: Number ,
    },
    whatsapp:{
        type: Number ,
    },
    skills: [{
        type: String,
    }],
}, { timestamps: true })

const UserModal = mongoose.model('User', UserSchema)

export default UserModal