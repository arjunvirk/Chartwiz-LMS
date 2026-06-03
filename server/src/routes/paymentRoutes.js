import express from "express";

import {
  createOfflinePayment,
  getAllPayments,
} from "../controllers/paymentController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/offline", protect, adminOnly, createOfflinePayment);

router.get("/", protect, adminOnly, getAllPayments);

export default router;
