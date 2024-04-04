require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.PORT || 3000;
const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_ADMIN_PASSWORD}@cluster0.f3aro6x.mongodb.net/FitFriendsDB?retryWrites=true&w=majority`;
const secretKey = process.env.SECRET_KEY;

/** Models */
const UserModel = require("./models/userModel.js");

/** Middleware */
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
const verifyAccessToken = require("./middleware/verifyAccessToken");

// Use middleware for private routes
// app.use('/api/profile', authMiddleware);

// Mount routes
// app.use('/api/auth', authRoutes);
// app.use('/api/profile', userRoutes);

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/users", (req, res) => {
  UserModel.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Register User
app.post("/register", async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Create a new user document
    const user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    // Save the user to the database
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: `Error registering user: ${error}` });
  }
});

// Login User
app.post("/login", async (req, res) => {
  try {
    // Find the user by email
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Verify the password
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Generate JWT
    const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Protect Route Example
app.get("/protected", verifyAccessToken, (req, res) => {
  res.send("Protected route accessed");
});

/** Export the Express API for deployment with Vercel */
module.exports = app;
