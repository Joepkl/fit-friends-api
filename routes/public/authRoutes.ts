import express from "express";
import * as userController from "../../controllers/userController";

const router = express.Router();

// router.get("/users", userController.getUsers);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

export default router;
