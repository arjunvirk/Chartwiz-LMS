import MarketAnalysis from "../models/MarketAnalysis.js";

// CREATE
export const createAnalysis = async (req, res) => {
  try {
    const analysis = await MarketAnalysis.create(req.body);

    res.status(201).json({
      success: true,
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getAllAnalyses = async (req, res) => {
  try {
    const analyses = await MarketAnalysis.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: analyses.length,
      analyses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ONE
export const getSingleAnalysis = async (req, res) => {
  try {
    const analysis = await MarketAnalysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
export const updateAnalysis = async (req, res) => {
  try {
    const analysis = await MarketAnalysis.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
export const deleteAnalysis = async (req, res) => {
  try {
    const analysis = await MarketAnalysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found",
      });
    }

    await analysis.deleteOne();

    res.status(200).json({
      success: true,
      message: "Analysis deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
