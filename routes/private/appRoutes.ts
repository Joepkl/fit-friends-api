import express from "express";
import * as userController from "../../controllers/userController";
import verifyAccessToken from "../../middleware/verifyAccessToken";

const router = express.Router();

router.get("/user/:username", userController.getUserProfile);
router.post("/settings", verifyAccessToken, userController.saveAccountSettings);

export default router;
