import React from 'react';

export const PresentationLogo = ({ size = 38, showText = true, className = '' }) => {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        userSelect: 'none',
      }}
    >
      {/* SVG Icon matching user's image */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 2px 8px rgba(16, 185, 129, 0.25))' }}
      >
        <defs>
          {/* Blue-to-cyan gradient */}
          <linearGradient id="pe_blue_grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0369A1" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          {/* Green-to-emerald gradient */}
          <linearGradient id="pe_green_grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>

          {/* Dynamic Arrow Upward Gradient */}
          <linearGradient id="pe_arrow_grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="45%" stopColor="#06B6D4" />
            <stop offset="75%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>
        </defs>

        {/* Circular Outer Loop (Left Blue Arc) */}
        <path
          d="M 45 15 A 35 35 0 1 0 15 50 A 35 35 0 0 0 30 78"
          stroke="url(#pe_blue_grad)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Top-Right Green Swoosh */}
        <path
          d="M 35 15 A 35 35 0 0 1 85 45"
          stroke="url(#pe_green_grad)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Inner Presentation Board */}
        <g transform="translate(24, 20)">
          {/* Screen Outer */}
          <rect x="2" y="3" width="34" height="23" rx="2" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" />
          {/* Screen Stand Legs */}
          <path d="M 12 26 L 19 35 L 26 26" stroke="#0284C7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 19 26 L 19 36" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Mic Stand */}
          <path d="M 8 20 C 8 16 11 16 11 13" stroke="#0284C7" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <circle cx="11" cy="12" r="1.5" fill="#0284C7" />

          {/* Graph on screen: Bar Chart */}
          <rect x="20" y="16" width="3" height="7" rx="0.5" fill="#10B981" />
          <rect x="25" y="12" width="3" height="11" rx="0.5" fill="#06B6D4" />
          <rect x="30" y="9" width="3" height="14" rx="0.5" fill="#22C55E" />

          {/* Upward Line Chart Trend */}
          <path d="M 16 17 L 22 13 L 26 15 L 32 8" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        {/* Dynamic Upward Growth Arrow (Prominent Foreground Arrow) */}
        <path
          d="M 14 78 L 30 52 L 48 70 L 78 30"
          stroke="url(#pe_arrow_grad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Arrow Head */}
        <path
          d="M 64 30 L 78 30 L 78 44"
          stroke="url(#pe_arrow_grad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Brand Text & Slogan matching Logo typography */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: size > 32 ? '1.15rem' : '0.95rem',
                fontWeight: 900,
                letterSpacing: '0.5px',
                color: 'var(--text-primary)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              PRESENTATION
            </span>
            <span
              style={{
                fontSize: size > 32 ? '1.15rem' : '0.95rem',
                fontWeight: 900,
                letterSpacing: '0.5px',
                color: 'var(--text-primary)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              EVALUATOR
            </span>
          </div>

          <div
            style={{
              height: '1px',
              backgroundColor: 'var(--border-color)',
              margin: '0.2rem 0 0.15rem 0',
              width: '100%',
            }}
          />

          <span
            style={{
              fontSize: size > 32 ? '0.625rem' : '0.55rem',
              fontWeight: 800,
              letterSpacing: '1px',
              background: 'linear-gradient(90deg, #0284C7 0%, #10B981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ANALYZE. IMPROVE. SUCCEED.
          </span>
        </div>
      )}
    </div>
  );
};

export default PresentationLogo;
