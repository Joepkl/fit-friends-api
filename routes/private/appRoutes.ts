import express from "express";
import * as userController from "../../controllers/userController";
import verifyAccessToken from "../../middleware/verifyAccessToken";

const router = express.Router();

/** User */
router.get("/user/:username", verifyAccessToken, userController.getUserProfile);
router.delete("/user/:username", verifyAccessToken, userController.deleteAccount);

/** Settings */
router.post("settings/showcase", verifyAccessToken, userController.setAchievementShowcase);
router.post("/settings", verifyAccessToken, userController.saveAccountSettings);

export default router;
