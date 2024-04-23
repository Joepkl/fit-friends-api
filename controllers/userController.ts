import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "./../models/userModel";

const secretKey = process.env.SECRET_KEY as string;

export async function registerUser(req: Request, res: Response) {
  try {
    // Check if username or email already exist
    const existingUser = await UserModel.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "The username or email you provided is already registered. Please use a different one." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Create a new user document
    const user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      settings: null,
    });
    // Save the user to the database
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error registering user: ${error}` });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    // Find the user by username
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "This username doesn't belong to any registered user." });
    }
    // Verify the password
    const passwordMatch = user.password && (await bcrypt.compare(req.body.password, user.password));
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }
    // Generate JWT
    const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: "1h" });
    // Return user profile and JWT
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while logging in." });
  }
}

export function protectedRoute(req: Request, res: Response) {
  res.send("Protected route accessed.");
}
