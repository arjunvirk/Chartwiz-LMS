import EconomicEvent from "../models/EconomicCalendar.js";

// GET TODAY EVENTS
export const getTodayEvents = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const events = await EconomicEvent.find({
      eventTime: {
        $gte: start,
        $lte: end,
      },
    }).sort({
      eventTime: 1,
    });

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET UPCOMING EVENTS
export const getUpcomingEvents = async (req, res) => {
  try {
    const events = await EconomicEvent.find({
      eventTime: {
        $gte: new Date(),
      },
    })
      .sort({ eventTime: 1 })
      .limit(100);

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE EVENT
export const getSingleEvent = async (req, res) => {
  try {
    const event = await EconomicEvent.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
