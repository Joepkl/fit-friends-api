// Middleware functions are functions that have access to the request object (req), the response object (res),
// and the next function in the application's request-response cycle. They can modify the request and response objects,
// end the request-response cycle, or call the next middleware in the stack.

// Usage: Middleware functions are used to perform tasks such as logging, authentication, input validation, and
// other pre-processing tasks before the request reaches the route handler or controller.

module.exports = verifyAccessToken;
