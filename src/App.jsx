import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { AuthLayout } from './layouts/AuthLayout';
import { Login } from './auth/Login';
import { Signup } from './auth/Signup';
import { ForgotPassword } from './auth/ForgotPassword';
import { Profile } from './auth/Profile';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ToastContainer } from './components/Toast';

const AppContent = () => {
  // Navigation State: 'home' | 'login' | 'signup' | 'forgot-password' | 'profile' | 'dashboard'
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={setCurrentPage} />;

      case 'signup':
        return (
          <AuthLayout
            title="Create Account"
            subtitle="Register to get started with speech evaluations"
            activePage="signup"
            onNavigate={setCurrentPage}
          >
            <Signup onNavigate={setCurrentPage} />
          </AuthLayout>
        );

      case 'forgot-password':
        return (
          <AuthLayout
            title="Forgot Password"
            subtitle="Enter your email to receive recovery instructions"
            activePage="forgot-password"
            onNavigate={setCurrentPage}
          >
            <ForgotPassword onNavigate={setCurrentPage} />
          </AuthLayout>
        );

      case 'profile':
        return (
          <ProtectedRoute onNavigate={setCurrentPage}>
            <Profile onNavigate={setCurrentPage} />
          </ProtectedRoute>
        );

      case 'dashboard':
        return (
          <ProtectedRoute onNavigate={setCurrentPage}>
            <Dashboard onNavigate={setCurrentPage} />
          </ProtectedRoute>
        );

      case 'login':
      default:
        return (
          <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to your account"
            activePage="login"
            onNavigate={setCurrentPage}
          >
            <Login onNavigate={setCurrentPage} />
          </AuthLayout>
        );
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      {/* Active Page View */}
      {renderCurrentView()}

      {/* Global Notification Alerts */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
