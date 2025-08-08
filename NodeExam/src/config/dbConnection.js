//this is database connection file
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.url;
const dbConnection = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}
export default dbConnection;