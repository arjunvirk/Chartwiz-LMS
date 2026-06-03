import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

import crypto from "crypto";

import sendEmail from "../utils/sendEmail.js";
import PendingUser from "../models/PendingUser.js";

// ---------------- GOOGLE CLIENT ----------------

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ---------------- REGISTER USER ----------------

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // CHECK FIELDS

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,

        message: "All fields are required",
      });
    }

    // CHECK USER EXISTS

    const userExists = await User.findOne({
      email,
    });

    const pendingUserExists = await PendingUser.findOne({
      email,
    });

    if (pendingUserExists) {
      return res.status(400).json({
        success: false,

        message: "Verification email already sent. Please verify your account.",
      });
    }

    if (userExists) {
      return res.status(400).json({
        success: false,

        message: "User already exists",
      });
    }

    // HASH PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE VERIFICATION TOKEN

    const verificationToken = crypto.randomBytes(32).toString("hex");

    // CREATE USER
    const role = "student";

    const user = await PendingUser.create({
      name,

      email,

      password: hashedPassword,

      role,
      verificationToken,

      verificationTokenExpire: Date.now() + 24 * 60 * 60 * 1000,
    });

    // VERIFY URL

    const verifyURL = `${process.env.SERVER_URL}/api/users/verify/${verificationToken}`;

    // SEND EMAIL

    await sendEmail({
      email: user.email,

      subject: "Verify Your ChartWiz Account",

      message: `
        <div style="font-family: Arial; padding: 20px;">

          <h2>
            Welcome To ChartWiz Academy
          </h2>

          <p>
            Please verify your email address.
          </p>

          <a
            href="${verifyURL}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:black;
              color:white;
              text-decoration:none;
              border-radius:8px;
              margin-top:10px;
            "
          >
            Verify Email
          </a>

          <p style="margin-top:20px;">
            This link expires in 24 hours.
          </p>

        </div>
      `,
    });

    // RESPONSE

    res.status(201).json({
      success: true,

      message: "Verification email sent. Please verify your account.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ---------------- LOGIN USER ----------------

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // FIND USER

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,

        message: "Invalid credentials",
      });
    }

    // BLOCK UNVERIFIED USERS

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,

        message: "Please verify your email first",
      });
    }

    // GOOGLE USER CHECK

    if (user.authProvider === "google") {
      return res.status(400).json({
        success: false,

        message: "Please login with Google",
      });
    }

    // CHECK PASSWORD

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,

        message: "Invalid credentials",
      });
    }

    // GENERATE TOKEN

    const token = generateToken(user._id);

    // STORE COOKIE

    res.cookie("token", token, {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // RESPONSE

    res.status(200).json({
      success: true,

      message: "Login successful",

      user: {
        _id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
// ---------------- GOOGLE LOGIN ----------------

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    // VERIFY GOOGLE TOKEN
    const ticket = await client.verifyIdToken({
      idToken: credential,

      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // CHECK GENUINE GOOGLE EMAIL
    if (!payload.email_verified) {
      return res.status(400).json({
        success: false,

        message: "Google email is not verified",
      });
    }

    // FIND USER
    let user = await User.findOne({
      email: payload.email,
    });

    // CREATE USER IF NOT EXISTS
    if (!user) {
      user = await User.create({
        name: payload.name,

        email: payload.email,

        googleId: payload.sub,

        profilePic: payload.picture,

        isVerified: true,

        authProvider: "google",
      });
    }

    // GENERATE JWT TOKEN
    const token = generateToken(user._id);

    // STORE COOKIE
    res.cookie("token", token, {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // RESPONSE
    res.status(200).json({
      success: true,

      message: "Google login successful",

      user: {
        _id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // ================= FIND PENDING USER =================

    const pendingUser = await PendingUser.findOne({
      verificationToken: token,

      verificationTokenExpire: {
        $gt: Date.now(),
      },
    });

    // ================= INVALID TOKEN =================

    if (!pendingUser) {
      return res.status(400).json({
        success: false,

        message: "Invalid or expired verification token",
      });
    }

    // ================= CHECK EXISTING USER =================

    const existingUser = await User.findOne({
      email: pendingUser.email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,

        message: "User already exists",
      });
    }

    // ================= CREATE REAL USER =================

    await User.create({
      name: pendingUser.name,

      email: pendingUser.email,

      password: pendingUser.password,

      role: pendingUser.role,

      authProvider: "manual",

      isVerified: true,
    });

    // ================= DELETE PENDING USER =================

    await pendingUser.deleteOne();

    // ================= SUCCESS PAGE =================

    res.redirect(`${process.env.CLIENT_URL}/login?verified=true`);
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ---------------- GET CURRENT USER ----------------

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ---------------- UPDATE USER PROFILE ----------------

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    // UPDATE NAME

    user.name = req.body.name || user.name;

    // UPDATE PROFILE PIC

    user.profilePic = req.body.profilePic || user.profilePic;

    // UPDATE PASSWORD

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    // SAVE USER

    const updatedUser = await user.save();

    // RESPONSE

    res.status(200).json({
      success: true,

      message: "Profile updated successfully",

      user: {
        _id: updatedUser._id,

        name: updatedUser.name,

        email: updatedUser.email,

        role: updatedUser.role,

        profilePic: updatedUser.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ---------------- LOGOUT USER ----------------

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({
      success: true,

      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// check verification status

export const checkVerificationStatus = async (req, res) => {
  try {
    const { email } = req.query;

    // ================= CHECK REAL USER =================

    const user = await User.findOne({
      email,
    });

    // VERIFIED USER EXISTS

    if (user) {
      return res.status(200).json({
        success: true,

        verified: true,

        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profilePic: user.profilePic,
        },
      });
    }

    // ================= CHECK PENDING USER =================

    const pendingUser = await PendingUser.findOne({
      email,
    });

    // PENDING VERIFICATION

    if (pendingUser) {
      return res.status(200).json({
        success: true,

        verified: false,

        message: "Email verification pending",
      });
    }

    // USER NOT FOUND

    return res.status(404).json({
      success: false,

      message: "User not found",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
