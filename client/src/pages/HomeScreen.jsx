import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

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

  const role = userInfo?.user?.role;

  if (role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (role === "teacher") {
    return <Navigate to="/teacher/dashboard" replace />;
  }

  if (role === "student") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <HeroSection />
      <TrustSection />
      <ChooseUs />
      <CoursesShowcase />
      <TradingFeatures />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomeScreen;
