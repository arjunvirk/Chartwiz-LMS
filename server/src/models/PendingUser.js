import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },

    verificationToken: {
      type: String,
      required: true,
    },

    verificationTokenExpire: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const PendingUser = mongoose.model("PendingUser", pendingUserSchema);

export default PendingUser;
