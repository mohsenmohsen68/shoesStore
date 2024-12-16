const mongoose = require('mongoose');
require('./Comment')
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    shortDesc: {
        type: String,
        required: true,
    },
    longDesc: {
        type: String,
        required: true,
    },
    size: {
        type: [Number],
        required: true,
    },
    color: {
        type: [String],
        required: true,
    },
    shoesmodel: {
        type: String,
        required: true,
    },
    suitableFor: {
        type: String,
        required: true,
    },
    wholeScore: {
        type: Number,
        required: true,
        default: 5,
    },
    count: {
        type: Number,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    comments: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "Comment"
        }],
    },

})


const productModel = mongoose.models.Product || mongoose.model('Product', schema)

export default productModel