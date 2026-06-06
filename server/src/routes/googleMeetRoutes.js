import express from "express";
import { googleMeetOAuth } from "../config/googleMeet.js";
import GoogleToken from "../models/GoogleToken.js";

const router = express.Router();

router.get("/auth", async (req, res) => {
  const url = googleMeetOAuth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/calendar"],
  });

  res.json({ url });
});

router.get("/auth", async (req, res) => {
  const url = googleMeetOAuth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/calendar"],
  });

  res.json({ url });
});

router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await googleMeetOAuth.getToken(code);

    await GoogleToken.deleteMany({});

    await GoogleToken.create({
      refreshToken: tokens.refresh_token,
    });

    res.json({
      success: true,
      message: "Google Meet Connected Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
