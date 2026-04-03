import React from "react";

const HEADER_NAV_ITEMS = ["Dashboard", "Modelos", "Envios"];

export default function HeaderNav({
  activeNav,
  onNavClick,
  navItems = HEADER_NAV_ITEMS,
}) {
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <span className="brand-name">John Deere</span>
        <span className="brand-sub">Mail Manager</span>
      </div>

      <nav className="topbar-nav">
        {navItems.map((item) => (
          <button
            key={item}
            className={`nav-link ${activeNav === item ? "active" : ""}`}
            onClick={() => onNavClick(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="topbar-user">
        <div className="user-info">
          <div className="user-name">Maria Alves</div>
          <div className="user-role">Coordenadora de Mkt</div>
        </div>
        <div className="user-avatar">MA</div>
      </div>
    </header>
  );
}
