require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const contactRoutes = require("./routes/contacts");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, health checks)
      if (!origin) return callback(null, true);
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:4173",
        process.env.CLIENT_URL,
      ].filter(Boolean);
      
      if (allowedOrigins.includes(origin) || process.env.CLIENT_URL === "*") {
        callback(null, true);
      } else {
        callback(null, true); // Alternatively allow all origins if not explicitly restricted
      }
    },
    methods: ["GET", "POST"],
  })
);

// ── Routes ─────────────────────────────────────────────────
app.use("/api/contacts", contactRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── MongoDB Connection & Server Start ──────────────────────
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "❌  MONGODB_URI is not set. Copy server/.env.example to server/.env and add your connection string."
  );
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅  Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀  Stride API running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌  MongoDB connection failed:", err.message);
    process.exit(1);
  });
