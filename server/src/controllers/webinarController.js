import { google } from "googleapis";

import Webinar from "../models/Webinar.js";
import GoogleToken from "../models/GoogleToken.js";

import { googleMeetOAuth } from "../config/googleMeet.js";

export const createWebinar = async (req, res) => {
  try {
    const { title, description, startTime, duration } = req.body;

    const tokenDoc = await GoogleToken.findOne();

    if (!tokenDoc) {
      return res.status(400).json({
        success: false,
        message: "Google account not connected",
      });
    }

    googleMeetOAuth.setCredentials({
      refresh_token: tokenDoc.refreshToken,
    });

    const calendar = google.calendar({
      version: "v3",
      auth: googleMeetOAuth,
    });

    const event = {
      summary: title,

      description,

      start: {
        dateTime: startTime,
      },

      end: {
        dateTime: new Date(
          new Date(startTime).getTime() + duration * 60 * 1000,
        ).toISOString(),
      },

      conferenceData: {
        createRequest: {
          requestId: Date.now().toString(),
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: event,
    });

    const meetLink = response.data.conferenceData?.entryPoints?.[0]?.uri;

    const webinar = await Webinar.create({
      title,
      description,
      startTime,
      duration,
      meetLink,
      eventId: response.data.id,
    });

    res.status(201).json({
      success: true,
      webinar,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
