import mongoose from "mongoose"
require('./comments')
const schema = new mongoose.Schema({
  name:{
    type: String,
    required:true,
  },
price:{
    type: Number,
    required: true,
},
shortDesc:{
    type: String,
    required: true,
},
longDesc:{
    type: String,
    required: true,
},
weight:{
    type:Number,
    required:true,
},
suitableFor:{
    type:String,
    required:true,
},
score:{
    type:Number,
    required:true,
    default:5,
},
comments:{
    type:[
        {
        type: mongoose.Types.ObjectId,
        ref:'Comment'
    },
],
},
tags:{
    type:[String],
    required:true,
}

})


const productModel =mongoose.models.Product || mongoose.model('Product',schema)

export default productModel