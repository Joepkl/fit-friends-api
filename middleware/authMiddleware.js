// Middleware functions are functions that have access to the request object (req), the response object (res), 
// and the next function in the application's request-response cycle. They can modify the request and response objects, 
// end the request-response cycle, or call the next middleware in the stack.

// Usage: Middleware functions are used to perform tasks such as logging, authentication, input validation, and 
// other pre-processing tasks before the request reaches the route handler or controller.


const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey'; // Replace with a secure secret key

function verifyToken(req, res, next) {
  console.log('Verifying...');
  console.log('Acces permitted');
  next();


  // const token = req.headers['authorization'];

  // if (!token) {
  //   return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  // }

  // jwt.verify(token, secretKey, (err, decoded) => {
  //   if (err) {
  //     return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  //   }

  //   // Use decoded user information to check against the simulated database
  //   if (isValidUser(decoded)) {
  //     req.user = decoded;
  //     next();
  //   } else {
  //     res.status(401).json({ message: 'Unauthorized: User not found' });
  //   }
  // });
};

function isValidUser(decoded) {
  // Replace this with actual database validation logic
  // Check if the user exists in the simulated database based on the decoded information
  // Return true if valid, false otherwise
  return users.some(user => user.id === decoded.id && user.username === decoded.username);
};

module.exports = verifyToken;
