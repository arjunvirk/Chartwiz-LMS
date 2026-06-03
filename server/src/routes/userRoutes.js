import express from "express";

import {
  registerUser,
  loginUser,
  googleLogin,
  getMe,
  logoutUser,
  verifyEmail,
  updateUserProfile,
  checkVerificationStatus,
} from "../controllers/userController.js";

import { protect } from "../middlewares/authMiddleware.js";

import { authLimiter } from "../middlewares/rateLimitMiddleware.js";

const router = express.Router();

// ---------------- MANUAL AUTH ----------------

// Register User
router.post("/register", authLimiter, registerUser);

// Login User
router.post("/login", authLimiter, loginUser);

// ---------------- GOOGLE AUTH ----------------

// Google Login
router.post("/google", authLimiter, googleLogin);

// ---------------- USER ROUTES ----------------

// Current Logged In User
router.get("/me", protect, getMe);

// Update User
router.put("/profile", protect, updateUserProfile);

// ---------------- LOGOUT ----------------

// Logout User
router.get("/logout", logoutUser);

router.get("/verify/:token", verifyEmail);

router.get("/check-verification", checkVerificationStatus);

export default router;
