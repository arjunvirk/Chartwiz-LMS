import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  console.log("Origin:", req.headers.origin);
  console.log("Cookie Header:", req.headers.cookie);
  console.log("Parsed Cookies:", req.cookies);

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
