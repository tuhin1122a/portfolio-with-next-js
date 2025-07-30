import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

console.log("MONGODB_URI:", process.env.MONGODB_URI); // এটা দিয়ে চেক করবে ভেরিয়েবল আসছে কিনা

async function checkConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected successfully!");
    process.exit(0);
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
}
checkConnection();
