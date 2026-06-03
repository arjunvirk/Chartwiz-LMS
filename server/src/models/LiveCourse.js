import mongoose from "mongoose";

const liveCourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    instructor: {
      type: String,
      required: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    price: {
      type: Number,
      required: true,
    },

    durationMonths: {
      type: Number,
      default: 2,
    },

    startDate: {
      type: Date,
      required: true,
    },

    classTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["upcoming", "live", "completed"],
      default: "upcoming",
    },

    meetLink: {
      type: String,
      default: "",
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const LiveCourse = mongoose.model("LiveCourse", liveCourseSchema);

export default LiveCourse;
