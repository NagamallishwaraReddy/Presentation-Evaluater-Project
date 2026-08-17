import React from 'react'
import { Sun, Sparkles, LogOut, User } from 'lucide-react'
import LogoIcon from './LogoIcon.jsx'

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-icon">
          <LogoIcon size={38} />
        </div>
        <div className="logo-text">
          <div className="logo-title">
            PRESENTATION
            <br />
            EVALUATOR
          </div>
          <div className="logo-tagline">ANALYZE. IMPROVE. SUCCEED.</div>
        </div>
      </div>

      <div className="header-right">
        <button className="btn btn-light" type="button">
          <Sun size={16} />
          <span>Light</span>
        </button>

        <button className="btn btn-primary" type="button">
          <Sparkles size={16} />
          <span>New Evaluation</span>
        </button>

        <div className="user-pill">
          <span className="user-avatar">
            <User size={14} />
          </span>
          <span className="user-name">John Doe</span>
        </div>

        <button className="btn-icon" type="button" aria-label="Logout">
          <LogOut size={16} />
        </button>
      </div>
    </header>
  )
}

export default Header
