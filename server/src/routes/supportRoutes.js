import express from "express";

import { createSupportRequest } from "../controllers/supportController.js";

const router = express.Router();

router.post("/create", createSupportRequest);

export default router;
