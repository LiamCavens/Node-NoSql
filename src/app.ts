import express from "express";
import connectDB from "./config/db";
import { authenticate } from "./middleware/auth.middleware";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();

app.use(express.json());

// Connect to the database
connectDB();

// Use routes with authentication
app.use("/api/products", authenticate, productRoutes);
app.use("/api/profile/cart", authenticate, cartRoutes);
app.use("/api/orders", authenticate, orderRoutes);

export default app;
