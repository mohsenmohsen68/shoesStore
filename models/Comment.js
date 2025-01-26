const mongoose = require('mongoose');
require('./Product')

const schema = new mongoose.Schema({
    
    commentBody: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 5,
    },
    date: {
        type: Date,
        default: () => Date.now(),
        Immutable: false,
    },
    status:{
      type:String,
      required:true,
      default: "notAccepted"
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const commentModel = mongoose.models.Comment || mongoose.model('Comment', schema)

export default commentModel 