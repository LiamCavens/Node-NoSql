import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/test";

const testConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB is running and connected successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("MongoDB is not running or connection failed:", error);
  }
};

testConnection();
