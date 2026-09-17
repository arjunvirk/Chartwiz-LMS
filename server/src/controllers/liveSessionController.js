import { createHash } from "node:crypto";
import { google } from "googleapis";
import LiveCourse from "../models/LiveCourse.js";
import GoogleToken from "../models/GoogleToken.js";

const fail = (message, status = 400) => Object.assign(new Error(message), { status, isAppError: true });
export function validateSession(body, now = Date.now()) {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title || title.length > 160) throw fail("Enter a session title up to 160 characters.");
  if (!/^[a-zA-Z0-9-]{16,80}$/.test(body.requestId || "")) throw fail("Invalid scheduling request. Reopen the scheduling form.");
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(body.startTime || "")) throw fail("Choose a valid date and time in IST.");
  const startTime = new Date(`${body.startTime}:00+05:30`);
  if (!Number.isFinite(startTime.getTime()) || new Date(startTime.getTime() + 330 * 60000).toISOString().slice(0,16) !== body.startTime) throw fail("Choose a valid date and time.");
  const duration = Number(body.duration);
  if (!Number.isInteger(duration) || duration < 1 || duration > 480) throw fail("Duration must be between 1 and 480 minutes.");
  if (startTime.getTime() <= now) throw fail("Choose a future start time.");
  return { title, startTime, duration, endTime: new Date(startTime.getTime() + duration * 60000) };
}

async function calendarClient() {
  const token = await GoogleToken.findOne();
  if (!token?.refreshToken) throw fail("Ask your administrator to connect the Alphira Google Calendar account.", 503);
  const auth = new google.auth.OAuth2(process.env.GOOGLE_MEET_CLIENT_ID, process.env.GOOGLE_MEET_CLIENT_SECRET, process.env.GOOGLE_MEET_REDIRECT_URI);
  auth.setCredentials({ refresh_token: token.refreshToken });
  return google.calendar({ version: "v3", auth });
}

async function ownedCourse(req) {
  if (!/^[a-f0-9]{24}$/i.test(req.params.id)) throw fail("Live course not found.", 404);
  const course = await LiveCourse.findById(req.params.id);
  if (!course) throw fail("Live course not found.", 404);
  if (String(course.teacher) !== String(req.user.id)) throw fail("You can only schedule classes for your own batches.", 403);
  return course;
}
const meetUrl = (event) => event.conferenceData?.entryPoints?.find((entry) => entry.entryPointType === "video")?.uri || event.hangoutLink || "";
function sendError(res, error) {
  const invalidGrant = error.response?.data?.error === "invalid_grant" || /invalid_grant|invalid grant/i.test(error.message || "");
  const googleUnauthorized = Number(error.code || error.response?.status || error.status) === 401;
  return res.status(error.isAppError ? error.status : 502).json({ success: false, message: (invalidGrant || googleUnauthorized) ? "The Alphira Calendar connection has expired. Ask your administrator to reconnect it." : error.isAppError ? error.message : "Calendar scheduling could not finish. Retry with the same form; your session will not be duplicated." });
}

export const scheduleLiveSession = async (req, res) => {
  try {
    const course = await ownedCourse(req);
    const existing = course.sessions?.find((session) => session.requestId === req.body.requestId);
    if (existing) return res.json({ success: true, session: existing });
    const values = validateSession(req.body);
    const calendar = await calendarClient();
    const eventId = createHash("sha256").update(`${course._id}:${req.body.requestId}`).digest("hex");
    let event;
    try {
      ({ data: event } = await calendar.events.insert({
        calendarId: "primary", conferenceDataVersion: 1, sendUpdates: "none",
        requestBody: {
          id: eventId, summary: `${course.title} — ${values.title}`,
          description: `Alphira Capital live class. Instructor: ${course.instructor}`,
          start: { dateTime: values.startTime.toISOString(), timeZone: "Asia/Kolkata" },
          end: { dateTime: values.endTime.toISOString(), timeZone: "Asia/Kolkata" },
          conferenceData: { createRequest: { requestId: eventId, conferenceSolutionKey: { type: "hangoutsMeet" } } },
        },
      }));
    } catch (error) {
      if (Number(error.code || error.response?.status) !== 409) throw error;
      ({ data: event } = await calendar.events.get({ calendarId: "primary", eventId }));
    }
    if (event.status === "cancelled") throw fail("This request was cancelled. Reopen the form to schedule a new session.", 409);
    // On a retry, persist Google's original event values instead of modified form data.
    const session = {
      ...values, title: event.summary?.slice(`${course.title} — `.length) || values.title,
      startTime: new Date(event.start.dateTime), endTime: new Date(event.end.dateTime),
      requestId: req.body.requestId, eventId, meetLink: meetUrl(event),
    };
    session.duration = Math.round((session.endTime - session.startTime) / 60000);
    await LiveCourse.updateOne({ _id: course._id, "sessions.requestId": { $ne: req.body.requestId } }, { $push: { sessions: session } }, { runValidators: true });
    const updated = await LiveCourse.findById(course._id);
    if (!updated) throw fail("The batch was removed while scheduling. Contact your administrator about the Calendar event.", 409);
    res.status(201).json({ success: true, session: updated.sessions.find((item) => item.requestId === req.body.requestId) });
  } catch (error) { sendError(res, error); }
};

export const refreshLiveSession = async (req, res) => {
  try {
    const course = await ownedCourse(req);
    const session = course.sessions.id(req.params.sessionId);
    if (!session) throw fail("Session not found.", 404);
    const calendar = await calendarClient();
    const { data: event } = await calendar.events.get({ calendarId: "primary", eventId: session.eventId });
    if (event.conferenceData?.createRequest?.status?.statusCode === "failure") throw fail("Google could not generate the Meet link. Cancel this session and schedule it again.", 502);
    const link = meetUrl(event);
    await LiveCourse.updateOne({ _id: course._id, "sessions._id": session._id }, { $set: { "sessions.$.meetLink": link } });
    res.json({ success: true, meetLink: link });
  } catch (error) { sendError(res, error); }
};

export const cancelLiveSession = async (req, res) => {
  try {
    const course = await ownedCourse(req);
    const session = course.sessions.id(req.params.sessionId);
    if (!session) throw fail("Session not found.", 404);
    if (session.status !== "cancelled") {
      const calendar = await calendarClient();
      try { await calendar.events.delete({ calendarId: "primary", eventId: session.eventId, sendUpdates: "none" }); }
      catch (error) { if (![404,410].includes(Number(error.code || error.response?.status))) throw error; }
      await LiveCourse.updateOne({ _id: course._id, "sessions._id": session._id }, { $set: { "sessions.$.status": "cancelled", "sessions.$.meetLink": "" } });
    }
    res.json({ success: true });
  } catch (error) { sendError(res, error); }
};

