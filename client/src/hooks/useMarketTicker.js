import { useEffect, useRef, useState } from "react";

const PAIRS = ["EUR/USD", "BTC/USDT", "GBP/JPY", "XAU/USD", "USD/INR"];

function formatPrice(pair, value) {
  if (value == null || Number.isNaN(value)) return "—";
  if (pair === "BTC/USDT")
    return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  if (pair === "USD/INR" || pair === "GBP/JPY") return value.toFixed(2);
  if (pair === "XAU/USD")
    return value.toLocaleString(undefined, { maximumFractionDigits: 1 });
  return value.toFixed(4);
}

function formatChange(pct) {
  if (pct == null || Number.isNaN(pct)) return "—";
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(2)}%`;
}

/**
 * Polls real market data for the hero ticker.
 *
 * - EUR/USD, GBP/JPY, USD/INR: European Central Bank reference rates via
 *   Frankfurter (frankfurter.dev). No API key, CORS enabled. Note: ECB
 *   publishes these once a day around 16:00 CET, not live interbank ticks —
 *   there's no free, keyless, no-backend source for true intraday forex.
 *   Change % here is computed against the previous successful poll in this
 *   session, not a 24h change (Frankfurter doesn't provide one).
 * - BTC/USDT: CoinGecko simple price endpoint. No key, CORS enabled, and
 *   includes a real 24h % change directly from the API.
 * - XAU/USD: gold-api.com. No key, CORS enabled, real-time spot price.
 */
export function useMarketTicker(intervalMs = 30000) {
  const [data, setData] = useState(
    PAIRS.map((pair) => ({ pair, price: "—", change: "—" })),
  );
  const prevRef = useRef({});

  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      const numericValues = {};
      let btcPrice = null;
      let btcChange = null;

      // Each source is fetched independently and logged independently —
      // one failing source (blocked, rate-limited, CORS) won't hide errors
      // from the others, and you can see exactly which one is failing in
      // the browser console instead of just seeing "—" with no clue why.
      try {
        const res = await fetch(
          "https://api.frankfurter.dev/v1/latest?base=USD&symbols=EUR,GBP,JPY,INR",
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const r = json?.rates;
        if (r?.EUR) numericValues["EUR/USD"] = 1 / r.EUR;
        if (r?.GBP && r?.JPY) numericValues["GBP/JPY"] = r.JPY / r.GBP;
        if (r?.INR) numericValues["USD/INR"] = r.INR;
      } catch (err) {
        console.error(
          "[useMarketTicker] Frankfurter (forex) fetch failed:",
          err,
        );
      }

      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true",
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        btcPrice = json?.bitcoin?.usd ?? null;
        btcChange = json?.bitcoin?.usd_24h_change ?? null;
      } catch (err) {
        console.error("[useMarketTicker] CoinGecko (BTC) fetch failed:", err);
      }

      try {
        const res = await fetch("https://api.gold-api.com/price/XAU");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        // gold-api.com's exact field name isn't reliably documented, so
        // check the common possibilities rather than assuming one.
        const price =
          json?.price ?? json?.rate ?? json?.price_usd ?? json?.value ?? null;
        if (typeof price === "number") numericValues["XAU/USD"] = price;
        else
          console.warn(
            "[useMarketTicker] Unexpected gold-api.com shape:",
            json,
          );
      } catch (err) {
        console.error("[useMarketTicker] gold-api.com fetch failed:", err);
      }

      if (cancelled) return;

      setData((prev) =>
        prev.map((item) => {
          if (item.pair === "BTC/USDT") {
            if (btcPrice == null) return item; // keep last good value on failure
            return {
              pair: item.pair,
              price: formatPrice(item.pair, btcPrice),
              change: formatChange(btcChange),
            };
          }

          const val = numericValues[item.pair];
          if (val == null) return item; // keep last good value on failure

          const prevVal = prevRef.current[item.pair];
          let change = item.change;
          if (prevVal != null && prevVal !== 0) {
            change = formatChange(((val - prevVal) / prevVal) * 100);
          }
          prevRef.current[item.pair] = val;

          return {
            pair: item.pair,
            price: formatPrice(item.pair, val),
            change,
          };
        }),
      );
    };

    fetchAll();
    const id = setInterval(fetchAll, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [intervalMs]);

  return data;
}
