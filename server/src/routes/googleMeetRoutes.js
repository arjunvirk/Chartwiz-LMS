import express from "express";
import { googleMeetOAuth } from "../config/googleMeet.js";

const router = express.Router();

router.get("/auth", async (req, res) => {
  const url = googleMeetOAuth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/calendar"],
  });

  res.json({ url });
});

import express from "express";
import { googleMeetOAuth } from "../config/googleMeet.js";

const router = express.Router();

router.get("/auth", async (req, res) => {
  const url = googleMeetOAuth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar",
    ],
  });

  res.json({ url });
});

router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await googleMeetOAuth.getToken(code);

    res.json({
      success: true,
      tokens,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;

export default router;
