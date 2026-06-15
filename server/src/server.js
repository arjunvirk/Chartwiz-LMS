import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import liveCourseRoutes from "./routes/liveCourseRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";
import googleMeetRoutes from "./routes/googleMeetRoutes.js";
import webinarRoutes from "./routes/webinarRoutes.js";
import marketAnalysisRoutes from "./routes/marketAnalysisRoutes.js";
import economicCalendarRoutes from "./routes/economicCalendarRoutes.js";

import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middlewares/customErrorMiddleware.js";

const app = express();

// ---------------- MIDDLEWARE ----------------

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// ---------------- DATABASE ----------------

connectDB();

// ---------------- ROUTES ----------------

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/live-courses", liveCourseRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/google", googleMeetRoutes);
app.use("/api/webinars", webinarRoutes);
app.use("/api/analysis", marketAnalysisRoutes);
app.use("/api/economic-events", economicCalendarRoutes);

// ---------------- TEST ROUTE ----------------

app.get("/", (req, res) => {
  res.send("Stock Market LMS API Running");
});

// ---------------- SERVER ----------------

const PORT = process.env.PORT || 5000;

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

// Custom Error Middlewares

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
