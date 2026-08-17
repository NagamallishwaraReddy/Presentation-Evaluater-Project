import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import { LandingPage } from "./pages/LandingPage";
import { AuthLayout } from "./layouts/AuthLayout";

import { Login } from "./auth/Login";
import { Signup } from "./auth/Signup";
import { ForgotPassword } from "./auth/ForgotPassword";
import { Profile } from "./auth/Profile";

import { Dashboard } from "./pages/Dashboard";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { ToastContainer } from "./components/Toast";

/* Dashboard module */
import Layout from "./components/Layout";
import Home from "./pages/Home";
import RecentPresentations from "./pages/RecentPresentations";
import Settings from "./pages/Settings";

/* Upload module */
import UploadBox from "./components/UploadBox";
import UploadGuidelines from "./components/UploadGuidelines";
import SelectedFile from "./components/SelectedFile";
import AcceptedFileTypes from "./components/AcceptedFileTypes";

import { AlertCircle } from "lucide-react";
import { useState } from "react";

/* =========================================================
   UPLOAD PRESENTATION PAGE
   ========================================================= */

function UploadPresentation() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileSelected = (file) => {
    setSelectedFile(file);
    setErrorMessage("");
    setUploadSuccess(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadSuccess(false);
    setErrorMessage("");
  };

  const handleUploadFile = () => {
    if (!selectedFile || isUploading) return;

    setIsUploading(true);
    setUploadSuccess(false);

    // Temporary mock upload.
    // Replace this later with your Spring Boot API call.
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 1800);
  };

  return (
    <div className="page">
      <main className="main-content">

        <div className="page-heading">
          <h1>Upload Presentation</h1>

          <p>
            Upload your presentation file (PPT, PDF) or video (MP4)
            for evaluation
          </p>
        </div>

        {errorMessage && (
          <div className="error-banner">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="upload-section">

          <UploadBox
            onFileSelected={handleFileSelected}
            onError={setErrorMessage}
          />

          <UploadGuidelines />

        </div>

        <SelectedFile
          file={selectedFile}
          onRemove={handleRemoveFile}
          onUpload={handleUploadFile}
          isUploading={isUploading}
          uploadSuccess={uploadSuccess}
        />

        <AcceptedFileTypes />

      </main>
    </div>
  );
}

/* =========================================================
   AUTHENTICATION / LANDING PAGE ROUTES
   ========================================================= */

function LandingPageRoute() {
  const navigate = useNavigate();

  return (
    <LandingPage
      onNavigate={(page) => {
        if (page === "home") {
          navigate("/");
        } else {
          navigate(`/${page}`);
        }
      }}
    />
  );
}

function LoginRoute() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account"
      activePage="login"
      onNavigate={(page) => navigate(`/${page}`)}
    >
      <Login
        onNavigate={(page) => navigate(`/${page}`)}
      />
    </AuthLayout>
  );
}

function SignupRoute() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Register to get started with speech evaluations"
      activePage="signup"
      onNavigate={(page) => navigate(`/${page}`)}
    >
      <Signup
        onNavigate={(page) => navigate(`/${page}`)}
      />
    </AuthLayout>
  );
}

function ForgotPasswordRoute() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive recovery instructions"
      activePage="forgot-password"
      onNavigate={(page) => navigate(`/${page}`)}
    >
      <ForgotPassword
        onNavigate={(page) => navigate(`/${page}`)}
      />
    </AuthLayout>
  );
}

function ProfileRoute() {
  const navigate = useNavigate();

  return (
    <ProtectedRoute
      onNavigate={(page) => navigate(`/${page}`)}
    >
      <Profile
        onNavigate={(page) => navigate(`/${page}`)}
      />
    </ProtectedRoute>
  );
}

function DashboardRoute() {
  const navigate = useNavigate();

  return (
    <ProtectedRoute
      onNavigate={(page) => navigate(`/${page}`)}
    >
      <Dashboard
        onNavigate={(page) => navigate(`/${page}`)}
      />
    </ProtectedRoute>
  );
}

/* =========================================================
   MAIN APPLICATION
   ========================================================= */

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>

        <div
          style={{
            position: "relative",
            minHeight: "100vh",
            backgroundColor: "var(--bg-app)",
          }}
        >

          <Routes>

            {/* =========================
                AUTH / LANDING
               ========================= */}

            <Route
              path="/"
              element={<LandingPageRoute />}
            />

            <Route
              path="/login"
              element={<LoginRoute />}
            />

            <Route
              path="/signup"
              element={<SignupRoute />}
            />

            <Route
              path="/forgot-password"
              element={<ForgotPasswordRoute />}
            />

            <Route
              path="/profile"
              element={<ProfileRoute />}
            />

            {/* =========================
                DASHBOARD
               ========================= */}

            <Route
              path="/dashboard"
              element={<DashboardRoute />}
            />

            {/* =========================
                DASHBOARD MEMBER PAGES
               ========================= */}

            <Route element={<Layout />}>

              <Route
                path="/home"
                element={<Home />}
              />

              <Route
                path="/recent-presentations"
                element={<RecentPresentations />}
              />

              <Route
                path="/settings"
                element={<Settings />}
              />

              {/* Upload Presentation */}
              <Route
                path="/upload"
                element={<UploadPresentation />}
              />

            </Route>

            {/* =========================
                FALLBACK
               ========================= */}

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>

          {/* Global Toast Notifications */}
          <ToastContainer />

        </div>

      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;