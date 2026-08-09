import React from 'react';
import { useAuth } from '../context/AuthContext';
import { PresentationLogo } from '../components/icons/PresentationLogo';
import { ThemeToggle } from '../components/ThemeToggle';
import { LogoutIcon, UserIcon, SparklesIcon, CheckCircleIcon } from '../components/icons/Icons';

export const Dashboard = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)', position: 'relative' }}>
      <div className="ambient-glow-wrapper">
        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />
      </div>

      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 2rem',
          backgroundColor: 'var(--bg-glass)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div
          onClick={() => onNavigate && onNavigate('home')}
          style={{ cursor: 'pointer' }}
        >
          <PresentationLogo size={36} showText={true} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <ThemeToggle />

          <button
            onClick={() => onNavigate && onNavigate('profile')}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <UserIcon size={16} />
            <span>Profile</span>
          </button>

          <button
            onClick={handleLogout}
            className="btn-secondary"
            title="Logout"
            style={{ padding: '0.55rem 0.85rem', color: 'var(--error)' }}
          >
            <LogoutIcon size={16} />
          </button>
        </div>
      </header>

      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.5rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          className="glass-card"
          style={{
            maxWidth: '560px',
            width: '100%',
            padding: '3rem 2.5rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--success-bg)',
              color: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 0 25px rgba(16, 185, 129, 0.25)',
            }}
          >
            <CheckCircleIcon size={34} />
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--primary-focus)',
              color: 'var(--primary)',
              fontSize: '0.75rem',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            <SparklesIcon size={14} /> Authentication Successful
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
            Welcome to Dashboard!
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            You are successfully logged in as <br />
            <strong style={{ color: 'var(--text-primary)' }}>{user?.email || 'user@example.com'}</strong>
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('profile')}
              className="btn-primary"
              style={{ width: 'auto', padding: '0.75rem 1.5rem' }}
            >
              <UserIcon size={18} />
              <span>View Profile</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="btn-secondary"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              <LogoutIcon size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
