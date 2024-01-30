const mongoose = require("mongoose");

const connectDb = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  if (connection) {
    console.log("Connected to MongoDB");
  }
};

module.exports = { connectDb };
