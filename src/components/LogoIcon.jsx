import React from 'react'

// Custom logo matching the Presentation Evaluator brand mark:
// an open ring, a presentation easel with a mini bar chart,
// and a growth arrow sweeping through it, in a blue -> green gradient.
function LogoIcon({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pe-ring-gradient" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#0f4c81" />
          <stop offset="45%" stopColor="#1c8fae" />
          <stop offset="100%" stopColor="#4dbb63" />
        </linearGradient>
        <linearGradient id="pe-arrow-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0f4c81" />
          <stop offset="55%" stopColor="#2fa06a" />
          <stop offset="100%" stopColor="#5bc25f" />
        </linearGradient>
      </defs>

      {/* Open ring */}
      <circle
        cx="50"
        cy="50"
        r="37"
        fill="none"
        stroke="url(#pe-ring-gradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="185 60"
        transform="rotate(-115 50 50)"
      />

      {/* Growth arrow (zig-zag rising line with arrowhead) */}
      <path
        d="M16 74 L34 54 L44 64 L74 30"
        fill="none"
        stroke="url(#pe-arrow-gradient)"
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58 28 L78 26 L80 46 Z"
        fill="url(#pe-arrow-gradient)"
      />

      {/* Presentation board */}
      <rect
        x="30"
        y="26"
        width="34"
        height="24"
        rx="3"
        fill="#ffffff"
        stroke="#0f4c81"
        strokeWidth="3.2"
      />
      {/* Mini trend line inside board */}
      <polyline
        points="35,42 41,36 46,39 52,31"
        fill="none"
        stroke="#0f4c81"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Mini bar chart inside board */}
      <rect x="54" y="38" width="2.6" height="7" fill="#4dbb63" />
      <rect x="58" y="34" width="2.6" height="11" fill="#4dbb63" />
      {/* Easel stand */}
      <rect x="44" y="50" width="12" height="4" rx="1.5" fill="#0f4c81" />
      <path
        d="M47 54 L41 62 M53 54 L59 62"
        stroke="#0f4c81"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default LogoIcon
