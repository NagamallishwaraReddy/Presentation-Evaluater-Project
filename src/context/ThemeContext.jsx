import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const THEME_PRESETS = [
  { id: 'blue', name: 'PresAnalyzer Blue', color: '#2563EB', hue: 221, sat: '83%', light: '53%' },
  { id: 'cyan', name: 'Cyber Cyan', color: '#06B6D4', hue: 189, sat: '94%', light: '43%' },
  { id: 'emerald', name: 'Emerald AI', color: '#10B981', hue: 160, sat: '84%', light: '39%' },
  { id: 'lime', name: 'GymAI Lime', color: '#84CC16', hue: 84, sat: '81%', light: '44%' },
  { id: 'violet', name: 'Electric Violet', color: '#8B5CF6', hue: 262, sat: '83%', light: '58%' },
  { id: 'amber', name: 'Sunset Amber', color: '#F59E0B', hue: 38, sat: '92%', light: '50%' },
];

export const LOGO_TYPES = [
  { id: 'podium', label: 'Presentation Podium', desc: 'Optimal for speech & presentation scoring' },
  { id: 'brain', label: 'AI Neural Brain', desc: 'Emphasizes deep learning & intelligence' },
  { id: 'shield', label: 'Security Shield', desc: 'Focuses on enterprise & compliance' },
  { id: 'dumbbell', label: 'GymAI Dumbbell', desc: 'Fitness & performance training' },
  { id: 'waveform', label: 'Audio Waveform', desc: 'Speech clarity & acoustic pacing' },
];

export const ThemeProvider = ({ children }) => {
  // Theme Mode: dark | light
  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem('app_theme_mode');
    return saved || 'dark';
  });

  // Active Brand Accent
  const [brandAccent, setBrandAccent] = useState(() => {
    const saved = localStorage.getItem('app_brand_accent');
    return saved || 'blue';
  });

  // App Name
  const [brandName, setBrandName] = useState(() => {
    const saved = localStorage.getItem('app_brand_name');
    return saved || 'PresAnalyzer';
  });

  // Brand Tagline / Slogan
  const [brandTagline, setBrandTagline] = useState(() => {
    const saved = localStorage.getItem('app_brand_tagline');
    return saved || 'AI-Powered Presentation Analyzer';
  });

  // Logo Type
  const [logoType, setLogoType] = useState(() => {
    const saved = localStorage.getItem('app_logo_type');
    return saved || 'podium';
  });

  // Apply theme attributes to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    localStorage.setItem('app_theme_mode', themeMode);
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-brand', brandAccent);
    localStorage.setItem('app_brand_accent', brandAccent);
  }, [brandAccent]);

  useEffect(() => {
    localStorage.setItem('app_brand_name', brandName);
    document.title = `${brandName} | ${brandTagline}`;
  }, [brandName, brandTagline]);

  useEffect(() => {
    localStorage.setItem('app_brand_tagline', brandTagline);
  }, [brandTagline]);

  useEffect(() => {
    localStorage.setItem('app_logo_type', logoType);
  }, [logoType]);

  const toggleThemeMode = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const updateBranding = ({ name, tagline, accent, logo }) => {
    if (name !== undefined) setBrandName(name);
    if (tagline !== undefined) setBrandTagline(tagline);
    if (accent !== undefined) setBrandAccent(accent);
    if (logo !== undefined) setLogoType(logo);
  };

  const resetToDefault = () => {
    setThemeMode('dark');
    setBrandAccent('blue');
    setBrandName('PresAnalyzer');
    setBrandTagline('AI-Powered Presentation Analyzer');
    setLogoType('podium');
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode,
        toggleThemeMode,
        brandAccent,
        setBrandAccent,
        brandName,
        setBrandName,
        brandTagline,
        setBrandTagline,
        logoType,
        setLogoType,
        updateBranding,
        resetToDefault,
        presets: THEME_PRESETS,
        logoTypes: LOGO_TYPES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
