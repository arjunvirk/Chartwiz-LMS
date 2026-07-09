import express from "express";

import {
  createAdmission,
  getAdmissions,
  getAdmissionById,
  updateAdmission,
  approveAdmission,
  deleteAdmission,
} from "../controllers/admissionController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// ================= PUBLIC =================

router.post("/", createAdmission);

// ================= ADMIN =================

router.get("/", protect, adminOnly, getAdmissions);

router.get("/:id", protect, adminOnly, getAdmissionById);

router.put("/:id", protect, adminOnly, updateAdmission);

router.put("/:id/approve", protect, adminOnly, approveAdmission);

router.delete("/:id", protect, adminOnly, deleteAdmission);

export default router;
