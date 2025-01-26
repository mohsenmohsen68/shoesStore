const mongoose = require("mongoose");
require("./User");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  requestBody: {
    type: String,
    required: true
  },
  response: {
    type: String
  },
  isChecked:{
    type:Boolean,
    required:true,
    default: false,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
});

const requestModel =
  mongoose.models.Request || mongoose.model("Request", schema);

export default requestModel;
