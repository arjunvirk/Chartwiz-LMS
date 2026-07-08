import express from "express";

import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* Public Route */

// Anyone can submit a lead from the website popup
router.post("/", createLead);

/* Admin Routes */



// Get all leads
router.get("/", protect, adminOnly, getLeads);

// Get single lead
router.get("/:id", protect, adminOnly, getLeadById);

// Update lead
router.put("/:id", protect, adminOnly, updateLead);

// Delete lead
router.delete("/:id", protect, adminOnly, deleteLead);

export default router;
