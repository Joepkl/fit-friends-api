import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();

/** Constants */
const port = process.env.PORT || 3000;
const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_ADMIN_PASSWORD}@cluster0.f3aro6x.mongodb.net/FitFriendsDB?retryWrites=true&w=majority`;
const secretKey = process.env.SECRET_KEY as string;

/** Routes */
import appRoutes from "./routes/private/appRoutes";
import authRoutes from "./routes/public/authRoutes";

/** Middleware */
app.use(
  cors({
    origin: "*", // Allow requests from any origin (you can specify specific origins here)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specified HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specified headers
  })
);
app.use(express.json()); // Parse JSON request bodies

/** Establish connection to MongoDB */
connect();
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

/** Mount all routes */
app.use("/", appRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/** Export the Express API for deployment with Vercel */
export default app;
