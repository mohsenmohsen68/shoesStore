import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URL);
    }
    console.log('connected successfully ... ')
  } catch(err) {
    console.log("connection failed ... ",err);
  }
};

export default connectToDB