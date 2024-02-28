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

// Connect to the DB
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
connect();

async function insertTestUsers() {
  await UserModel.insertMany([
    { username: "john_doe", password: "123", email: "john.doe@example.com" },
    {
      username: "jane_smith",
      password: "123",
      email: "jane.smith@example.com",
    },
  ]);
  console.log('Data inserted into "users" collection');
}

app.get("/", (req, res) => {
  res.send("Hello World!");
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

// Export the Express API
module.exports = app;

/** Routes */
// const userRoutes = require('./routes/user/userRoutes');
// const authRoutes = require('./routes/auth/authRoutes');

/** Middleware */
// const authMiddleware = require('./middleware/authMiddleware');

// app.listen(port, () => {
//   console.log(`Server started on port ${port}!`);
// });

// Standard route DELETE
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// Use middleware for private routes
// app.use('/api/profile', authMiddleware);

// Mount routes
// app.use('/api/auth', authRoutes);
// app.use('/api/profile', userRoutes);

// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// // Show app port in console
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}!`);
// });

// // Serve static files from /public (e.g. HTML, CSS, JS)
// // app.use(express.static(path.resolve('public')));

// /** Example authentication */
// const jwt = require('jsonwebtoken');
// const secretKey = 'yourSecretKey'; // Replace with a secure secret key

// // Simulated database of users
// const users = [
//   { id: 1, username: 'john_doe', password: 'password123' },
//   // Add more user records as needed
// ];

// // Middleware to verify the token
// const verifyToken = (req, res, next) => {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized: Token not provided' });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//     }

//     // Use decoded user information to check against the simulated database
//     if (isValidUser(decoded)) {
//       req.user = decoded;
//       next();
//     } else {
//       res.status(401).json({ message: 'Unauthorized: User not found' });
//     }
//   });
// };

// // Route accessible without authentication
// app.get('/public', (req, res) => {
//   res.json({ message: 'Public route, no authentication required' });
// });

// // Route requiring authentication
// app.get('/api/private', verifyToken, (req, res) => {
//   res.json({ message: 'Private route, authentication successful', user: req.user });
// });

// // Route to obtain a token (simulate login)
// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;

//   // Simulated authentication logic - Replace with actual database validation
//   const user = users.find(u => u.username === username && u.password === password);

//   if (user) {
//     const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

//     return res.json({ message: 'Login successful', token });
//   }

//   res.status(401).json({ message: 'Invalid credentials' });
// });

// // Simulated function to validate user existence against the simulated database
// function isValidUser(decoded) {
//   // Check if the user exists in the simulated database based on the decoded information
//   return users.some(user => user.id === decoded.id && user.username === decoded.username);
// }

/** Example POST request connected to DB */

// const express = require('express');
// const { MongoClient } = require('mongodb');

// const app = express();
// const PORT = 3000;
// const mongoURI = 'mongodb://localhost:27017'; // Change this to your MongoDB URI

// app.use(express.json()); // Middleware to parse JSON requests

// app.post('/api/users', async (req, res) => {
//   try {
//     // Connect to the MongoDB database
//     const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//     await client.connect();

//     // Access the database and collection
//     const database = client.db('mydatabase'); // Replace 'mydatabase' with your database name
//     const collection = database.collection('users');

//     // Insert data into the collection
//     const result = await collection.insertOne(req.body);

//     // Close the database connection
//     await client.close();

//     // Respond with success
//     res.status(201).json({ message: 'User added successfully', insertedId: result.insertedId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
