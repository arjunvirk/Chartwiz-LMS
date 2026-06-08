import { google } from "googleapis";

import Webinar from "../models/Webinar.js";
import GoogleToken from "../models/GoogleToken.js";

import { googleMeetOAuth } from "../config/googleMeet.js";

export const createWebinar = async (req, res) => {
  try {
    const { title, description, startTime, duration } = req.body;

    console.log("BODY:", req.body);
    console.log("startTime:", startTime);
    console.log("duration:", duration);

    const startDate = new Date(startTime);

    console.log("parsedDate:", startDate);

    if (isNaN(startDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid webinar start time",
      });
    }

    const endDate = new Date(
      startDate.getTime() + Number(duration) * 60 * 1000,
    );

    const tokenDoc = await GoogleToken.findOne();

    if (!tokenDoc) {
      return res.status(400).json({
        success: false,
        message: "Google account not connected",
      });
    }
    console.log("MEET_CLIENT_ID:", process.env.GOOGLE_MEET_CLIENT_ID);

    console.log("MEET_CLIENT_SECRET:", process.env.GOOGLE_MEET_CLIENT_SECRET);

    console.log("MEET_REDIRECT_URI:", process.env.GOOGLE_MEET_REDIRECT_URI);
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
        dateTime: startDate.toISOString(),
      },

      end: {
        dateTime: endDate.toISOString(),
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
      startTime: startDate,
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

export const getWebinars = async (req, res) => {
  try {
    const now = new Date();

    const webinars = await Webinar.find({
      startTime: {
        $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      },
    }).sort({
      startTime: 1,
    });

    res.json({
      success: true,
      webinars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findById(req.params.id);

    if (!webinar) {
      return res.status(404).json({
        success: false,
        message: "Webinar not found",
      });
    }

    res.json({
      success: true,
      webinar,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findById(req.params.id);

    if (!webinar) {
      return res.status(404).json({
        success: false,
        message: "Webinar not found",
      });
    }

    // Delete Google Calendar Event

    const tokenDoc = await GoogleToken.findOne();

    if (tokenDoc) {
      googleMeetOAuth.setCredentials({
        refresh_token: tokenDoc.refreshToken,
      });

      const calendar = google.calendar({
        version: "v3",
        auth: googleMeetOAuth,
      });

      try {
        await calendar.events.delete({
          calendarId: "primary",
          eventId: webinar.eventId,
        });
      } catch (error) {
        console.log("Google Calendar delete failed");
      }
    }

    await webinar.deleteOne();

    res.json({
      success: true,
      message: "Webinar deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
