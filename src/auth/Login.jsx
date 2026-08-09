import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, ArrowRightIcon, AlertCircleIcon } from '../components/icons/Icons';
import { PresentationLogo } from '../components/icons/PresentationLogo';

export const Login = ({ onNavigate }) => {
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('pres_remember_email');
    if (saved) {
      setEmail(saved);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.getModifierState && e.getModifierState('CapsLock')) {
      setIsCapsLock(true);
    } else {
      setIsCapsLock(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password');
      return;
    }

    try {
      const result = await login(email, password, rememberMe);
      if (result && result.success) {
        // Step 5: Navigate to Dashboard when Login button is clicked
        if (onNavigate) {
          onNavigate('dashboard');
        }
      }
    } catch (err) {
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-form-wrapper">
      {/* Centered Brand Logo */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
        <PresentationLogo size={48} showText={true} />
      </div>

      {errorMessage && (
        <div
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--error-bg)',
            border: '1px solid var(--error)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--error)',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <AlertCircleIcon size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Email Field */}
        <div className="form-group">
          <label className="form-label" htmlFor="login-email">
            <span>Email</span>
          </label>
          <div className="input-container">
            <span className="input-icon-left">
              <MailIcon size={18} />
            </span>
            <input
              id="login-email"
              type="email"
              className="form-input has-icon-left"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="form-group">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <label className="form-label" htmlFor="login-password" style={{ margin: 0 }}>
              Password
            </label>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('forgot-password')}
              style={{
                fontSize: '0.8rem',
                color: 'var(--primary)',
                fontWeight: 600,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Forgot Password?
            </button>
          </div>

          <div className="input-container">
            <span className="input-icon-left">
              <LockIcon size={18} />
            </span>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              className="form-input has-icon-left has-icon-right"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyDown}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="input-action-right"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>

          {isCapsLock && (
            <div style={{ fontSize: '0.75rem', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem' }}>
              <AlertCircleIcon size={14} /> Caps Lock is ON
            </div>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1rem 0 1.5rem 0' }}>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="checkbox-custom">
              {rememberMe && '✓'}
            </span>
            <span>Remember Me</span>
          </label>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading}
          id="btn-login-submit"
        >
          {isLoading ? (
            <>
              <div className="animate-spin" style={{ width: '18px', height: '18px', border: '2px solid #FFF', borderTopColor: 'transparent', borderRadius: '50%' }} />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Login</span>
              <ArrowRightIcon size={18} />
            </>
          )}
        </button>
      </form>

      {/* Sign Up Link */}
      <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('signup')}
          style={{
            color: 'var(--primary)',
            fontWeight: 700,
            background: 'transparent',
            border: 'none',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          id="link-go-to-signup"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
