import React from 'react';
import { PresentationLogo } from '../components/icons/PresentationLogo';
import { ThemeToggle } from '../components/ThemeToggle';

export const AuthLayout = ({ children, title, subtitle, activePage = 'login', onNavigate }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-app)',
        position: 'relative',
      }}
    >
      {/* Ambient soft glow */}
      <div className="ambient-glow-wrapper">
        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />
      </div>

      {/* Top Header Navbar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 2.5rem',
          maxWidth: '1280px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 20,
        }}
      >
        <div
          onClick={() => onNavigate && onNavigate('home')}
          style={{ cursor: 'pointer' }}
        >
          <PresentationLogo size={36} showText={true} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeToggle />

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('home')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate(activePage === 'login' ? 'signup' : 'login')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            {activePage === 'login' ? 'Register' : 'Sign In'}
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate(activePage === 'login' ? 'signup' : 'login')}
            style={{
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '0.55rem 1.35rem',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: 'var(--primary-glow)',
            }}
          >
            {activePage === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </header>

      {/* Main Centered Card Body */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem 1.25rem 4rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          className="glass-card"
          style={{
            width: '100%',
            maxWidth: '460px',
            padding: '2.5rem 2.25rem',
            boxShadow: 'var(--card-shadow)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)',
            backdropFilter: 'blur(20px)',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1
              style={{
                fontSize: '1.65rem',
                fontWeight: 900,
                letterSpacing: '-0.5px',
                color: 'var(--text-primary)',
                marginBottom: '0.35rem',
              }}
            >
              {title || 'Presentation Evaluator'}
            </h1>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}
            >
              {subtitle || 'Sign in to your account'}
            </p>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
