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
      settings: {},
      showcaseAchievements: [null, null, null],
      personalGoals: [null, null, null],
      weeklyFrequency: 0,
      weeklyConsistencyStreak: 0,
      status: 0,
    });
    // Save the user to the database
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
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

export async function saveAccountSettings(req: Request, res: Response) {
  try {
    // Find the user by username
    const user = await UserModel.findOneAndUpdate(
      { username: req.body.username },
      {
        $set: {
          "settings.age": req.body.age,
          "settings.bio": req.body.bio,
          "settings.weeklyGoal": req.body.weeklyGoal,
          "settings.currentGym": req.body.currentGym,
          "settings.shareData": req.body.shareData,
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ message: "Account settings saved successfully.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error while saving account settings. ${error}` });
  }
}

export async function getUserProfile(req: Request, res: Response) {
  try {
    const username = req.params.username;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while fetching user profile." });
  }
}

export async function deleteAccount(req: Request, res: Response) {
  try {
    const username = req.params.username;
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete the user
    await UserModel.deleteOne({ username: username });

    res.status(200).json({ message: "Account deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while deleting account." });
  }
}

// export async function setAchievementShowcase(req: Request, res: Response) {
//   try {
//     const username = req.body.username;
//     const newAchievement = req.body.achievement;

//     const user = await UserModel.findOne({ username: username });

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     const openSlots = user.showcaseAchievements.filter((a: any) => a === null).length;

//     // Check if not exceeding max length of showcase achievements
//     if (openSlots === 0) {
//       return res.status(400).json({ message: "Showcase already contains three achievements." });
//     }

//     // Add the new achievement to the showcase
//     user.showcaseAchievements.push(newAchievement);

//     // Save the updated user document
//     await user.save();

//     res.status(200).json({ message: "Showcase achievement added successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error while setting showcase achievement." });
//   }
// }

// export async function setAchievementShowcase(req: Request, res: Response) {
//   try {
//     const username = req.body.username;
//     const newAchievement = req.body.achievement;

//     const updatedUser = await UserModel.findOneAndUpdate(
//       { username: username },
//       { $push: { showcaseAchievements: newAchievement } },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     res.status(200).json({ message: "Showcase achievement added successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error while setting showcase achievement." });
//   }
// }

export async function setAchievementShowcase(req: Request, res: Response) {
  try {
    const username = req.body.username;
    const newAchievement = req.body.achievement;

    const user = await UserModel.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the first free slot in showcaseAchievements array
    const freeSlotIndex = user.showcaseAchievements.findIndex((achievement: any) => achievement === null);

    if (freeSlotIndex === -1) {
      return res.status(400).json({ message: "Showcase already contains three achievements." });
    }

    // Add the new achievement to the first available slot
    user.showcaseAchievements[freeSlotIndex] = newAchievement;

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Showcase achievement added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while setting showcase achievement." });
  }
}
