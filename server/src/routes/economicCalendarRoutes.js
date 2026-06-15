import express from "express";

import {
  getTodayEvents,
  getUpcomingEvents,
  getSingleEvent,
} from "../controllers/economicCalendarController.js";

const router = express.Router();

// Today's events
router.get("/today", getTodayEvents);

// Upcoming events
router.get("/upcoming", getUpcomingEvents);

// Single event
router.get("/:id", getSingleEvent);

export default router;
