import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initMetaPixel, trackPageView } from "../utils/metaPixel";

export default function MetaPixelTracker() {
  const location = useLocation();

  useEffect(() => {
    initMetaPixel();
  }, []);

  useEffect(() => {
    trackPageView();
  }, [location.pathname]);

  return null;
}
