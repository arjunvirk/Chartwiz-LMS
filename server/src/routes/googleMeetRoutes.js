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

export default router;
