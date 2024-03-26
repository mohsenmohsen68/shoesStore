import mongoose from "mongoose";
require('./products')

const schema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    commentBody:{
        type:String,
        required:true,
    },
    score:{
        type:Number,
        required:true,
    },
    date:{
        type: Date,
        default:()=>Date.now(),
        Immutable:true,
    },
    productID:{
        type: mongoose.Types.ObjectId,
        ref:'Product',
    }
})

const commentModel =mongoose.models.Comment || mongoose.model('Comment', schema )

export default commentModel 