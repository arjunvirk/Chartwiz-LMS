import express from "express";

import {
  getCourses,
  getCourseById,
  getMyCourses,
  enrollCourse,
  createCourse,
  getTeacherCourses,
  deleteCourse,
} from "../controllers/courseController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { teacherOrAdmin } from "../middlewares/teacherOrAdminMiddleware.js";
const router = express.Router();

// PUBLIC

router.get("/", getCourses);

router.get("/:id", getCourseById);

// PRIVATE

router.get("/student/my-courses", protect, getMyCourses);

router.post("/:id/enroll", protect, enrollCourse);

// TEACHER

router.post("/teacher/create", protect, teacherOrAdmin, createCourse);

router.get("/teacher/my-courses", protect, teacherOrAdmin, getTeacherCourses);

router.delete("/teacher/:id", protect, teacherOrAdmin, deleteCourse);

export default router;
