const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// ===== MIDDLEWARES =====
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ===== ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// ===== HEALTH CHECK =====
app.get("/", (req, res) => res.send("ElyCart Backend Running!"));

module.exports = app;
