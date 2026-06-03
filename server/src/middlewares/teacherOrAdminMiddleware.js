import User from "../models/User.js";

export const teacherOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || (user.role !== "teacher" && user.role !== "admin")) {
      return res.status(403).json({
        success: false,

        message: "Teacher or Admin access only",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
