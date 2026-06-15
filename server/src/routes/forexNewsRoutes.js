import express from "express";

import {
  getForexNews,
  getSingleNews,
} from "../controllers/forexNewsController.js";

const router = express.Router();

// Get all news
router.get("/", getForexNews);

// Get single news
router.get("/:id", getSingleNews);

export default router;
