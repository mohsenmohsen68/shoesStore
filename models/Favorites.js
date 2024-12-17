const mongoose = require("mongoose")
require('./Product')
require('./User')

const schema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"

    }
},
    {
        timestamps: true,
    })


const favoriteModel = mongoose.models.Favorite || mongoose.model("Favorite", schema)
export default favoriteModel