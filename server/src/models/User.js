import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      minlength: 6,
    },

    googleId: {
      type: String,
      default: null,
    },

    profilePic: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Course",
      },
    ],

    liveCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LiveCourse",
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
    },

    verificationTokenExpire: {
      type: Date,
    },

    authProvider: {
      type: String,
      enum: ["manual", "google"],
      default: "manual",
    },

    mustChangePassword: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
