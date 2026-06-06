import express from "express";

import { createWebinar } from "../controllers/webinarController.js";

const router = express.Router();

router.post("/", createWebinar);

export default router;
