import User from "../models/User.js";

export const adminOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    // CHECK ADMIN

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
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
