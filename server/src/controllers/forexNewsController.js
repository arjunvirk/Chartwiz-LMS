import ForexNews from "../models/LiveForex.js";

// GET ALL NEWS
export const getForexNews = async (req, res) => {
  try {
    const news = await ForexNews.find().sort({ publishedAt: -1 }).limit(50);

    res.status(200).json({
      success: true,
      count: news.length,
      news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE NEWS
export const getSingleNews = async (req, res) => {
  try {
    const news = await ForexNews.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
