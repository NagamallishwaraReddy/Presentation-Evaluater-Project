import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserIcon, LockIcon, KeyIcon, CheckCircleIcon, SparklesIcon, AlertCircleIcon, LogoutIcon, PresentationIcon } from '../components/icons/Icons';
import { PresentationLogo } from '../components/icons/PresentationLogo';
import { ThemeToggle } from '../components/ThemeToggle';

export const Profile = ({ onNavigate }) => {
  const { user, updateUserProfile, changePassword, logout, isLoading } = useAuth();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const [name, setName] = useState(user?.name || 'John Doe');
  const [email, setEmail] = useState(user?.email || 'john.doe@example.com');
  const [role, setRole] = useState(user?.role || 'Pro Presenter');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const AVATAR_OPTIONS = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  ];

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await updateUserProfile({
      name,
      email,
      role,
      avatar: selectedAvatar,
    });
    setIsEditProfileModalOpen(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (!currentPassword) {
      setPasswordError('Please enter your current password');
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    await changePassword(currentPassword, newPassword);
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLogout = () => {
    logout();
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--bg-app)' }}>
      <div className="ambient-glow-wrapper">
        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />
      </div>

      <aside
        style={{
          width: '280px',
          borderRight: '1px solid var(--sidebar-border)',
          backgroundColor: 'var(--sidebar-bg)',
          padding: '1.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        <div>
          <div
            onClick={() => onNavigate && onNavigate('home')}
            style={{
              cursor: 'pointer',
              marginBottom: '2rem',
              paddingLeft: '0.5rem',
            }}
          >
            <PresentationLogo size={32} showText={true} />
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <button
              onClick={() => onNavigate && onNavigate('dashboard')}
              className="btn-secondary"
              style={{
                justifyContent: 'flex-start',
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-secondary)',
              }}
            >
              <PresentationIcon size={18} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('profile')}
              className="btn-secondary"
              style={{
                justifyContent: 'flex-start',
                padding: '0.75rem 1rem',
                border: '1px solid var(--primary)',
                background: 'var(--primary-focus)',
                color: 'var(--primary)',
                fontWeight: 700,
              }}
            >
              <UserIcon size={18} />
              <span>My Profile</span>
            </button>
          </nav>
        </div>

        <div style={{ borderTop: '1px solid var(--sidebar-border)', paddingTop: '1rem' }}>
          <button
            onClick={handleLogout}
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--error)', gap: '0.5rem', padding: '0.6rem 0.85rem' }}
          >
            <LogoutIcon size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '2rem 2.5rem', overflowY: 'auto', position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.5px' }}>My Profile</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Manage your user credentials, speech analytics statistics, and account security
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ThemeToggle />

            <button
              onClick={() => onNavigate && onNavigate('dashboard')}
              className="btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              ← Back to Dashboard
            </button>

            <button
              onClick={() => setIsEditProfileModalOpen(true)}
              className="btn-primary"
              style={{ width: 'auto', padding: '0.65rem 1.25rem' }}
            >
              <SparklesIcon size={16} /> Edit Profile
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={user?.avatar || selectedAvatar}
                  alt={user?.name}
                  style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid var(--primary)',
                    boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)',
                  }}
                />
              </div>

              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{user?.name || 'John Doe'}</h2>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.2rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--primary-focus)',
                    color: 'var(--primary)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    marginTop: '0.35rem',
                  }}
                >
                  {user?.role || 'Pro Presenter'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Account Email
                </span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                  {user?.email || 'john.doe@example.com'}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Member Since
                </span>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                  {user?.memberSince || 'May 20, 2024'}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <KeyIcon size={18} style={{ color: 'var(--primary)' }} />
              <span>Change Password</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Keep your account secure with an 8+ character password.
            </p>

            {passwordError && (
              <div
                style={{
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'var(--error-bg)',
                  border: '1px solid var(--error)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--error)',
                  fontSize: '0.8rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <AlertCircleIcon size={16} />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div
                style={{
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'var(--success-bg)',
                  border: '1px solid var(--success)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--success)',
                  fontSize: '0.8rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <CheckCircleIcon size={16} />
                <span>Password updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleUpdatePassword}>
              <div className="form-group">
                <label className="form-label" htmlFor="profile-current-password">Current Password</label>
                <input
                  id="profile-current-password"
                  type="password"
                  className="form-input"
                  placeholder="••••••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="profile-new-password">New Password</label>
                <input
                  id="profile-new-password"
                  type="password"
                  className="form-input"
                  placeholder="Minimum 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="profile-confirm-new-password">Confirm New Password</label>
                <input
                  id="profile-confirm-new-password"
                  type="password"
                  className="form-input"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
                style={{ marginTop: '0.75rem' }}
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </main>

      {isEditProfileModalOpen && (
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
          onClick={() => setIsEditProfileModalOpen(false)}
        >
          <div
            className="glass-card"
            style={{ width: '100%', maxWidth: '480px', backgroundColor: 'var(--bg-surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>Edit Profile</h3>

            <form onSubmit={handleSaveProfile}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Account Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Select Avatar Photo</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                  {AVATAR_OPTIONS.map((imgUrl, index) => (
                    <img
                      key={index}
                      src={imgUrl}
                      alt={`Avatar Option ${index + 1}`}
                      onClick={() => setSelectedAvatar(imgUrl)}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: selectedAvatar === imgUrl ? '3px solid var(--primary)' : '2px solid transparent',
                        transform: selectedAvatar === imgUrl ? 'scale(1.1)' : 'scale(1)',
                        transition: 'all 0.15s ease',
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditProfileModalOpen(false)}
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

export default Profile;
