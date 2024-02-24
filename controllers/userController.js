// Controllers are responsible for handling the application logic related to a specific route or a set of 
// related routes. They receive the input from the incoming HTTP request, process it, interact with the models 
// or services to retrieve or manipulate data, and then send an appropriate response back to the client.

const User = require('../models/userModel');

// Example function to get user profile
async function getUserProfile(userId) {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    throw error;
  }
}

// Export the functions or objects you want to make available
module.exports = {
  getUserProfile,
};