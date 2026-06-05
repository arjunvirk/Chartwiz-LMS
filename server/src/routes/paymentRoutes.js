import express from "express";

import {
  createOfflinePayment,
  getAllPayments,
  downloadInvoice,
} from "../controllers/paymentController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/offline", protect, adminOnly, createOfflinePayment);

router.get("/", protect, adminOnly, getAllPayments);

router.get("/:id/invoice", downloadInvoice);

export default router;
