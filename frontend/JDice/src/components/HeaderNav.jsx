/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthSession, getAuthUserProfile, hasActiveSession } from "../../services/auth";

const style = `

  /* ── TOPBAR ── */
  .topbar {
    height: 52px; background: var(--green-dark);
    display: flex; align-items: center; padding: 0 24px; flex-shrink: 0;
  }
  .topbar-brand { display: flex; flex-direction: column; margin-right: 40px; }
  .brand-name { font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 700; color: #fff; line-height: 1.2; }
  .brand-sub  { font-size: 9px; font-weight: 600; letter-spacing: 1.2px; color: rgba(255,255,255,0.5); text-transform: uppercase; }
  .topbar-nav { display: flex; align-items: center; gap: 4px; flex: 1; }
  .nav-link {
    padding: 6px 16px; font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,0.65); cursor: pointer;
    border-bottom: 2px solid transparent; transition: color .16s;
    background: none; border-top: none; border-left: none; border-right: none;
    font-family: 'Inter', sans-serif;
  }
  .nav-link:hover { color: #fff; }
  .nav-link.active { color: #fff; border-bottom-color: var(--yellow); }
  .topbar-user { display: flex; align-items: center; gap: 10px; margin-left: auto; }
  .user-info { text-align: right; }
  .user-name { font-size: 12px; font-weight: 600; color: #fff; }
  .user-role { font-size: 10.5px; color: rgba(255,255,255,0.55); }
  .user-avatar {
    width: 32px; height: 32px; background: var(--yellow); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-size: 11px; font-weight: 700; color: #1a1a1a;
  }
  .logout-btn {
    height: 30px; padding: 0 12px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.08); color: #fff; cursor: pointer;
    font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600;
    transition: background .16s, border-color .16s;
  }
  .logout-btn:hover { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.28); }

  /* ───────────────────────────── */
/* 📱 TABLET (até 1024px) */
/* ───────────────────────────── */
@media (max-width: 1024px) {

  .topbar {
    padding: 0 16px;
    justify-content: space-between;
  }

  .topbar-brand {
    margin-right: 20px;
  }  

  .nav-link {
    padding: 6px 12px;
    font-size: 12.5px;
  }

}


/* ───────────────────────────── */
/* 📱 MOBILE (até 768px) */
/* ───────────────────────────── */
@media (max-width: 768px) {


  .user-avatar {
    width: 30px;
    height: 30px;
    font-size: 10px;
  }

  .topbar-nav { display: none; }


}


/* ───────────────────────────── */
/* 📱 SMALL MOBILE (até 480px) */
/* ───────────────────────────── */
@media (max-width: 480px) {

  .brand-name {
    font-size: 12px;
  }

  .brand-sub {
    font-size: 8px;
  }

  .nav-link {
    font-size: 11.5px;
    padding: 5px 8px;
  }

  .user-avatar {
    width: 28px;
    height: 28px;
    font-size: 9px;
  }
}

`

export const HEADER_NAV_ITEMS = ["Dashboard", "Modelos", "Envios"];

export default function HeaderNav({
  activeNav,
  onNavClick,
  navItems = HEADER_NAV_ITEMS,
}) {
  const navigate = useNavigate();
  const user = getAuthUserProfile();
  const isAuthenticated = hasActiveSession();

  const handleLogout = () => {
    clearAuthSession();
    navigate("/", { replace: true });
  };

  return (

    <>
    
    <style>{style}</style>
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
          <div className="user-name">{user?.displayName ?? "John Deere"}</div>
          <div className="user-role">{user?.subtitle ?? "Mail Manager"}</div>
        </div>
        <div className="user-avatar">{user?.initials ?? "JD"}</div>
        {isAuthenticated ? (
          <button className="logout-btn" onClick={handleLogout} type="button">
            Sair
          </button>
        ) : null}
      </div>
    </header>
    
    </>
  );
}


