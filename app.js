const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const uri =
  "mongodb+srv://joepklaassen9:6wsTVr93QUuDrKHs@cluster0.f3aro6x.mongodb.net/MotivationMentorDB?retryWrites=true&w=majority";

/** Models */
const UserModel = require("./models/userModel.js");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/** Connect to MongoDB */
connect();
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
    test = true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    test = false;
  }
}

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
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
});

/** Export the Express API for deployment with Vercel */
module.exports = app;
