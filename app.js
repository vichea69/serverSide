const express = require("express");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
// Initialize app
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors());

// Serve static files (images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// Root Route (Default)
app.get("/", (req, res) => {
    res.send("Hey Bro API is running...");
});

module.exports = app;