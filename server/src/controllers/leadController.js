import Lead from "../models/Lead.js";

// ================= CREATE LEAD =================

export const createLead = async (req, res) => {
  try {
    const { name, phone } = req.body;

    // VALIDATION

    if (!name || !phone) {
      return res.status(400).json({
        success: false,

        message: "Please fill all fields",
      });
    }

    // SAVE LEAD

    const lead = await Lead.create({
      name,
      phone,
    });

    res.status(201).json({
      success: true,

      message: "Thank you! We will contact you soon.",

      lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
