import { Router } from "express";
import * as authController from "../controllers/user-controller.js";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
const router = Router();

router.post("/register", authController.register);
router.post("/verify", authController.verify);
router.post("/login", authController.login);
router.post("/logout", isAuthenticated ,authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-otp/:email", authController.verifyOtp);
router.post("/change-password/:email", authController.changePassword);

export default router;
