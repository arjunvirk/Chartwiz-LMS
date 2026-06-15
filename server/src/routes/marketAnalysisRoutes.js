import express from "express";

import {
  createAnalysis,
  getAllAnalyses,
  getSingleAnalysis,
  updateAnalysis,
  deleteAnalysis,
} from "../controllers/marketAnalysisController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { teacherOrAdmin } from "../middlewares/teacherOrAdminMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllAnalyses);
router.get("/:id", getSingleAnalysis);

// Teacher or Admin
router.post("/", protect, teacherOrAdmin, createAnalysis);
router.put("/:id", protect, teacherOrAdmin, updateAnalysis);
router.delete("/:id", protect, teacherOrAdmin, deleteAnalysis);

export default router;
