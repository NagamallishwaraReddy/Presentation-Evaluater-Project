import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Predefined realistic demo accounts for instant 1-click test login
export const DEMO_ACCOUNTS = [
  {
    id: 'user-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'Password123!',
    role: 'Pro Presenter',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    memberSince: 'May 20, 2024',
    stats: {
      evaluationsCount: 14,
      avgScore: 88,
      clarityScore: 94,
      paceWpm: 135,
      totalHours: 5.4,
      fillerWordRate: '1.1%',
    },
    recentEvaluations: [
      { id: 'eval-1', title: 'Q3 Product Strategy Pitch', date: 'Yesterday', score: 92, status: 'Excellent', pace: '138 wpm' },
      { id: 'eval-2', title: 'AI Pitch Deck Keynote', date: '3 days ago', score: 87, status: 'Strong', pace: '132 wpm' },
      { id: 'eval-3', title: 'Engineering All-Hands Intro', date: 'Last week', score: 85, status: 'Good', pace: '141 wpm' },
    ],
  },
  {
    id: 'user-002',
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@presanalyzer.ai',
    password: 'CoachPass#2026',
    role: 'Executive Speech Coach',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    memberSince: 'Jan 12, 2024',
    stats: {
      evaluationsCount: 42,
      avgScore: 96,
      clarityScore: 98,
      paceWpm: 128,
      totalHours: 18.2,
      fillerWordRate: '0.4%',
    },
    recentEvaluations: [
      { id: 'eval-4', title: 'TEDx Masterclass Rehearsal', date: '2 days ago', score: 98, status: 'Mastery', pace: '126 wpm' },
      { id: 'eval-5', title: 'Board of Directors Briefing', date: 'May 18', score: 95, status: 'Executive', pace: '130 wpm' },
    ],
  },
  {
    id: 'user-003',
    name: 'Alex Rivera',
    email: 'alex.rivera@speakerhub.io',
    password: 'SpeakerPro!7',
    role: 'Student & Debate Speaker',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    memberSince: 'March 04, 2024',
    stats: {
      evaluationsCount: 8,
      avgScore: 82,
      clarityScore: 88,
      paceWpm: 148,
      totalHours: 3.1,
      fillerWordRate: '2.4%',
    },
    recentEvaluations: [
      { id: 'eval-6', title: 'University Debate Final', date: 'Apr 28', score: 84, status: 'Good', pace: '146 wpm' },
    ],
  },
];

