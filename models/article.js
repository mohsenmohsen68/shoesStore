const mongoose = require("mongoose")
require('./User')  

const schema = new mongoose.Schema({
    title: {
        type : String,
        require : true,
    },
    articleBody: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: () => Date.now(),
        Immutable: false,
    },
    img:{
        type:String,
        required: true,
    },
    status:{
      type:String,
      required:true,
      default: "notAccepted"
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})


const articlesModel = mongoose.models.Article || mongoose.model("Article",schema)
export default articlesModel