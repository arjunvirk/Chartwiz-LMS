import express from "express";

import {
  createWebinar,
  getWebinar,
  getWebinars,
  deleteWebinar,
} from "../controllers/webinarController.js";

const router = express.Router();

router.post("/", createWebinar);

router.get("/", getWebinars);

router.get("/:id", getWebinar);

router.delete("/:id", deleteWebinar);

export default router;
