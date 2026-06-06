import { google } from "googleapis";

export const googleMeetOAuth = new google.auth.OAuth2(
  process.env.GOOGLE_MEET_CLIENT_ID,
  process.env.GOOGLE_MEET_CLIENT_SECRET,
  process.env.GOOGLE_MEET_REDIRECT_URI,
);
