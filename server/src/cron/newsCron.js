import cron from "node-cron";
import fetchForexNews from "../utils/fetchForexNews.js";

const startNewsCron = () => {
  cron.schedule("*/30 * * * *", async () => {
    console.log("Fetching latest forex news...");
    await fetchForexNews();
  });
};

export default startNewsCron;
