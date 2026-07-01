import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);
    const token = req.cookies.token;

    // CHECK TOKEN
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // SAVE USER ID
    req.user = decoded;
    // console.log("COOKIE:", req.cookies);
    // console.log("TOKEN:", req.cookies.jwt);
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
