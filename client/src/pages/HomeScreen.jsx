import React from "react";
import HeroSection from "../components/HeroSection";
import TrustSection from "../components/TrustSection";
import ChooseUs from "../components/ChooseUs";
import CoursesShowcase from "../components/CoursesShowcase";
import TradingFeatures from "../components/TradingFeatures";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const HomeScreen = () => {
  return (
    <div>
      <HeroSection />
      <TrustSection />
      <ChooseUs />
      <TradingFeatures />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomeScreen;
