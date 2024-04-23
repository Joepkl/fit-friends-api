import express from "express";
import * as userController from "../../controllers/userController";
import verifyAccessToken from "../../middleware/verifyAccessToken";

const router = express.Router();

router.get("/protected", verifyAccessToken, userController.protectedRoute);

router.get("/settings", verifyAccessToken, userController.saveAccountSettings);

export default router;
