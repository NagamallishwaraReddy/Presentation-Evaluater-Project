import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon, ArrowRightIcon, AlertCircleIcon } from '../components/icons/Icons';
import { PresentationLogo } from '../components/icons/PresentationLogo';

export const Signup = ({ onNavigate }) => {
  const { signup, isLoading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const strengthScore = [hasMinLength, hasNumber, hasUppercase, hasSpecialChar].filter(Boolean).length;
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['var(--error)', 'var(--warning)', 'var(--primary-cyan)', 'var(--primary)'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (strengthScore < 2) {
      setErrorMessage('Please choose a stronger password (minimum 8 characters)');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms & Conditions to register');
      return;
    }

    try {
      const result = await signup(fullName, email, password);
      if (result && result.success) {
        if (onNavigate) {
          onNavigate('dashboard');
        }
      }
    } catch (err) {
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="signup-form-wrapper">
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
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="signup-name">
            <span>Full Name</span>
          </label>
          <div className="input-container">
            <span className="input-icon-left">
              <UserIcon size={18} />
            </span>
            <input
              id="signup-name"
              type="text"
              className="form-input has-icon-left"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="signup-email">
            <span>Email</span>
          </label>
          <div className="input-container">
            <span className="input-icon-left">
              <MailIcon size={18} />
            </span>
            <input
              id="signup-email"
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

        {/* Password */}
        <div className="form-group">
          <label className="form-label" htmlFor="signup-password">
            <span>Password</span>
          </label>
          <div className="input-container">
            <span className="input-icon-left">
              <LockIcon size={18} />
            </span>
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              className="form-input has-icon-left has-icon-right"
              placeholder="Create strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="input-action-right"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>

          {password && (
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '4px', height: '4px', marginBottom: '0.35rem' }}>
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    style={{
                      flex: 1,
                      borderRadius: '2px',
                      backgroundColor: strengthScore >= step ? strengthColors[strengthScore - 1] : 'var(--border-color)',
                      transition: 'background-color 0.2s',
                    }}
                  />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Strength: {strengthLabels[strengthScore - 1] || 'Too short'}</span>
                <span>Minimum 8 characters</span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label className="form-label" htmlFor="signup-confirm-password">
            <span>Confirm Password</span>
          </label>
          <div className="input-container">
            <span className="input-icon-left">
              <LockIcon size={18} />
            </span>
            <input
              id="signup-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              className="form-input has-icon-left has-icon-right"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="input-action-right"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div style={{ margin: '1rem 0 1.5rem 0' }}>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <span className="checkbox-custom">
              {agreeTerms && '✓'}
            </span>
            <span style={{ fontSize: '0.85rem' }}>
              I agree to the Terms & Conditions and Privacy Policy
            </span>
          </label>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading}
          id="btn-signup-submit"
        >
          {isLoading ? (
            <>
              <div className="animate-spin" style={{ width: '18px', height: '18px', border: '2px solid #FFF', borderTopColor: 'transparent', borderRadius: '50%' }} />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Register</span>
              <ArrowRightIcon size={18} />
            </>
          )}
        </button>
      </form>

      <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Already have an account?{' '}
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
          id="link-go-to-login"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
