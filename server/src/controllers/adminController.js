import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import PendingUser from "../models/PendingUser.js";
import Course from "../models/Course.js";
import Lead from "../models/Lead.js";

// ================= GET ALL USERS =================

export const getAllUsers = async (req, res) => {
  try {
    // ================= REAL USERS =================

    const users = await User.find({}).sort({
      createdAt: -1,
    });

    // ================= PENDING USERS =================

    const pendingUsers = await PendingUser.find({}).sort({
      createdAt: -1,
    });

    // ================= ADD STATUS =================

    const verifiedUsers = users.map((user) => ({
      ...user._doc,

      status: "verified",
    }));

    const pendingUsersFormatted = pendingUsers.map((user) => ({
      ...user._doc,

      status: "pending",
    }));

    // ================= MERGE USERS =================

    const allUsers = [...verifiedUsers, ...pendingUsersFormatted];

    res.status(200).json({
      success: true,

      count: allUsers.length,

      users: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= DELETE USER =================

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,

      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= UPDATE USER ROLE =================

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    const allowedRoles = ["student", "teacher", "admin"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    if (user.role === "admin" && role !== "admin") {
      const adminCount = await User.countDocuments({
        role: "admin",
      });

      if (adminCount <= 1) {
        return res.status(400).json({
          success: false,
          message: "At least one admin must exist",
        });
      }
    }

    user.role = role;

    await user.save();

    res.status(200).json({
      success: true,

      message: "User role updated",

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= ADMIN DASHBOARD STATS =================

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalTeachers = await User.countDocuments({
      role: "teacher",
    });

    const totalAdmins = await User.countDocuments({
      role: "admin",
    });

    const totalCourses = await Course.countDocuments();

    const totalLeads = await Lead.countDocuments();

    // TOTAL ENROLLMENTS

    const users = await User.find({}, "enrolledCourses");

    const totalEnrollments = users.reduce(
      (total, user) => total + user.enrolledCourses.length,
      0,
    );

    // NEW USERS TODAY

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const newEnrollmentsToday = await User.countDocuments({
      role: "student",

      createdAt: {
        $gte: today,
      },
    });

    res.status(200).json({
      success: true,

      stats: {
        totalUsers,

        totalStudents,

        totalTeachers,

        totalAdmins,

        totalCourses,

        totalLeads,

        totalEnrollments,

        newEnrollmentsToday,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= CREATE USER BY ADMIN =================

export const createUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ================= VALIDATION =================

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,

        message: "All fields are required",
      });
    }

    // ================= VALID ROLES =================

    const allowedRoles = ["student", "teacher", "admin"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,

        message: "Invalid role",
      });
    }

    // ================= CHECK EXISTING USER =================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const userExists = await User.findOne({
      email,
    });

    const pendingUserExists = await PendingUser.findOne({
      email,
    });

    if (pendingUserExists) {
      return res.status(400).json({
        success: false,

        message: "Verification email already sent to this user",
      });
    }

    if (userExists) {
      return res.status(400).json({
        success: false,

        message: "User already exists",
      });
    }

    // ================= HASH PASSWORD =================

    const hashedPassword = await bcrypt.hash(password, 10);

    // ================= GENERATE TOKEN =================

    const verificationToken = crypto.randomBytes(32).toString("hex");

    // ================= CREATE USER =================

    const user = await PendingUser.create({
      name,

      email,

      password: hashedPassword,

      role,

      verificationToken,

      verificationTokenExpire: Date.now() + 10 * 60 * 1000,
    });

    // ================= VERIFY URL =================

    const verifyURL = `${process.env.SERVER_URL}/api/users/verify/${verificationToken}`;

    // ================= SEND EMAIL =================

    await sendEmail({
      email: user.email,

      subject: "Your ChartWiz LMS Account",

      message: `
        <div style="font-family: Arial; padding: 20px;">

          <h2>
            Welcome To ChartWiz LMS
          </h2>

          <p>
            Your account has been created by admin.
          </p>

          <p>
            Please verify your email before login.
          </p>

          <a
            href="${verifyURL}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:black;
              color:white;
              text-decoration:none;
              border-radius:8px;
              margin-top:10px;
            "
          >
            Verify Email
          </a>

          <p style="margin-top:20px;">
            This verification link expires in 10 minutes.
          </p>

        </div>
      `,
    });

    // ================= RESPONSE =================

    res.status(201).json({
      success: true,

      message: "User created successfully and verification email sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= DELETE PENDING USER =================

export const deletePendingUser = async (req, res) => {
  try {
    const pendingUser = await PendingUser.findById(req.params.id);

    if (!pendingUser) {
      return res.status(404).json({
        success: false,

        message: "Pending user not found",
      });
    }

    await pendingUser.deleteOne();

    res.status(200).json({
      success: true,

      message: "Pending invitation deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ================= ANALYTICS =================

export const getAdminAnalytics = async (req, res) => {
  try {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const currentYear = new Date().getFullYear();

    const analytics = [];

    for (let month = 0; month < 12; month++) {
      const startDate = new Date(currentYear, month, 1);

      const endDate = new Date(currentYear, month + 1, 1);

      const students = await User.countDocuments({
        role: "student",

        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      const teachers = await User.countDocuments({
        role: "teacher",

        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      const leads = await Lead.countDocuments({
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      const courses = await Course.countDocuments({
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      analytics.push({
        month: months[month],

        students,

        teachers,

        leads,

        courses,
      });
    }

    res.status(200).json({
      success: true,

      analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
