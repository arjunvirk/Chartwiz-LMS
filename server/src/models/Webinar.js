import mongoose from "mongoose";

const webinarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    startTime: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      default: 60,
    },

    meetLink: {
      type: String,
    },

    eventId: {
      type: String,
    },

    status: {
      type: String,
      enum: ["scheduled", "live", "completed"],
      default: "scheduled",
    },
  },
  {
    timestamps: true,
  },
);

const Webinar = mongoose.model("Webinar", webinarSchema);

export default Webinar;
