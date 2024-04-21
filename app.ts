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

/** Models */
import { UserModel } from "./models/userModel";

/** Middleware */
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
import verifyAccessToken from "./middleware/verifyAccessToken";

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
