import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  LogoIcon,
  UserIcon,
  ShieldIcon,
  SettingsIcon,
  KeyIcon,
  MailIcon,
  LockIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  SparklesIcon,
  ArrowRightIcon,
  PaletteIcon,
  ChartIcon,
  RefreshIcon,
  LogoutIcon,
  SunIcon,
  MoonIcon
} from '../components/icons/Icons';

export const AdminPanel = ({ onNavigate }) => {
  const {
    user,
    allUsers,
    addNewUser,
    updateUserByAdmin,
    deleteUserByAdmin,
    toggleUserStatus,
    authSettings,
    updateAuthSettings,
    auditLogs,
    clearAuditLogs,
    resetAllToDefaults,
    exportDataAsJSON,
    importDataFromJSON,
    evaluatorSettings,
    updateEvaluatorSettings,
    addToast
  } = useAuth();

  const {
    brandName,
    brandTagline,
    brandAccent,
    setBrandAccent,
    logoType,
    setLogoType,
    themeMode,
    toggleThemeMode,
    updateBranding,
    presets,
    logoTypes
  } = useTheme();

  // Active Admin Tabs: 'users' | 'auth-config' | 'branding' | 'eval-rules' | 'audit-logs' | 'backup'
  const [activeTab, setActiveTab] = useState('users');

  // New User Form State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Pro Presenter');
  const [newUserPassword, setNewUserPassword] = useState('Welcome2026!');

  // Edit User Modal State
  const [editingUser, setEditingUser] = useState(null);

  // Local state for Branding form
  const [customBrandName, setCustomBrandName] = useState(brandName);
  const [customTagline, setCustomTagline] = useState(brandTagline);

  // Local state for Evaluator Settings
  const [targetWpmMin, setTargetWpmMin] = useState(evaluatorSettings?.targetWpmMin || 125);
  const [targetWpmMax, setTargetWpmMax] = useState(evaluatorSettings?.targetWpmMax || 155);
  const [fillerSensitivity, setFillerSensitivity] = useState(evaluatorSettings?.fillerSensitivity || 'Strict');
  const [clarityWeight, setClarityWeight] = useState(evaluatorSettings?.clarityWeight || 40);
  const [bodyLanguageWeight, setBodyLanguageWeight] = useState(evaluatorSettings?.bodyLanguageWeight || 35);
  const [structureWeight, setStructureWeight] = useState(evaluatorSettings?.structureWeight || 25);

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      addToast('Validation Error', 'Please provide a valid name and email.', 'error');
      return;
    }

    addNewUser({
      name: newUserName.trim(),
      email: newUserEmail.trim().toLowerCase(),
      role: newUserRole,
      password: newUserPassword,
      status: 'Active'
    });

    setNewUserName('');
    setNewUserEmail('');
    setNewUserPassword('Welcome2026!');
    setIsAddUserModalOpen(false);
  };

  const handleSaveEditUser = (e) => {
    e.preventDefault();
    if (!editingUser) return;
    updateUserByAdmin(editingUser.id, editingUser);
    setEditingUser(null);
  };

  const handleSaveBranding = (e) => {
    e.preventDefault();
    updateBranding({
      name: customBrandName,
      tagline: customTagline
    });
    addToast('Branding Saved', 'Application branding and titles updated live across all pages.', 'success');
  };

  const handleSaveEvaluatorSettings = (e) => {
    e.preventDefault();
    updateEvaluatorSettings({
      targetWpmMin: Number(targetWpmMin),
      targetWpmMax: Number(targetWpmMax),
      fillerSensitivity,
      clarityWeight: Number(clarityWeight),
      bodyLanguageWeight: Number(bodyLanguageWeight),
      structureWeight: Number(structureWeight),
    });
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        importDataFromJSON(parsed);
      } catch (err) {
        addToast('Import Failed', 'Invalid JSON file structure.', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)', position: 'relative' }}>
      {/* Ambient background glows */}
      <div className="ambient-glow-wrapper">
        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />
      </div>

      {/* Admin Panel Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.875rem 2rem',
          backgroundColor: 'var(--bg-glass)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            onClick={() => onNavigate && onNavigate('dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            <LogoIcon type={logoType} size={30} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 800 }}>{brandName}</span>
                <span className="badge badge-primary" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Admin Panel
                </span>
              </div>
              <span style={{ display: 'block', fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                SEPARATE CONTROL PANEL • SYSTEM CUSTOMIZATION
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls & Navigation back to User Views */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => onNavigate && onNavigate('dashboard')}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
          >
            ← Back to Dashboard
          </button>

          <button
            onClick={() => onNavigate && onNavigate('login')}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
          >
            Go to Login Page
          </button>

          <button
            onClick={toggleThemeMode}
            className="btn-secondary"
            style={{ padding: '0.45rem 0.75rem' }}
            title="Toggle Light/Dark Theme"
          >
            {themeMode === 'dark' ? <SunIcon size={16} className="text-warning" /> : <MoonIcon size={16} className="text-primary" />}
          </button>
        </div>
      </header>

      {/* Main Admin Content Layout */}
      <div style={{ display: 'flex', flex: 1, position: 'relative', zIndex: 10 }}>
        {/* Left Navigation Sidebar */}
        <aside
          style={{
            width: '260px',
            backgroundColor: 'var(--sidebar-bg)',
            borderRight: '1px solid var(--sidebar-border)',
            padding: '1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ padding: '0 0.75rem 0.75rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Control Modules
            </div>

            <button
              onClick={() => setActiveTab('users')}
              className={`sidebar-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            >
              <UserIcon size={18} />
              <span>User Management</span>
              <span className="badge badge-primary" style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>
                {allUsers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('auth-config')}
              className={`sidebar-nav-item ${activeTab === 'auth-config' ? 'active' : ''}`}
            >
              <ShieldIcon size={18} />
              <span>Auth & Security Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('branding')}
              className={`sidebar-nav-item ${activeTab === 'branding' ? 'active' : ''}`}
            >
              <PaletteIcon size={18} />
              <span>Branding & App UI</span>
            </button>

            <button
              onClick={() => setActiveTab('eval-rules')}
              className={`sidebar-nav-item ${activeTab === 'eval-rules' ? 'active' : ''}`}
            >
              <SparklesIcon size={18} />
              <span>AI Evaluation Rules</span>
            </button>

            <button
              onClick={() => setActiveTab('audit-logs')}
              className={`sidebar-nav-item ${activeTab === 'audit-logs' ? 'active' : ''}`}
            >
              <ChartIcon size={18} />
              <span>Audit & Session Logs</span>
              <span className="badge badge-secondary" style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>
                {auditLogs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('backup')}
              className={`sidebar-nav-item ${activeTab === 'backup' ? 'active' : ''}`}
            >
              <SettingsIcon size={18} />
              <span>Data Export & Reset</span>
            </button>
          </div>

          {/* Quick System Status Card */}
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-input)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.78rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', fontWeight: 700 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
              <span>System Online</span>
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>
              Auth Mode: <strong>{authSettings.provider}</strong>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '0.25rem' }}>
              JWT Expiry: {authSettings.tokenExpiry}
            </div>
          </div>
        </aside>

        {/* Right Tab Content Panel */}
        <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          {/* TAB 1: USER MANAGEMENT */}
          {activeTab === 'users' && (
            <div style={{ animation: 'fadeIn 0.25s ease-out' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                    User Accounts & Roles
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Manage registered speakers, demo accounts, roles, passwords, and access status.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="btn-primary"
                  style={{ width: 'auto', padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                >
                  + Add New User
                </button>
              </div>

              {/* Users Table */}
              <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-input)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <th style={{ padding: '1rem 1.25rem' }}>User / Speaker</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Email</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Role</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Status</th>
                      <th style={{ padding: '1rem 1.25rem' }}>Evaluations</th>
                      <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((u) => (
                      <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.15s ease' }}>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img
                              src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                              alt={u.name}
                              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                            />
                            <div>
                              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{u.name}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {u.id}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                          {u.email}
                        </td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <span
                            className={`badge ${
                              u.role.includes('Coach') || u.role.includes('Admin')
                                ? 'badge-primary'
                                : u.role.includes('Pro')
                                ? 'badge-info'
                                : 'badge-secondary'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 1.25rem' }}>
                          <button
                            onClick={() => toggleUserStatus(u.id)}
                            style={{
                              padding: '0.2rem 0.6rem',
                              borderRadius: 'var(--radius-sm)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              border: 'none',
                              backgroundColor: u.status === 'Suspended' ? 'var(--error-bg)' : 'var(--success-bg)',
                              color: u.status === 'Suspended' ? 'var(--error)' : 'var(--success)',
                            }}
                            title="Click to toggle status"
                          >
                            {u.status || 'Active'}
                          </button>
                        </td>
                        <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                          {u.stats?.evaluationsCount || 0} speeches
                        </td>
                        <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button
                              onClick={() => setEditingUser({ ...u })}
                              className="btn-secondary"
                              style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete user "${u.name}"?`)) {
                                  deleteUserByAdmin(u.id);
                                }
                              }}
                              style={{
                                padding: '0.3rem 0.65rem',
                                fontSize: '0.75rem',
                                backgroundColor: 'var(--error-bg)',
                                color: 'var(--error)',
                                border: '1px solid var(--error)',
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer',
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: AUTH & SECURITY ENGINE CONFIG */}
          {activeTab === 'auth-config' && (
            <div style={{ animation: 'fadeIn 0.25s ease-out' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Auth & Security Engine</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Configure JWT Token policies, Firebase Auth mode, password rules, and session controls.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {/* Auth Mode Switcher */}
                <div className="glass-card">
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldIcon size={18} className="text-primary" />
                    Authentication Provider Mode
                  </h3>

                  <div className="form-group">
                    <label className="form-label">Active Auth Engine</label>
                    <select
                      className="form-input"
                      value={authSettings.provider}
                      onChange={(e) => updateAuthSettings({ provider: e.target.value })}
                    >
                      <option value="Simulated JWT + LocalStorage">Simulated JWT + LocalStorage (Recommended)</option>
                      <option value="Firebase Authentication">Firebase Authentication Client</option>
                      <option value="Axios REST API Token Auth">Axios REST API Token Auth</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">JWT Token Expiry</label>
                    <select
                      className="form-input"
                      value={authSettings.tokenExpiry}
                      onChange={(e) => updateAuthSettings({ tokenExpiry: e.target.value })}
                    >
                      <option value="15 Minutes (High Security)">15 Minutes (High Security)</option>
                      <option value="1 Hour">1 Hour</option>
                      <option value="24 Hours (Standard)">24 Hours (Standard)</option>
                      <option value="7 Days (Remember Me)">7 Days (Remember Me)</option>
                      <option value="30 Days">30 Days</option>
                    </select>
                  </div>
                </div>

                {/* Security Policies */}
                <div className="glass-card">
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <LockIcon size={18} className="text-primary" />
                    Security & Signup Policies
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={authSettings.requireEmailVerification}
                        onChange={(e) => updateAuthSettings({ requireEmailVerification: e.target.checked })}
                      />
                      <span className="checkbox-custom">{authSettings.requireEmailVerification && '✓'}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Require Email Verification</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Send confirmation link before account activation</div>
                      </div>
                    </label>

                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={authSettings.strictPasswordPolicy}
                        onChange={(e) => updateAuthSettings({ strictPasswordPolicy: e.target.checked })}
                      />
                      <span className="checkbox-custom">{authSettings.strictPasswordPolicy && '✓'}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Strict Password Strength</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enforce uppercase, number, and special character</div>
                      </div>
                    </label>

                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={authSettings.enableDemoQuickLogin}
                        onChange={(e) => updateAuthSettings({ enableDemoQuickLogin: e.target.checked })}
                      />
                      <span className="checkbox-custom">{authSettings.enableDemoQuickLogin && '✓'}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Show 1-Click Demo Login Box</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Allow reviewers to test instantly without credentials</div>
                      </div>
                    </label>

                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={authSettings.enableCapsLockAlert}
                        onChange={(e) => updateAuthSettings({ enableCapsLockAlert: e.target.checked })}
                      />
                      <span className="checkbox-custom">{authSettings.enableCapsLockAlert && '✓'}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Caps Lock Indicator on Password Input</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Warns user when Caps Lock is accidentally active</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BRANDING & APP UI */}
          {activeTab === 'branding' && (
            <div style={{ animation: 'fadeIn 0.25s ease-out' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Branding & App Identity</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Live customization of App Name, Tagline, Logo style, and Color Palettes.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {/* Brand Details Form */}
                <form onSubmit={handleSaveBranding} className="glass-card">
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                    Brand Identity
                  </h3>

                  <div className="form-group">
                    <label className="form-label">Brand / Application Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={customBrandName}
                      onChange={(e) => setCustomBrandName(e.target.value)}
                      placeholder="e.g. Presentation Evaluator or PresAnalyzer"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Brand Tagline / Slogan</label>
                    <input
                      type="text"
                      className="form-input"
                      value={customTagline}
                      onChange={(e) => setCustomTagline(e.target.value)}
                      placeholder="e.g. AI-Powered Speech & Delivery Evaluator"
                      required
                    />
                  </div>

                  {/* Logo Type Selector */}
                  <div className="form-group">
                    <label className="form-label">Logo Icon Symbol</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                      {logoTypes.map((lt) => (
                        <button
                          key={lt.id}
                          type="button"
                          onClick={() => setLogoType(lt.id)}
                          style={{
                            padding: '0.65rem',
                            borderRadius: 'var(--radius-md)',
                            border: `2px solid ${logoType === lt.id ? 'var(--primary)' : 'var(--border-color)'}`,
                            backgroundColor: logoType === lt.id ? 'var(--primary-focus)' : 'var(--bg-input)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                            textAlign: 'left',
                          }}
                        >
                          <LogoIcon type={lt.id} size={22} />
                          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {lt.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Accent Presets */}
                  <div className="form-group">
                    <label className="form-label">Color Accent Palette</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                      {presets.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setBrandAccent(p.id)}
                          style={{
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            border: `2px solid ${brandAccent === p.id ? 'var(--text-primary)' : 'transparent'}`,
                            backgroundColor: 'var(--bg-input)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: p.color }} />
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {p.name.split(' ')[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" style={{ marginTop: '0.75rem' }}>
                    Save Branding Updates
                  </button>
                </form>

                {/* Live Preview Card */}
                <div className="glass-card">
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                    Live App Header Preview
                  </h3>

                  <div
                    style={{
                      padding: '1.25rem',
                      backgroundColor: 'var(--bg-app)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <LogoIcon type={logoType} size={36} />
                    <div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {customBrandName || brandName}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {customTagline || brandTagline}
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '1rem', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>💡 Instant Sync:</div>
                    Changes made here immediately reflect on the <strong>Login</strong>, <strong>Signup</strong>, <strong>Forgot Password</strong>, <strong>Profile</strong>, and <strong>Dashboard</strong> pages.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI EVALUATION RULES */}
          {activeTab === 'eval-rules' && (
            <div style={{ animation: 'fadeIn 0.25s ease-out' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>AI Presentation Evaluator Rules</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Fine-tune speech analysis metrics, target WPM thresholds, and scoring multipliers.
                </p>
              </div>

              <form onSubmit={handleSaveEvaluatorSettings} className="glass-card" style={{ maxWidth: '680px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Optimal Pace (Min WPM)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={targetWpmMin}
                      onChange={(e) => setTargetWpmMin(e.target.value)}
                      min="80"
                      max="200"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Optimal Pace (Max WPM)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={targetWpmMax}
                      onChange={(e) => setTargetWpmMax(e.target.value)}
                      min="100"
                      max="220"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Filler Word Penalty Sensitivity</label>
                  <select
                    className="form-input"
                    value={fillerSensitivity}
                    onChange={(e) => setFillerSensitivity(e.target.value)}
                  >
                    <option value="Lenient">Lenient (Allow up to 3% fillers)</option>
                    <option value="Balanced">Balanced (Standard TEDx tolerance: 1.5%)</option>
                    <option value="Strict">Strict (Executive & Toastmasters level: &lt;1%)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span>Overall Score Weight Distribution</span>
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                        <span>Vocal Clarity & Tone ({clarityWeight}%)</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="70"
                        value={clarityWeight}
                        onChange={(e) => setClarityWeight(e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                        <span>Body Language & Eye Contact ({bodyLanguageWeight}%)</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="70"
                        value={bodyLanguageWeight}
                        onChange={(e) => setBodyLanguageWeight(e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                        <span>Speech Content & Structure ({structureWeight}%)</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="70"
                        value={structureWeight}
                        onChange={(e) => setStructureWeight(e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                  Save AI Scoring Rules
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: AUDIT LOGS & SESSIONS */}
          {activeTab === 'audit-logs' && (
            <div style={{ animation: 'fadeIn 0.25s ease-out' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Audit Logs & Live Session Stream</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Real-time security events, token generation, login attempts, and profile modifications.
                  </p>
                </div>

                <button
                  onClick={clearAuditLogs}
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
                >
                  Clear Logs
                </button>
              </div>

              <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ maxHeight: '480px', overflowY: 'auto' }}>
                  {auditLogs.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No audit events recorded yet.
                    </div>
                  ) : (
                    auditLogs.map((log) => (
                      <div
                        key={log.id}
                        style={{
                          padding: '0.85rem 1.25rem',
                          borderBottom: '1px solid var(--border-color)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.825rem',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span
                            className={`badge ${
                              log.type === 'login'
                                ? 'badge-primary'
                                : log.type === 'signup'
                                ? 'badge-info'
                                : log.type === 'security'
                                ? 'badge-warning'
                                : 'badge-secondary'
                            }`}
                            style={{ fontSize: '0.7rem' }}
                          >
                            {log.action}
                          </span>
                          <div>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{log.user}</span>
                            <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>{log.details}</span>
                          </div>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {log.timestamp}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: DATA BACKUP & RESET */}
          {activeTab === 'backup' && (
            <div style={{ animation: 'fadeIn 0.25s ease-out' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Data Export, Import & Factory Reset</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Export full database as JSON, import user lists, or reset state to factory defaults.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {/* Export Card */}
                <div className="glass-card">
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Export Database JSON
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    Download all registered users, settings, and evaluation history into a single backup JSON file.
                  </p>
                  <button onClick={exportDataAsJSON} className="btn-primary" style={{ width: 'auto' }}>
                    Download Backup JSON
                  </button>
                </div>

                {/* Import Card */}
                <div className="glass-card">
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    Import Users & Config
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    Upload a JSON file to restore users or batch-provision accounts.
                  </p>
                  <label className="btn-secondary" style={{ display: 'inline-block', cursor: 'pointer' }}>
                    <span>Select JSON File</span>
                    <input type="file" accept=".json" onChange={handleImportFile} style={{ display: 'none' }} />
                  </label>
                </div>

                {/* Factory Reset Card */}
                <div className="glass-card" style={{ borderColor: 'var(--error)' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--error)', marginBottom: '0.5rem' }}>
                    Factory Reset
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                    Clear all custom users, reset demo accounts, and restore all default presentation evaluation branding.
                  </p>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to reset everything to initial state?')) {
                        resetAllToDefaults();
                      }
                    }}
                    style={{
                      padding: '0.6rem 1.25rem',
                      backgroundColor: 'var(--error)',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Reset Everything to Default
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal: Add New User */}
      {isAddUserModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
          onClick={() => setIsAddUserModalOpen(false)}
        >
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '480px', backgroundColor: 'var(--bg-surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Add New User</h3>

            <form onSubmit={handleCreateUser}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Rachel Adams"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="rachel.adams@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Account Role</label>
                <select
                  className="form-input"
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                >
                  <option value="Pro Presenter">Pro Presenter</option>
                  <option value="Executive Speech Coach">Executive Speech Coach</option>
                  <option value="Student & Debate Speaker">Student & Debate Speaker</option>
                  <option value="Enterprise Administrator">Enterprise Administrator</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Initial Password</label>
                <input
                  type="text"
                  className="form-input"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn-primary">
                  Create User Account
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Existing User */}
      {editingUser && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
          onClick={() => setEditingUser(null)}
        >
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '480px', backgroundColor: 'var(--bg-surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Edit User</h3>

            <form onSubmit={handleSaveEditUser}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Account Role</label>
                <select
                  className="form-input"
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                >
                  <option value="Pro Presenter">Pro Presenter</option>
                  <option value="Executive Speech Coach">Executive Speech Coach</option>
                  <option value="Student & Debate Speaker">Student & Debate Speaker</option>
                  <option value="Enterprise Administrator">Enterprise Administrator</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
