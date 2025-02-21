
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: 'user'
    },
    img: {
        type: String,
        default: ''
    },
    refreshToken: {
        type: String,
    }
})

const userModel = mongoose.models.User || mongoose.model('User', schema)

export default userModel