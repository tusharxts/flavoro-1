import mongoose from "mongoose";

const connectDb = async () => {
  const connection = await mongoose.connect("mongodb+srv://odin06190:odin06190@cluster0.gvggq.mongodb.net/flavoro?retryWrites=true&w=majority&appName=Cluster0");
  if (connection) {
    console.log("Connected to MongoDB");
  }
};

export default connectDb ;
