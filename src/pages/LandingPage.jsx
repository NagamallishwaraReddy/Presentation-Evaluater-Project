import React from 'react';
import { SparklesIcon, ArrowRightIcon, PresentationIcon, MicIcon, ChartIcon, ShieldIcon } from '../components/icons/Icons';
import { PresentationLogo } from '../components/icons/PresentationLogo';
import { ThemeToggle } from '../components/ThemeToggle';

export const LandingPage = ({ onNavigate }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-app)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Ambient Glows */}
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
        {/* Brand Logo & Slogan on Left */}
        <div
          onClick={() => onNavigate && onNavigate('home')}
          style={{ cursor: 'pointer' }}
        >
          <PresentationLogo size={42} showText={true} />
        </div>

        {/* Right Header Navigation Actions with New Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* New Modern Dark/Light Mode Switcher */}
          <ThemeToggle />

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('login')}
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
            Sign In
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('signup')}
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
              transition: 'transform var(--transition-fast), opacity var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section matching GymAI reference */}
      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '3.5rem 1.5rem 5rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        {/* Pill Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.45rem 1.15rem', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
            <SparklesIcon size={14} />
          </span>
          <span style={{ fontWeight: 600 }}>AI-powered speech & presentation evaluations</span>
        </div>

        {/* Big Bold Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-1.5px',
            maxWidth: '860px',
            margin: '0 auto 1.5rem',
          }}
        >
          Your Perfect <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #06B6D4 0%, #10B981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Presentation in Seconds
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: 'var(--text-secondary)',
            maxWidth: '640px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
          }}
        >
          Stop guessing. Get a personalized speech delivery analysis built by AI, tailored to your goals, cadence, and schedule.
        </p>

        {/* Dual Hero CTA Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '6rem' }}>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('signup')}
            style={{
              backgroundColor: 'var(--primary)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1.85rem',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--primary-glow)',
              transition: 'transform var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <span>Get Started Free</span>
            <ArrowRightIcon size={18} />
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('login')}
            className="btn-secondary"
            style={{
              padding: '0.85rem 1.85rem',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-md)',
              width: 'auto',
            }}
          >
            Sign In
          </button>
        </div>

        {/* Value Proposition Section (Why Presentation Evaluator?) */}
        <section style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
            Why Presentation Evaluator?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '3rem', maxWidth: '580px', margin: '0 auto 3rem' }}>
            We combine speech science with AI to create evaluations that actually work for you.
          </p>

          {/* 4 Feature Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
              textAlign: 'left',
            }}
          >
            {/* Card 1 */}
            <div className="glass-card" style={{ padding: '1.75rem 1.5rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--primary-focus)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <SparklesIcon size={20} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                AI-Powered Plans
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Get an evaluation program tailored to your goals, experience, and speech schedule.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card" style={{ padding: '1.75rem 1.5rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--primary-focus)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <PresentationIcon size={20} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Goal-Oriented
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Whether you want to pitch investors, deliver keynotes, or debate — we optimize for your goal.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card" style={{ padding: '1.75rem 1.5rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--primary-focus)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <MicIcon size={20} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Flexible Pacing
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Real-time WPM cadence analysis and filler word elimination that adapts to your rehearsal.
              </p>
            </div>

            {/* Card 4 */}
            <div className="glass-card" style={{ padding: '1.75rem 1.5rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--primary-focus)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <ChartIcon size={20} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Time-Efficient
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Every evaluation is designed to maximize results and confidence in your available time.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-color)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div>© 2026 Presentation Evaluator • Analyze. Improve. Succeed. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default LandingPage;
