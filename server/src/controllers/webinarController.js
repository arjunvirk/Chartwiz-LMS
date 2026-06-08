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
