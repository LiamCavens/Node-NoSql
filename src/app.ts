import express from "express";
import connectDB from "./config/db";

const app = express();

app.use(express.json());

connectDB();

app.get("/api/products", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products/:id", (req, res) => {
  res.send("Product found...");
});

app.get("/api/profile/cart", (req, res) => {
  res.send("API is running...");
});

app.put("/api/profile/cart", (req, res) => {
  res.send("Cart updated...");
});

app.delete("/api/profile/cart", (req, res) => {
  res.send("Cart cleared...");
});

app.post("/api/profile/cart/checkout", (req, res) => {
  res.send("Checkout completed...");
});

export default app;
