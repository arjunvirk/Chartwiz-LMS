import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const { userInfo } = useSelector((state) => state.userLogin);

  if (userInfo) {
    if (userInfo.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (userInfo.role === "teacher") {
      return <Navigate to="/teacher/dashboard" replace />;
    }

    if (userInfo.role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    }
  }

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
