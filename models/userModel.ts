import mongoose from "mongoose";

// Define schema for the "users" collection
// Schema acts as a blueprint for documents in a collection
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  points: Number,
  settings: mongoose.Schema.Types.Mixed,
  showcaseAchievements: mongoose.Schema.Types.Mixed,
  personalGoals: mongoose.Schema.Types.Mixed,
  weeklyFrequency: Number,
  weeklyConsistencyStreak: Number,
  status: Number,
});

// Create a model based on the schema
// This represents a collection in the MongoDB database and provides an interface for querying and manipulating documents within that collection.
export const UserModel = mongoose.model("User", userSchema);

export interface User {
  id: string;
  username: string;
  email: string;
  points: Number;
  settings: Settings;
  showcaseAchievements: Array<Achievement | null>;
  personalGoals: Array<Achievement | null>;
  weeklyFrequency: 0;
  weeklyConsistencyStreak: number;
  status: Number;
}

export interface Settings {
  age?: number | null;
  bio?: string | null;
  weeklyGoal: number;
  currentGym: Gym;
  shareData: boolean;
}

export interface Achievement {
  category: number;
  id: number;
  level: number;
  maxLevel: number;
}

export interface Gym {
  id: number;
  name: string;
}
