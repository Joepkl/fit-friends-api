import express from "express";
import * as userController from "../../controllers/userController";
import verifyAccessToken from "../../middleware/verifyAccessToken";

const router = express.Router();

/** User */
router.get("/user/:username", verifyAccessToken, userController.getUserProfile);
router.delete("/user/:username", verifyAccessToken, userController.deleteAccount);

/** Settings */
router.post("/settings", verifyAccessToken, userController.saveAccountSettings);
router.post("/settings/showcase", verifyAccessToken, userController.setAchievementShowcase);
router.delete("/settings/showcase", verifyAccessToken, userController.deleteAchievementShowcase);
router.post("/settings/goals", verifyAccessToken, userController.setPersonalGoals);
router.delete("/settings/goals", verifyAccessToken, userController.deletePersonalGoal);

export default router;
