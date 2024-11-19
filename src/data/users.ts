import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../schemas/user.entity";
import { v4 as uuidv4 } from "uuid";

dotenv.config(); // Load environment variables

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/database-no-sql";

// Users to Seed
const users = [
  {
    _id: uuidv4(),
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123", // This should be hashed in a real application
  },
  {
    _id: uuidv4(),
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "password1234", // This should be hashed in a real application
  },
  {
    _id: uuidv4(),
    name: "Alice Smith",
    email: "alice.smith@example.com",
    password: "password1235", // This should be hashed in a real application
  },
];

// Seed Users Function
const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear Existing Users
    await User.deleteMany({});
    console.log("Existing users cleared");

    // Insert Users
    await User.insertMany(users);
    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    // Close MongoDB Connection
    mongoose.connection.close();
  }
};

// Run the Seeder
seedUsers();
