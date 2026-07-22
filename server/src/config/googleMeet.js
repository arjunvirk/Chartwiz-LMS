import dotenv from "dotenv";
dotenv.config();

import { google } from "googleapis";

console.log(
  "ALL ENV:",
  Object.keys(process.env).filter((key) => key.includes("GOOGLE")),
);

export const googleMeetOAuth = new google.auth.OAuth2(
  process.env.GOOGLE_MEET_CLIENT_ID,
  process.env.GOOGLE_MEET_CLIENT_SECRET,
  process.env.GOOGLE_MEET_REDIRECT_URI,
);
