import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = ({ compact = false, className = '' }) => {
  const { themeMode, toggleThemeMode } = useTheme();
  const isDark = themeMode === 'dark';

  return (
    <button
      type="button"
      onClick={toggleThemeMode}
      className={`theme-pill-toggle ${isDark ? 'is-dark' : 'is-light'} ${className}`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      aria-label="Toggle Theme Mode"
    >
      {/* Background Track with Ambient Celestial Details */}
      <span className="theme-toggle-track">
        {/* Night Stars (visible in dark mode) */}
        <span className="theme-star star-1" />
        <span className="theme-star star-2" />
        <span className="theme-star star-3" />

        {/* Day Cloud/Sun Glow (visible in light mode) */}
        <span className="theme-cloud cloud-1" />
      </span>

      {/* Sliding Glowing Thumb with Animated Sun/Moon Icon */}
      <span className="theme-toggle-thumb">
        {isDark ? (
          /* Moon Icon with Crater Glow */
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="thumb-icon moon-icon">
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
              fill="#FBBF24"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          /* Radiant Sun Icon with Rotating Rays */
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="thumb-icon sun-icon">
            <circle cx="12" cy="12" r="5" fill="#F59E0B" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}
      </span>

      {!compact && (
        <span className="theme-toggle-label">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
