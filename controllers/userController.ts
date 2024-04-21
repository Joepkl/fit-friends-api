// Controllers are responsible for handling the application logic related to a specific route or a set of
// related routes. They receive the input from the incoming HTTP request, process it, interact with the models
// or services to retrieve or manipulate data, and then send an appropriate response back to the client.

import { UserModel } from "../models/userModel";

// Example function to get user profile
async function getUserProfile(userId: string) {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (error) {
    console.error("Error fetching user profile:", (error as Error).message);
    throw error;
  }
}

export { getUserProfile };
