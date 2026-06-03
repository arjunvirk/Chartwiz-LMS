import express from "express";

import {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAdminStats,
  createUserByAdmin,
  deletePendingUser,
  getAdminAnalytics,
} from "../controllers/adminController.js";

import { protect } from "../middlewares/authMiddleware.js";

import { adminOnly } from "../middlewares/adminMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// ================= ADMIN STATS =================

router.get("/stats", protect, adminOnly, getAdminStats);

// ================= GET USERS =================

router.get("/users", protect, adminOnly, getAllUsers);

// ================= DELETE USER =================

router.delete("/users/:id", protect, adminOnly, deleteUser);

// ================= UPDATE ROLE =================

router.put("/users/:id/role", protect, adminOnly, updateUserRole);

router.post("/create-user", protect, adminOnly, createUserByAdmin);

router.delete("/pending-users/:id", protect, adminOnly, deletePendingUser);

router.get("/analytics", protect, adminOnly, getAdminAnalytics);

export default router;
