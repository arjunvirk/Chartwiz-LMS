import { createHash } from "node:crypto";
import { validateSession, scheduleLiveSession } from "./liveSessionController.js";
import LiveCourse from "../models/LiveCourse.js";
import User from "../models/User.js";

// ================= CREATE LIVE COURSE =================

export const createLiveCourse = async (req, res) => {
  try {
    const { title, description, durationMonths, startDate, classTime, sessionDuration, requestId } = req.body;
    if (!title?.trim() || !description?.trim() || !Number.isInteger(Number(durationMonths)) || Number(durationMonths) < 1) {
      return res.status(400).json({ success: false, message: "Enter a title, description and valid batch duration." });
    }
    if (!/^[a-zA-Z0-9-]{16,80}$/.test(requestId || "")) {
      return res.status(400).json({ success: false, message: "Reopen the batch form and try again." });
    }
    const batchId = createHash("sha256").update(String(req.user.id) + ":" + requestId).digest("hex").slice(0,24);
    let liveCourse = await LiveCourse.findById(batchId);
    const sessionBody = { title: title.trim(), startTime: startDate + "T" + classTime, duration: sessionDuration, requestId };
    if (!liveCourse) {
      validateSession(sessionBody);
      const teacher = await User.findById(req.user.id);
      if (!teacher) return res.status(401).json({ success: false, message: "Please sign in again." });
      liveCourse = await LiveCourse.findOneAndUpdate({ _id: batchId }, { $setOnInsert: {
        title: title.trim(), description: description.trim(), instructor: teacher.name, teacher: teacher._id,
        price: 0, durationMonths: Number(durationMonths), startDate, classTime,
      } }, { upsert: true, new: true, runValidators: true });
    }
    // Reuse the original schedule on retries so a Calendar or network error cannot create a second batch.
    const savedBody = { ...sessionBody, title: liveCourse.title, startTime: new Date(liveCourse.startDate).toISOString().slice(0,10) + "T" + liveCourse.classTime };
    let result, status = 200;
    await scheduleLiveSession({ ...req, params: { id: String(liveCourse._id) }, body: savedBody }, {
      status(code) { status = code; return this; }, json(value) { result = value; return this; },
    });
    if (!result?.success) return res.status(status).json({ ...result, liveCourseId: liveCourse._id, message: "Batch saved, but its first class could not be scheduled. " + (result?.message || "Retry to finish scheduling.") });
    res.status(201).json({ success: true, liveCourse: await LiveCourse.findById(batchId), message: "Batch created and first class scheduled." });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};
// ================= GET ALL LIVE COURSES =================

export const getLiveCourses = async (req, res) => {
  try {
    const liveCourses = await LiveCourse.find().select("-sessions -meetLink -students").sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,

      liveCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= ENROLL LIVE COURSE =================

export const enrollLiveCourse = async (req, res) => {
  try {
    const liveCourse = await LiveCourse.findById(req.params.id);

    if (!liveCourse) {
      return res.status(404).json({
        success: false,

        message: "Live course not found",
      });
    }

    const student = await User.findById(req.user.id);

    // ALREADY ENROLLED

    if (student.liveCourses.includes(liveCourse._id)) {
      return res.status(400).json({
        success: false,

        message: "Already enrolled in this live course",
      });
    }

    // ENROLL

    student.liveCourses.push(liveCourse._id);

    liveCourse.students.push(student._id);

    await student.save();

    await liveCourse.save();

    res.status(200).json({
      success: true,

      message: "Successfully enrolled in live course",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= MY LIVE COURSES =================

export const getMyLiveCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("liveCourses");

    res.status(200).json({
      success: true,

      liveCourses: user.liveCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= TEACHER LIVE COURSES =================

export const getTeacherLiveCourses = async (req, res) => {
  try {
    const liveCourses = await LiveCourse.find({
      teacher: req.user.id,
    });

    res.status(200).json({
      success: true,

      liveCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= DELETE LIVE COURSE =================

export const deleteLiveCourse = async (req, res) => {
  try {
    const liveCourse = await LiveCourse.findById(req.params.id);

    if (!liveCourse) {
      return res.status(404).json({
        success: false,

        message: "Live course not found",
      });
    }

    if (liveCourse.teacher.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,

        message: "Not authorized",
      });
    }

    if (liveCourse.sessions?.some((session) => session.status !== "cancelled" && new Date(session.endTime) > new Date())) {
      return res.status(409).json({ success: false, message: "Cancel upcoming scheduled sessions before deleting this batch." });
    }
    await liveCourse.deleteOne();

    res.status(200).json({
      success: true,

      message: "Live course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const publishLiveSession = async (req, res) => {
  try {
    const course = await LiveCourse.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Live course not found",
      });
    }

    if (course.teacher.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    course.meetLink = req.body.meetLink;
    course.status = "live";

    await course.save();

    res.status(200).json({
      success: true,
      message: "Session published successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


