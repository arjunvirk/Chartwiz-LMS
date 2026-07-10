import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LeadPopup from "./components/LeadPopup";

import { checkAuth } from "./actions/userActions";

import Login from "./pages/Login";

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
import MyLiveCourses from "./pages/student/MyLiveCourses";

// TEACHER PAGES

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import TeacherLiveCourses from "./pages/teacher/TeacherLiveCourses";
import CreateLiveCourse from "./pages/teacher/CreateLiveCourse";
import AnalysisList from "./pages/teacher/AnalysisList";
import CreateAnalysis from "./pages/teacher/CreateAnalysis";
import EditAnalysis from "./pages/teacher/EditAnalysis";

// ADMIN PAGES

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import LeadManagementScreen from "./pages/admin/LeadManagementScreen";
import Payments from "./pages/admin/Payments";
import Invoices from "./pages/admin/Invoices";

// OTHER PAGES

import LiveMarkets from "./pages/LiveMarkets";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Support from "./pages/Support";
import LiveCoursesPage from "./pages/LiveCoursesPage";
import StudentMarketAnalysisScreen from "./pages/student/StudentMarketAnalysisScreen";
import StudentMarketAnalysisDetailsScreen from "./pages/student/StudentMarketAnalysisDetailsScreen";
import LeadDetailsScreen from "./pages/admin/LeadDetailsScreen";
import AdmissionScreen from "./pages/AdmissionScreen";
import AdmissionManagementScreen from "./pages/admin/AdmissionManagementScreen";
import AdmissionDetailsScreen from "./pages/admin/AdmissionDetailsScreen";
import ChangePasswordScreen from "./pages/ChangePasswordScreen";

const App = () => {
  const dispatch = useDispatch();

  // ================= CHECK AUTH ON APP LOAD =================

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

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

        <Route path="/admission" element={<AdmissionScreen />} />

        {/* LIVE MARKETS */}

        <Route path="/live" element={<LiveMarkets />} />

        {/* LOGIN */}

        <Route path="/login" element={<Login />} />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePasswordScreen />
            </ProtectedRoute>
          }
        />

        {/* ================= STUDENT DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />

          <Route path="courses" element={<MyCourses />} />

          <Route path="profile" element={<StudentProfile />} />

          <Route path="live-courses" element={<MyLiveCourses />} />

          <Route path="payment" element={<PaymentScreen />} />

          <Route
            path="/dashboard/market-analysis"
            element={<StudentMarketAnalysisScreen />}
          />

          <Route
            path="/dashboard/market-analysis/:id"
            element={<StudentMarketAnalysisDetailsScreen />}
          />
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
          <Route index element={<TeacherDashboard />} />

          <Route path="profile" element={<TeacherProfile />} />

          <Route path="courses" element={<TeacherCourses />} />

          <Route path="live-courses" element={<TeacherLiveCourses />} />

          <Route path="create-live-course" element={<CreateLiveCourse />} />

          <Route path="analysis" element={<AnalysisList />} />

          <Route path="analysis/create" element={<CreateAnalysis />} />

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

          <Route path="leads/:id" element={<LeadDetailsScreen />} />

          <Route path="admissions" element={<AdmissionManagementScreen />} />

          <Route path="admissions/:id" element={<AdmissionDetailsScreen />} />
        </Route>

        {/* OTHER PAGES */}

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/terms-conditions" element={<TermsConditions />} />

        <Route path="/support" element={<Support />} />
      </Routes>
    </>
  );
};

export default App;
