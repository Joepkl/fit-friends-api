const mongoose = require('mongoose');

// Define schema for the "users" collection
// Schema acts as a blueprint for documents in a collection
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

// Create a model based on the schema
// This represents a collection in the MongoDB database and provides an interface for querying and manipulating documents within that collection.
const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;
