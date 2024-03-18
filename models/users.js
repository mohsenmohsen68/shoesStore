import mongoose from "mongoose";

const schema = mongoose.Schema({
    username:{
        type:String,
        required: true,
    },
    phoneNumber:{
        type:String,
        required: true, 
    },
    email:{
        type:String,
        required: false,
    },
    password:{
        type:String,
        required: false,
    },  
    role:{
        type:String,
        default:'user'
    },
    refreshToken:{
        type:String,
    }
})

const model = 