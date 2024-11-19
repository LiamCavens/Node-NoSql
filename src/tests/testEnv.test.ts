import dotenv from "dotenv";

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

// Check if MONGO_URI exists
if (!process.env.MONGO_URI) {
  console.error("ERROR: MONGO_URI is not defined in the .env file");
} else {
  console.log("SUCCESS: MONGO_URI is loaded from the .env file");
}
