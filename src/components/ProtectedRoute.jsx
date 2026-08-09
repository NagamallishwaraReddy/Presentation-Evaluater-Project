import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, onNavigate }) => {
  const { isAuthenticated, addToast } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      addToast('Protected Route', 'Please login to access this area.', 'warning');
      if (onNavigate) {
        onNavigate('login');
      }
    }
  }, [isAuthenticated, onNavigate, addToast]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
};
