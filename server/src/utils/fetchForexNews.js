import ForexNews from "../models/LiveForex.js";

const fetchForexNews = async () => {
  try {
    const response = await fetch(
      `https://api.marketaux.com/v1/news/all?api_token=${process.env.MARKETAUX_API_KEY}&symbols=EURUSD,GBPUSD,USDJPY,XAUUSD&language=en`,
    );

    const data = await response.json();
    // console.log(data);
    // console.log("Articles received:", data.data.length);

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch news");
    }

    for (const article of data.data) {
      const exists = await ForexNews.findOne({
        url: article.url,
      });

      if (!exists) {
        await ForexNews.create({
          title: article.title,
          description: article.description,
          source: article.source,
          url: article.url,
          image: article.image_url,
          publishedAt: article.published_at,
        });
      }
    }

    // console.log("Forex news updated successfully");
  } catch (error) {
    console.error("Forex News Error:", error.message);
  }
};

export default fetchForexNews;
