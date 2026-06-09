import express from "express";

import {
  createWebinar,
  getWebinar,
  getWebinars,
  deleteWebinar,
} from "../controllers/webinarController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createWebinar);

router.get("/", protect, adminOnly, getWebinars);

router.get("/:id", protect, adminOnly, getWebinar);

router.delete("/:id", protect, adminOnly, deleteWebinar);

export default router;
