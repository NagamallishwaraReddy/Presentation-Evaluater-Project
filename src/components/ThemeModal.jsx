import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { LogoIcon, PaletteIcon, SunIcon, MoonIcon, CheckCircleIcon, SparklesIcon, RefreshIcon } from './icons/Icons';

export const ThemeModal = ({ isOpen, onClose }) => {
  const {
    themeMode,
    toggleThemeMode,
    brandAccent,
    setBrandAccent,
    brandName,
    brandTagline,
    logoType,
    setLogoType,
    updateBranding,
    resetToDefault,
    presets,
    logoTypes,
  } = useTheme();

  const [tempName, setTempName] = useState(brandName);
  const [tempTagline, setTempTagline] = useState(brandTagline);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    updateBranding({
      name: tempName,
      tagline: tempTagline,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleQuickPreset = (presetName, presetLogo, presetAccent) => {
    setTempName(presetName);
    if (presetName === 'PresAnalyzer') {
      setTempTagline('AI-Powered Presentation Analyzer');
    } else if (presetName === 'Presentation Evaluator') {
      setTempTagline('AI Speech & Vocal Delivery Evaluator');
    } else if (presetName === 'GymAI') {
      setTempTagline('Personalized AI Training & Fitness Programs');
    }
    setLogoType(presetLogo);
    setBrandAccent(presetAccent);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '1.75rem',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', background: 'var(--primary-focus)', color: 'var(--primary)' }}>
              <PaletteIcon size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Branding & Theme Customizer</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Customize App Name, Logo Icon, Color Accent & Light/Dark Mode
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              fontSize: '1.5rem',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '0.25rem',
            }}
          >
            ×
          </button>
        </div>

        {/* Quick Style Presets from Prompt */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            ⚡ 1-Click Concept Presets
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => handleQuickPreset('PresAnalyzer', 'podium', 'blue')}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.5rem', justifyContent: 'flex-start', gap: '0.4rem', border: tempName === 'PresAnalyzer' ? '1.5px solid var(--primary)' : undefined }}
            >
              <LogoIcon type="podium" size={16} /> PresAnalyzer
            </button>

            <button
              type="button"
              onClick={() => handleQuickPreset('Presentation Evaluator', 'waveform', 'cyan')}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.5rem', justifyContent: 'flex-start', gap: '0.4rem', border: tempName === 'Presentation Evaluator' ? '1.5px solid var(--primary)' : undefined }}
            >
              <LogoIcon type="waveform" size={16} /> Presentation Evaluator
            </button>

            <button
              type="button"
              onClick={() => handleQuickPreset('GymAI', 'dumbbell', 'lime')}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.5rem', justifyContent: 'flex-start', gap: '0.4rem', border: tempName === 'GymAI' ? '1.5px solid var(--primary)' : undefined }}
            >
              <LogoIcon type="dumbbell" size={16} /> GymAI Theme
            </button>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Application / Product Name</label>
            <input
              type="text"
              className="form-input"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="e.g. PresAnalyzer, Presentation Evaluator..."
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Product Tagline / Slogan</label>
            <input
              type="text"
              className="form-input"
              value={tempTagline}
              onChange={(e) => setTempTagline(e.target.value)}
              placeholder="e.g. AI-Powered Presentation Analyzer"
            />
          </div>

          {/* Logo Selector */}
          <div className="form-group">
            <label className="form-label">Select Brand Logo Graphic</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
              {logoTypes.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLogoType(item.id)}
                  style={{
                    padding: '0.75rem 0.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${logoType === item.id ? 'var(--primary)' : 'var(--border-color)'}`,
                    backgroundColor: logoType === item.id ? 'var(--primary-focus)' : 'var(--bg-input)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.35rem',
                    textAlign: 'center',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <LogoIcon type={item.id} size={28} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Theme Color Palettes */}
          <div className="form-group">
            <label className="form-label">Brand Accent Color Palette</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {presets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setBrandAccent(p.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: brandAccent === p.id ? '2px solid var(--text-primary)' : '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-input)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: p.color,
                      boxShadow: `0 0 8px ${p.color}`,
                    }}
                  />
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Dark / Light Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {themeMode === 'dark' ? <MoonIcon size={20} className="text-primary" /> : <SunIcon size={20} className="text-warning" />}
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>Appearance Mode</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Currently set to {themeMode === 'dark' ? 'Dark Mode (Default)' : 'Light Mode'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleThemeMode}
              className="btn-secondary"
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
            >
              Switch to {themeMode === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={() => {
                resetToDefault();
                setTempName('PresAnalyzer');
                setTempTagline('AI-Powered Presentation Analyzer');
              }}
              className="btn-secondary"
              style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              <RefreshIcon size={16} /> Reset Default
            </button>

            <button
              type="submit"
              className="btn-primary"
              style={{ flex: '2' }}
            >
              {savedSuccess ? (
                <>
                  <CheckCircleIcon size={18} /> Branding Applied!
                </>
              ) : (
                <>
                  <SparklesIcon size={18} /> Save & Apply Branding
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
