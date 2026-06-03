import LiveCourse from "../models/LiveCourse.js";
import User from "../models/User.js";

// ================= CREATE LIVE COURSE =================

export const createLiveCourse = async (req, res) => {
  try {
    const { title, description, price, durationMonths, startDate, classTime } =
      req.body;

    // VALIDATION

    if (
      !title ||
      !description ||
      !price ||
      !durationMonths ||
      !startDate ||
      !classTime
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const teacher = await User.findById(req.user.id);

    const liveCourse = await LiveCourse.create({
      title,
      description,
      instructor: teacher.name,
      teacher: teacher._id,
      price,
      durationMonths,
      startDate,
      classTime,
    });

    res.status(201).json({
      success: true,

      message: "Live course created successfully",

      liveCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= GET ALL LIVE COURSES =================

export const getLiveCourses = async (req, res) => {
  try {
    const liveCourses = await LiveCourse.find().sort({
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