export const AuthProvider = ({ children }) => {
  // Master Pool of all users (combines initial demo accounts + registered/admin created users)
  const [allUsers, setAllUsers] = useState(() => {
    const saved = localStorage.getItem('pres_all_users_pool');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        // fallback
      }
    }
    return DEMO_ACCOUNTS;
  });

  // Active User session
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pres_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return DEMO_ACCOUNTS[0];
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('pres_auth_token') || 'mock-jwt-token-xyz-presentation-evaluator';
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [lastResetEmail, setLastResetEmail] = useState('');

  // Auth System & Security Settings
  const [authSettings, setAuthSettings] = useState(() => {
    const saved = localStorage.getItem('pres_auth_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      provider: 'Simulated JWT + LocalStorage',
      tokenExpiry: '24 Hours (Standard)',
      requireEmailVerification: false,
      strictPasswordPolicy: true,
      enableDemoQuickLogin: true,
      enableCapsLockAlert: true,
    };
  });

  // Evaluator scoring parameters
  const [evaluatorSettings, setEvaluatorSettings] = useState(() => {
    const saved = localStorage.getItem('pres_eval_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      targetWpmMin: 125,
      targetWpmMax: 155,
      fillerSensitivity: 'Strict',
      clarityWeight: 40,
      bodyLanguageWeight: 35,
      structureWeight: 25,
    };
  });

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('pres_audit_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 'log-1', type: 'security', action: 'System Initialized', user: 'System', details: 'Auth Engine loaded with 3 default accounts', timestamp: 'Today 10:00 AM' },
      { id: 'log-2', type: 'login', action: 'JWT Token Issued', user: 'john.doe@example.com', details: 'Session active on presentation-evaluator-app', timestamp: 'Today 10:05 AM' },
    ];
  });

  // Sync users pool to localStorage
  useEffect(() => {
    localStorage.setItem('pres_all_users_pool', JSON.stringify(allUsers));
  }, [allUsers]);

  // Sync session changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('pres_auth_user', JSON.stringify(user));
      if (!localStorage.getItem('pres_auth_token')) {
        const mockToken = `jwt_${user.id}_${Date.now()}`;
        setToken(mockToken);
        localStorage.setItem('pres_auth_token', mockToken);
      }
    } else {
      localStorage.removeItem('pres_auth_user');
      localStorage.removeItem('pres_auth_token');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pres_auth_settings', JSON.stringify(authSettings));
  }, [authSettings]);

  useEffect(() => {
    localStorage.setItem('pres_eval_settings', JSON.stringify(evaluatorSettings));
  }, [evaluatorSettings]);

  useEffect(() => {
    localStorage.setItem('pres_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Helper to append an audit log
  const recordAudit = (type, action, userName, details) => {
    const newLog = {
      id: `log-${Date.now()}`,
      type,
      action,
      user: userName || 'Anonymous',
      details,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  // Toast manager
  const addToast = (title, message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    if (duration) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Login handler
  const login = async (email, password, rememberMe = false) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const trimmedEmail = email.trim().toLowerCase();
    const matchedUser = allUsers.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (matchedUser) {
      if (matchedUser.status === 'Suspended') {
        setIsLoading(false);
        addToast('Account Suspended', 'This account has been temporarily suspended by the administrator.', 'error');
        recordAudit('security', 'Login Blocked', trimmedEmail, 'Attempt to login to a suspended account');
        return { success: false, error: 'Suspended' };
      }

      setUser(matchedUser);
      const generatedToken = `jwt_${matchedUser.id}_${Date.now()}`;
      setToken(generatedToken);
      if (rememberMe) {
        localStorage.setItem('pres_remember_email', trimmedEmail);
      } else {
        localStorage.removeItem('pres_remember_email');
      }
      setIsLoading(false);
      addToast('Login Successful', `Welcome back, ${matchedUser.name}!`, 'success');
      recordAudit('login', 'User Logged In', matchedUser.email, `Session created using ${authSettings.provider}`);
      return { success: true, user: matchedUser };
    }

    // Dynamic user registration on the fly for any custom email entered
    const fallbackUser = {
      id: `user-${Date.now()}`,
      name: trimmedEmail.split('@')[0].replace('.', ' ').toUpperCase(),
      email: trimmedEmail,
      password: password || 'Password123!',
      role: 'Standard Presenter',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      stats: {
        evaluationsCount: 1,
        avgScore: 85,
        clarityScore: 90,
        paceWpm: 130,
        totalHours: 0.5,
        fillerWordRate: '1.5%',
      },
      recentEvaluations: [
        { id: 'eval-new', title: 'Sample Initial Presentation', date: 'Just now', score: 85, status: 'Good', pace: '130 wpm' },
      ],
    };

    setAllUsers((prev) => [...prev, fallbackUser]);
    setUser(fallbackUser);
    const fallbackToken = `jwt_${fallbackUser.id}_${Date.now()}`;
    setToken(fallbackToken);
    setIsLoading(false);
    addToast('Welcome to PresAnalyzer', `Signed in as ${fallbackUser.name}`, 'success');
    recordAudit('login', 'New User Provisioned', fallbackUser.email, 'Auto-provisioned on first login');
    return { success: true, user: fallbackUser };
  };

  // Signup handler
  const signup = async (fullName, email, password) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const trimmedEmail = email.trim().toLowerCase();
    const newUser = {
      id: `user-${Date.now()}`,
      name: fullName.trim(),
      email: trimmedEmail,
      password: password,
      role: 'New Presenter',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      stats: {
        evaluationsCount: 0,
        avgScore: 0,
        clarityScore: 0,
        paceWpm: 0,
        totalHours: 0,
        fillerWordRate: '0%',
      },
      recentEvaluations: [],
    };

    setAllUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    const newToken = `jwt_${newUser.id}_${Date.now()}`;
    setToken(newToken);
    setIsLoading(false);
    addToast('Account Created!', `Welcome to PresAnalyzer, ${newUser.name}!`, 'success');
    recordAudit('signup', 'New Registration', newUser.email, `Created account as ${newUser.role}`);
    return { success: true, user: newUser };
  };

  // Forgot password handler
  const forgotPassword = async (email) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setLastResetEmail(email);
    setIsLoading(false);
    addToast('Reset Link Sent', `Password reset instructions sent to ${email}`, 'info');
    recordAudit('security', 'Reset Link Dispatched', email, 'Password recovery link requested');
    return { success: true, email };
  };

  // Reset password simulation
  const resetPassword = async (email, newPassword) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    setAllUsers((prev) =>
      prev.map((u) => (u.email.toLowerCase() === email.toLowerCase() ? { ...u, password: newPassword } : u))
    );

    if (user && user.email.toLowerCase() === email.toLowerCase()) {
      setUser((prev) => ({ ...prev, password: newPassword }));
    }

    setIsLoading(false);
    addToast('Password Updated', 'Your password has been successfully reset. You can now login.', 'success');
    recordAudit('security', 'Password Reset Completed', email, 'New password applied via recovery flow');
    return { success: true };
  };

  // Update profile handler
  const updateProfile = async (updatedFields) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      setAllUsers((pool) => pool.map((u) => (u.id === updated.id ? updated : u)));
      return updated;
    });
    setIsLoading(false);
    addToast('Profile Updated', 'Your profile details have been saved successfully.', 'success');
    recordAudit('profile', 'Profile Updated', user?.email, 'User updated avatar or biographical details');
    return { success: true };
  };

  // Change password handler
  const changePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (user) {
      const updated = { ...user, password: newPassword };
      setUser(updated);
      setAllUsers((pool) => pool.map((u) => (u.id === user.id ? updated : u)));
    }

    setIsLoading(false);
    addToast('Password Changed', 'Your security password was successfully updated.', 'success');
    recordAudit('security', 'Password Changed', user?.email, 'User changed password from Profile settings');
    return { success: true };
  };

  // Quick 1-click demo login
  const quickDemoLogin = (email) => {
    const demo = allUsers.find((d) => d.email.toLowerCase() === email.toLowerCase()) || DEMO_ACCOUNTS.find((d) => d.email.toLowerCase() === email.toLowerCase());
    if (demo) {
      setUser(demo);
      const generatedToken = `jwt_${demo.id}_${Date.now()}`;
      setToken(generatedToken);
      addToast('Demo Login', `Switched active account to ${demo.name} (${demo.role})`, 'info');
      recordAudit('login', 'Quick Demo Login', demo.email, 'Instant switch via 1-Click tester');
      return true;
    }
    return false;
  };

  // Logout handler
  const logout = () => {
    if (user) {
      recordAudit('security', 'User Logged Out', user.email, 'Session terminated');
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('pres_auth_user');
    localStorage.removeItem('pres_auth_token');
    addToast('Logged Out', 'You have been safely signed out.', 'info');
  };

  // ADMIN METHODS
  const addNewUser = (newUserObj) => {
    const userWithId = {
      id: `user-${Date.now()}`,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      stats: {
        evaluationsCount: 0,
        avgScore: 0,
        clarityScore: 0,
        paceWpm: 0,
        totalHours: 0,
        fillerWordRate: '0%',
      },
      recentEvaluations: [],
      ...newUserObj,
    };
    setAllUsers((prev) => [userWithId, ...prev]);
    addToast('User Added', `Created account for ${userWithId.name}`, 'success');
    recordAudit('admin', 'User Created by Admin', userWithId.email, `Role: ${userWithId.role}`);
  };

  const updateUserByAdmin = (userId, updatedFields) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updatedFields } : u))
    );
    if (user && user.id === userId) {
      setUser((prev) => ({ ...prev, ...updatedFields }));
    }
    addToast('User Updated', 'User account details updated successfully.', 'success');
    recordAudit('admin', 'User Modified by Admin', userId, 'Admin modified user record');
  };

  const deleteUserByAdmin = (userId) => {
    setAllUsers((prev) => prev.filter((u) => u.id !== userId));
    if (user && user.id === userId) {
      logout();
    }
    addToast('User Deleted', 'Account removed from system.', 'info');
    recordAudit('admin', 'User Deleted by Admin', userId, 'Account removed from user pool');
  };

  const toggleUserStatus = (userId) => {
    setAllUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'Suspended' ? 'Active' : 'Suspended';
          recordAudit('admin', `User Status: ${nextStatus}`, u.email, `Toggled status to ${nextStatus}`);
          addToast('Status Changed', `User ${u.name} is now ${nextStatus}`, 'info');
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const updateAuthSettings = (newSettings) => {
    setAuthSettings((prev) => ({ ...prev, ...newSettings }));
    addToast('Auth Settings Updated', 'Security and authentication engine policies updated.', 'success');
    recordAudit('admin', 'Auth Settings Updated', 'Admin', 'Updated JWT or provider config');
  };

  const updateEvaluatorSettings = (newEvalSettings) => {
    setEvaluatorSettings((prev) => ({ ...prev, ...newEvalSettings }));
    addToast('Evaluation Rules Saved', 'Speech analysis parameters and weights updated.', 'success');
    recordAudit('admin', 'AI Rules Updated', 'Admin', 'Updated WPM & scoring weights');
  };

  const clearAuditLogs = () => {
    setAuditLogs([]);
    addToast('Logs Cleared', 'Audit trail has been reset.', 'info');
  };

  const resetAllToDefaults = () => {
    setAllUsers(DEMO_ACCOUNTS);
    setUser(DEMO_ACCOUNTS[0]);
    setAuditLogs([
      { id: 'log-reset', type: 'security', action: 'Factory Reset', user: 'Admin', details: 'Restored default users and config', timestamp: 'Just now' }
    ]);
    localStorage.removeItem('pres_registered_users');
    localStorage.removeItem('pres_all_users_pool');
    addToast('Factory Reset Complete', 'All users and settings restored to default.', 'success');
  };

  const exportDataAsJSON = () => {
    const payload = {
      exportDate: new Date().toISOString(),
      allUsers,
      authSettings,
      evaluatorSettings,
      auditLogs,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `presentation-evaluator-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('Export Successful', 'Database JSON backup downloaded.', 'success');
  };

  const importDataFromJSON = (jsonData) => {
    if (jsonData && Array.isArray(jsonData.allUsers)) {
      setAllUsers(jsonData.allUsers);
      if (jsonData.authSettings) setAuthSettings(jsonData.authSettings);
      if (jsonData.evaluatorSettings) setEvaluatorSettings(jsonData.evaluatorSettings);
      if (jsonData.auditLogs) setAuditLogs(jsonData.auditLogs);
      addToast('Import Successful', 'Restored users and config from JSON backup.', 'success');
    } else {
      addToast('Import Error', 'Invalid format. Must contain allUsers array.', 'error');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        token,
        isLoading,
        toasts,
        addToast,
        removeToast,
        login,
        signup,
        forgotPassword,
        resetPassword,
        updateProfile,
        changePassword,
        logout,
        quickDemoLogin,
        demoAccounts: DEMO_ACCOUNTS,
        lastResetEmail,
        // Admin Features
        allUsers,
        addNewUser,
        updateUserByAdmin,
        deleteUserByAdmin,
        toggleUserStatus,
        authSettings,
        updateAuthSettings,
        evaluatorSettings,
        updateEvaluatorSettings,
        auditLogs,
        clearAuditLogs,
        resetAllToDefaults,
        exportDataAsJSON,
        importDataFromJSON,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
