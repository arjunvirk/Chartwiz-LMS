import dotenv from "dotenv";
import mongoose from "mongoose";
import Course from "../src/models/Course.js";
import User from "../src/models/User.js";
dotenv.config({ quiet: true });
// Run from server. Read-only by default; --apply creates the missing course.
try {
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
  const teachers = await User.find({ role: "teacher", name: /^Rohit\s+Kumar$/i }).select("_id name");
  if (teachers.length !== 1) throw new Error("Expected exactly one teacher named Rohit Kumar; found " + teachers.length);
  const existing = await Course.find({ title: /order[\s-]*flow/i }).select("title teacher price");
  console.log(JSON.stringify({ mentor: teachers[0].name, matches: existing.map(c => ({ title: c.title, assignedToRohit: String(c.teacher) === String(teachers[0]._id), feeUnset: c.price == null })) }));
  if (existing.length) {
    if (existing.length !== 1 || existing[0].title !== "Advanced Order Flow Program") throw new Error("Existing Order Flow catalog needs review; no records changed.");
    console.log("Course already exists; no records changed.");
  } else if (process.argv.includes("--apply")) {
    const course = await Course.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId("a1f100000000000000000003") },
      { $setOnInsert: {
        title: "Advanced Order Flow Program",
        description: "Advanced classroom education in order flow, buying and selling activity, and market context through professional mentorship.",
        thumbnail: "https://alphiracapital.com/order-flow-art.svg",
        instructor: teachers[0].name, teacher: teachers[0]._id,
        category: "Advanced Trading Education", price: null, students: [], videos: [],
      } }, { upsert: true, new: true, runValidators: true },
    );
    if (course.title !== "Advanced Order Flow Program") throw new Error("Reserved course ID occupied; no existing record changed.");
    console.log("Verified: Order Flow course exists, assigned to Rohit Kumar, with fee unset.");
  } else console.log("Ready to create Order Flow. Use --apply to save.");
} catch {
  console.error("Order Flow setup could not complete. Check database access and that exactly one teacher named Rohit Kumar exists. No credentials are logged.");
  process.exitCode = 1;
} finally { await mongoose.disconnect(); }
