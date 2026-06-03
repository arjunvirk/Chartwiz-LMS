import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    instructor: {
      type: String,
      default: "ChartWiz Academy",
    },

    category: {
      type: String,
      default: "Trading",
    },

    price: {
      type: Number,
      default: 0,
    },

    videos: [
      {
        title: String,

        videoUrl: String,
      },
    ],

    teacher: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
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

const Course = mongoose.model("Course", courseSchema);

export default Course;
