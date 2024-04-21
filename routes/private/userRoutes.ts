import express from "express";
import { getUserProfile } from "../../controllers/userController";
const router = express.Router();

// Example route to get user profile
router.get("/:userId", async (req, res) => {
  // try {
  //   const userId = req.params.userId;
  //   const userProfile = await getUserProfile(userId);
  //   res.json(userProfile);
  // } catch (error) {
  //   res.status(500).json({ message: 'Internal Server Error' });
  // }

  res.send("Accessed profile route");
});

export default router;
