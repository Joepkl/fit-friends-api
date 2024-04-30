import mongoose from "mongoose";

// Define schema for the "users" collection
// Schema acts as a blueprint for documents in a collection
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  settings: mongoose.Schema.Types.Mixed,
  showcaseAchievements: mongoose.Schema.Types.Mixed,
  personalGoals: mongoose.Schema.Types.Mixed,
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
  settings: Settings;
  showcaseAchievements: Array<Achievement | null>;
  personalGoals: Array<Achievement | null>;
  weeklyConsistencyStreak: number;
  status: Number;
}

export interface Settings {
  age?: number | null;
  bio?: string | null;
  weeklyGoal: number;
  shareData: boolean;
}

export interface Achievement {
  category: number;
  achievement: number;
  level: number;
}
