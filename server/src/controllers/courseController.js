import Course from "../models/Course.js";
import User from "../models/User.js";

// ---------------- GET ALL COURSES ----------------

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      success: true,

      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ---------------- GET SINGLE COURSE ----------------

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,

        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,

      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ---------------- GET ENROLLED COURSES ----------------

export const getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("enrolledCourses");

    res.status(200).json({
      success: true,

      courses: user.enrolledCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
// ================= ENROLL COURSE =================

export const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,

        message: "Course not found",
      });
    }

    const user = await User.findById(req.user.id);

    // ALREADY ENROLLED

    if (user.enrolledCourses.includes(course._id)) {
      return res.status(400).json({
        success: false,

        message: "Already enrolled",
      });
    }

    // ENROLL

    user.enrolledCourses.push(course._id);

    // Optional but recommended
    course.students.push(user._id);

    await user.save();

    await course.save();
    res.status(200).json({
      success: true,

      message: "Course enrolled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= CREATE COURSE =================

export const createCourse = async (req, res) => {
  try {
    const { title, description, category, price, thumbnail } = req.body;

    // VALIDATION

    if (!title || !description || !category || !price || !thumbnail) {
      return res.status(400).json({
        success: false,

        message: "Please fill all fields",
      });
    }

    const user = await User.findById(req.user.id);

    // CREATE COURSE

    const course = await Course.create({
      title,

      description,

      category,

      price,

      thumbnail,

      instructor: user.name,

      teacher: user._id,
    });

    res.status(201).json({
      success: true,

      message: "Course created successfully",

      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= TEACHER COURSES =================

export const getTeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      teacher: req.user.id,
    });

    res.status(200).json({
      success: true,

      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= DELETE COURSE =================

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,

        message: "Course not found",
      });
    }

    // OWNER CHECK

    if (course.teacher.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,

        message: "Not authorized",
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,

      message: "Course deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
