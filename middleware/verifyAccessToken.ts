// Middleware functions are functions that have access to the request object (req), the response object (res),
// and the next function in the application's request-response cycle. They can modify the request and response objects,
// end the request-response cycle, or call the next middleware in the stack.

// Usage: Middleware functions are used to perform tasks such as logging, authentication, input validation, and
// other pre-processing tasks before the request reaches the route handler or controller.

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
const secretKey = process.env.SECRET_KEY as string;

export interface CustomRequest extends Request {
  user?: User;
}

function verifyAccessToken(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "Error while verifying token" });
    }
    req.user = decoded as User;
    next();
  });
}

export default verifyAccessToken;
