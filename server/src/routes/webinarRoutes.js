import express from "express";

import {
  createWebinar,
  getWebinar,
  getWebinars,
} from "../controllers/webinarController.js";

const router = express.Router();

router.post("/", createWebinar);

router.get("/", getWebinars);

router.get("/:id", getWebinar);

export default router;
