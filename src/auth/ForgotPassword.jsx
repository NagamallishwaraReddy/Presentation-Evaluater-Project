import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MailIcon, ArrowRightIcon, CheckCircleIcon, AlertCircleIcon, KeyIcon } from '../components/icons/Icons';
import { PresentationLogo } from '../components/icons/PresentationLogo';

export const ForgotPassword = ({ onNavigate }) => {
  const { forgotPassword, resetPassword, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [resetCompleted, setResetCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      setErrorMessage('Failed to send reset link. Please try again.');
    }
  };

  const handleApplyNewPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    await resetPassword(email, newPassword);
    setResetCompleted(true);
    setTimeout(() => {
      if (onNavigate) {
        onNavigate('login');
      }
    }, 1200);
  };

  return (
    <div className="forgot-password-form-wrapper">
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

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} noValidate>
          <div
            style={{
              padding: '0.85rem 1rem',
              backgroundColor: 'var(--bg-input)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}
          >
            Enter your registered email address and we'll send you a secure verification link to reset your account password.
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="forgot-email">
              <span>Email</span>
            </label>
            <div className="input-container">
              <span className="input-icon-left">
                <MailIcon size={18} />
              </span>
              <input
                id="forgot-email"
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

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
            id="btn-send-reset-link"
            style={{ marginTop: '0.5rem' }}
          >
            {isLoading ? (
              <>
                <div className="animate-spin" style={{ width: '18px', height: '18px', border: '2px solid #FFF', borderTopColor: 'transparent', borderRadius: '50%' }} />
                <span>Sending Reset Link...</span>
              </>
            ) : (
              <>
                <span>Send Reset Link</span>
                <ArrowRightIcon size={18} />
              </>
            )}
          </button>
        </form>
      ) : (
        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <div
            style={{
              padding: '1.25rem',
              backgroundColor: 'var(--success-bg)',
              border: '1px solid var(--success)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--success)',
              fontSize: '0.875rem',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <CheckCircleIcon size={18} /> Reset Link Sent!
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              We sent password recovery instructions to <strong>{email}</strong>.
            </div>
          </div>

          {!resetCompleted ? (
            <form onSubmit={handleApplyNewPassword}>
              <div className="form-group">
                <label className="form-label" htmlFor="reset-new-password">
                  <span>Enter New Password for {email}</span>
                </label>
                <div className="input-container">
                  <span className="input-icon-left">
                    <KeyIcon size={18} />
                  </span>
                  <input
                    id="reset-new-password"
                    type="password"
                    className="form-input has-icon-left"
                    placeholder="New secure password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
                style={{ marginTop: '0.5rem' }}
              >
                <span>Save New Password & Login</span>
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--success)' }}>
              <CheckCircleIcon size={32} style={{ margin: '0 auto 0.5rem' }} />
              <div style={{ fontWeight: 700 }}>Password Reset Complete!</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Redirecting to login...</div>
            </div>
          )}

          <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              Re-enter a different email
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Remember your password?{' '}
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('login')}
          style={{
            color: 'var(--primary)',
            fontWeight: 700,
            background: 'transparent',
            border: 'none',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          id="link-back-to-login"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
