const mongoose = require('mongoose');
require('./User')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    company: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required:true
    },
    requestBody: {
        type: String,
        required: true,
    },
    response:{
        type:String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const requestModel = mongoose.models.Request || mongoose.model('Request', schema)

export default requestModel; 