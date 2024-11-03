// server.js
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import grid from "gridfs-stream";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

// Initialize dotenv to load environment variables
dotenv.config();

// Server configuration
const app = express();
const PORT = process.env.PORT || 6001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware setup
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend requests from React
}));

// Serve static files for images
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.error("Database connection error:", error));

// GridFS setup for file storage
let gfs;
mongoose.connection.once("open", () => {
  gfs = grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("uploads"); // Set the GridFS collection name
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/assets"),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// Routes for handling requests with file uploads
app.post("/auth/register", upload.single("picture"), register); // Registration with profile picture upload
app.post("/posts", verifyToken, upload.single("picture"), createPost); // Create post with picture upload

// Set up API routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
