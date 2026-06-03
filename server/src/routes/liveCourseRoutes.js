import express from "express";

import {
  createLiveCourse,
  getLiveCourses,
  enrollLiveCourse,
  getMyLiveCourses,
  getTeacherLiveCourses,
  deleteLiveCourse,
  publishLiveSession,
} from "../controllers/liveCourseController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { teacherOrAdmin } from "../middlewares/teacherOrAdminMiddleware.js";

const router = express.Router();

// ================= PUBLIC =================

// GET ALL LIVE COURSES

router.get("/", getLiveCourses);

// ================= STUDENT =================

// ENROLL LIVE COURSE

router.post("/:id/enroll", protect, enrollLiveCourse);

// MY LIVE COURSES

router.get("/student/my-live-courses", protect, getMyLiveCourses);

// ================= TEACHER =================

// CREATE LIVE COURSE

router.post("/", protect, teacherOrAdmin, createLiveCourse);

// TEACHER LIVE COURSES

router.get(
  "/teacher/my-live-courses",
  protect,
  teacherOrAdmin,
  getTeacherLiveCourses,
);

// DELETE LIVE COURSE

router.delete("/:id", protect, teacherOrAdmin, deleteLiveCourse);

router.put("/:id/publish", protect, teacherOrAdmin, publishLiveSession);

export default router;
