import Admission from "../models/Admission.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.js";
import Course from "../models/Course.js";

// ================= CREATE ADMISSION =================

export const createAdmission = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      course,
      city,
      occupation,
      experience,
      preferredBatch,
      message,
    } = req.body;

    if (!name || !email || !phone || !course || !city) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const admission = await Admission.create({
      name,
      email,
      phone,
      course,
      city,
      occupation,
      experience,
      preferredBatch,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Admission application submitted successfully.",
      admission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL ADMISSIONS =================

export const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: admissions.length,
      admissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE ADMISSION =================

export const getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id)
      .populate("approvedBy", "name email")
      .populate("studentId", "name email");

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    res.status(200).json({
      success: true,
      admission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE ADMISSION =================

export const updateAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    const previousStatus = admission.status;

    admission.status = req.body.status || admission.status;

    admission.paymentStatus = req.body.paymentStatus || admission.paymentStatus;

    admission.batch = req.body.batch ?? admission.batch;

    admission.mentor = req.body.mentor ?? admission.mentor;

    admission.notes = req.body.notes ?? admission.notes;

    if (req.body.status === "Approved" && previousStatus !== "Approved") {
      admission.approvedAt = new Date();
      admission.approvedBy = req.user.id;
    }

    if (req.body.status === "Rejected" && previousStatus !== "Rejected") {
      admission.rejectedAt = new Date();
    }
    const updatedAdmission = await admission.save();

    res.status(200).json({
      success: true,
      message: "Admission updated successfully",
      admission: updatedAdmission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= APPROVE ADMISSION =================

export const approveAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    // Already approved

    if (admission.studentCreated) {
      return res.status(400).json({
        success: false,
        message: "Student account already created.",
      });
    }

    // Payment must be completed first

    if (admission.paymentStatus !== "Paid") {
      return res.status(400).json({
        success: false,
        message: "Payment is still pending.",
      });
    }

    // Email already exists

    const existingUser = await User.findOne({
      email: admission.email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists.",
      });
    }

    // Generate temporary password

    const temporaryPassword = crypto.randomBytes(5).toString("hex");

    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Find purchased course

    const course = await Course.findOne({
      title: admission.course,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    // Create Student

    const student = await User.create({
      name: admission.name,
      email: admission.email,
      password: hashedPassword,
      role: "student",
      isVerified: true,
      enrolledCourses: [course._id],
    });

    // Add student to course

    if (!course.students.includes(student._id)) {
      course.students.push(student._id);
    }

    await course.save();

    // Update admission

    admission.status = "Approved";
    admission.studentCreated = true;
    admission.studentId = student._id;
    admission.approvedAt = new Date();
    admission.approvedBy = req.user.id;

    await admission.save();

    // TODO:
    // Send Welcome Email here

    res.status(200).json({
      success: true,
      message: "Admission approved successfully.",
      temporaryPassword,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE ADMISSION =================

export const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    await admission.deleteOne();

    res.status(200).json({
      success: true,
      message: "Admission deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
