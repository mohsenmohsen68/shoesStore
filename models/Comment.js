const mongoose = require('mongoose');
require('./Product')

const schema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
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
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }
})

const commentModel = mongoose.models.Comment || mongoose.model('Comment', schema)

export default commentModel 