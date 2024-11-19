import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import {
  deleteAllProducts,
} from "../repositories/product.repository";
import Product from "../schemas/product.entity";

dotenv.config(); // Load environment variables

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/database-no-sql";

// Products to Seed
const products = [
  {
    _id: uuidv4(),
    title: "Book",
    description: "A very interesting book",
    price: 100,
  },
  {
    _id: uuidv4(),
    title: "Laptop",
    description: "A powerful laptop for developers",
    price: 1500,
  },
  {
    _id: uuidv4(),
    title: "Phone",
    description: "A smartphone with great camera features",
    price: 800,
  },
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear Existing Products
    await deleteAllProducts();
    console.log("Existing products cleared");

    // Insert Products
    const seededProducts = await Product.insertMany(products);
    console.log("Products seeded successfully:", seededProducts);
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    // Close MongoDB Connection
    mongoose.connection.close();
  }
};

seedProducts();