import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";

import LeadPopup from "./components/LeadPopup";

import Login from "./pages/Login";

import Register from "./pages/Register";

import DashboardLayout from "./layouts/DashboardLayout";

// HOME PAGE

import HomeScreen from "./pages/HomeScreen";

// PUBLIC COURSES PAGE

import CoursesPage from "./pages/CoursesPage";

import About from "./pages/About";

// STUDENT PAGES

import StudentDashboard from "./pages/student/StudentDashboard";

import MyCourses from "./pages/student/MyCourses";

import StudentProfile from "./pages/student/StudentProfile";

import PaymentScreen from "./pages/student/PaymentScreen";

// TEACHER PAGES

import TeacherDashboard from "./pages/teacher/TeacherDashboard";

import TeacherProfile from "./pages/teacher/TeacherProfile";

import TeacherCourses from "./pages/teacher/TeacherCourses";

import AnalysisList from "./pages/teacher/AnalysisList";

// ADMIN PAGES

import AdminDashboard from "./pages/admin/AdminDashboard";

import AdminProfile from "./pages/admin/AdminProfile";

import LeadManagementScreen from "./pages/admin/LeadManagementScreen";

// LIVE CHARTS

import LiveMarkets from "./pages/LiveMarkets";

import PrivacyPolicy from "./pages/PrivacyPolicy";

import TermsConditions from "./pages/TermsConditions";
import Support from "./pages/Support";
import LiveCoursesPage from "./pages/LiveCoursesPage";
import CreateLiveCourse from "./pages/teacher/CreateLiveCourse";
import TeacherLiveCourses from "./pages/teacher/TeacherLiveCourses";

import CreateAnalysis from "./pages/teacher/CreateAnalysis";
import EditAnalysis from "./pages/teacher/EditAnalysis";

import MyLiveCourses from "./pages/student/MyLiveCourses";
import Payments from "./pages/admin/Payments";
import Invoices from "./pages/admin/Invoices";

const App = () => {
  return (
    <>
      {/* NAVBAR */}

      <Navbar />

      <LeadPopup />

      {/* ROUTES */}

      <Routes>
        {/* HOME */}

        <Route path="/" element={<HomeScreen />} />

        {/* PUBLIC COURSES */}

        <Route path="/courses" element={<CoursesPage />} />

        <Route path="/live-courses" element={<LiveCoursesPage />} />

        <Route path="/about" element={<About />} />

        {/* LIVE CHARTS */}

        <Route path="/live" element={<LiveMarkets />} />

        {/* LOGIN */}

        <Route path="/login" element={<Login />} />

        {/* REGISTER */}

        <Route path="/register" element={<Register />} />

        {/* ECONOMIC CALENDAR  */}

        {/* ================= STUDENT DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* DASHBOARD HOME */}

          <Route index element={<StudentDashboard />} />

          {/* MY COURSES */}

          <Route path="courses" element={<MyCourses />} />

          {/* PROFILE */}

          <Route path="profile" element={<StudentProfile />} />

          <Route path="live-courses" element={<MyLiveCourses />} />

          <Route path="payment" element={<PaymentScreen />} />
        </Route>

        {/* ================= TEACHER DASHBOARD ================= */}

        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* DASHBOARD HOME */}

          <Route index element={<TeacherDashboard />} />

          {/* PROFILE */}

          <Route path="profile" element={<TeacherProfile />} />

          {/* TEACHER COURSES */}

          <Route path="courses" element={<TeacherCourses />} />

          <Route path="live-courses" element={<TeacherLiveCourses />} />

          <Route path="create-live-course" element={<CreateLiveCourse />} />

          {/* CREATE ANALYSIS */}
          <Route path="analysis/create" element={<CreateAnalysis />} />

          <Route path="analysis" element={<AnalysisList />} />

          <Route path="analysis/:id/edit" element={<EditAnalysis />} />
        </Route>

        {/* ================= ADMIN DASHBOARD ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route path="profile" element={<AdminProfile />} />

          <Route path="payments" element={<Payments />} />

          <Route path="invoices" element={<Invoices />} />

          <Route path="leads" element={<LeadManagementScreen />} />
        </Route>

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/terms-conditions" element={<TermsConditions />} />

        <Route path="/support" element={<Support />} />
      </Routes>
    </>
  );
};

export default App;
