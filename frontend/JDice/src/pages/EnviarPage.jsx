import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import { getRoute } from "../components/navRoutes";
import { HEADER_NAV_ITEMS } from "../components/HeaderNav";
import Footer from "../components/Footer";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green-dark:  #1a4a1a;
    --green-btn:   #3a7d3a;
    --green-light: #eef4ee;
    --yellow:      #f5c518;
    --white:       #ffffff;
    --text:        #1a1a1a;
    --muted:       #6b7280;
    --border:      #e5e7eb;
    --step-done:   #3a7d3a;
    --step-active: #3a7d3a;
    --step-idle:   #d1d5db;
  }

  html, body, #root { height: 100%; font-family: 'Inter', sans-serif; background: var(--green-light); }

  .app { display: flex; height: 100vh; overflow: hidden; }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 52px; background: var(--green-dark);
    display: flex; flex-direction: column; align-items: center;
    padding: 12px 0 16px; gap: 4px; flex-shrink: 0;
  }
  .sidebar-logo {
    width: 32px; height: 32px; background: var(--yellow); border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-weight: 800; font-size: 12px; color: #1a1a1a;
    margin-bottom: 18px;
  }
  .sidebar-icon {
    width: 36px; height: 36px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.5); cursor: pointer;
    border: none; background: transparent; transition: all .18s;
  }
  .sidebar-icon:hover { background: rgba(255,255,255,0.1); color: #fff; }
  .sidebar-icon.active { background: rgba(255,255,255,0.12); color: var(--yellow); }
  .sidebar-spacer { flex: 1; }

  /* ── MAIN ── */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

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

  /* ── CONTENT ── */
  .content {
    flex: 1; overflow-y: auto; padding: 22px 24px 28px;
    display: flex; flex-direction: column; gap: 16px;
  }

  /* ── PAGE HEADER ── */
  .page-header h1 {
    font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 800; color: var(--text);
  }
  .page-sub { font-size: 12.5px; color: var(--muted); margin-top: 3px; }

  /* ── STEPPER ── */
  .stepper {
    display: flex; align-items: center; gap: 0;
    background: var(--white); border-radius: 10px;
    padding: 12px 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }
  .step { display: flex; align-items: center; gap: 8px; flex: 1; }
  .step-circle {
    width: 26px; height: 26px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11.5px; font-weight: 700; flex-shrink: 0;
    font-family: 'Sora', sans-serif; border: 2px solid transparent;
  }
  .step-circle.done   { background: var(--step-done); color: #fff; border-color: var(--step-done); }
  .step-circle.active { background: var(--step-active); color: #fff; border-color: var(--step-active); }
  .step-circle.idle   { background: #fff; color: var(--muted); border-color: var(--step-idle); }

  .step-label { display: flex; flex-direction: column; }
  .step-label .s-name {
    font-size: 12px; font-weight: 600;
    color: var(--text);
  }
  .step-label .s-sub { font-size: 10.5px; color: var(--muted); }
  .step.idle .step-label .s-name { color: var(--muted); }

  .step-line {
    flex: 1; height: 2px; background: var(--step-idle); margin: 0 10px;
    position: relative; max-width: 60px;
  }
  .step-line.done { background: var(--step-done); }
  .step-line::before {
    content: ''; position: absolute; top: 50%; left: 0; right: 0;
    border-top: 2px dashed #c9d9c9; transform: translateY(-50%);
  }
  .step-line.done::before { border-top-color: var(--step-done); border-top-style: solid; }

  /* ── BODY LAYOUT ── */
  .body-layout { display: flex; gap: 16px; flex: 1; min-height: 0; }

  /* ── FORM PANEL ── */
  .form-panel { flex: 1; display: flex; flex-direction: column; gap: 14px; min-width: 0; }

  /* ── SECTION CARD ── */
  .section-card {
    background: var(--white); border-radius: 12px;
    padding: 20px 22px; box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }

  .section-num {
    display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
  }
  .section-num .num-badge {
    width: 24px; height: 24px; border-radius: 50%;
    background: var(--green-btn); color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-size: 11px; font-weight: 700;
  }
  .section-num h2 {
    font-family: 'Sora', sans-serif; font-size: 14.5px; font-weight: 700; color: var(--text);
  }
  .section-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }

  /* Field */
  .field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
  .field:last-child { margin-bottom: 0; }
  .field label { font-size: 12px; font-weight: 500; color: var(--text); }

  .select-wrap { position: relative; }
  .select-wrap select {
    width: 100%; height: 40px; padding: 0 36px 0 12px;
    border: 1.5px solid var(--border); border-radius: 9px;
    background: #fafafa; font-size: 13px; color: var(--text);
    font-family: 'Inter', sans-serif; outline: none; appearance: none;
    cursor: pointer; transition: border-color .2s;
  }
  .select-wrap select:focus { border-color: var(--green-btn); background: #fff; }
  .select-arrow {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    color: var(--muted); pointer-events: none;
  }

  .field input[type="text"] {
    height: 40px; padding: 0 12px;
    border: 1.5px solid var(--border); border-radius: 9px;
    background: #fafafa; font-size: 13px; color: var(--text);
    font-family: 'Inter', sans-serif; outline: none; transition: border-color .2s;
  }
  .field input[type="text"]:focus { border-color: var(--green-btn); background: #fff; }
  .field input::placeholder { color: #b0b7c0; }

  /* version info row */
  .version-row { display: flex; align-items: center; gap: 10px; }
  .version-row .select-wrap { flex: 1; }
  .version-link {
    font-size: 12.5px; color: var(--green-btn); font-weight: 500;
    cursor: pointer; white-space: nowrap; background: none; border: none;
    font-family: 'Inter', sans-serif;
  }
  .version-link:hover { text-decoration: underline; }

  /* model preview card */
  .model-preview-card {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px; border: 1.5px solid var(--border);
    border-radius: 10px; background: #fafafa; margin-top: 10px;
  }
  .model-thumb {
    width: 36px; height: 36px; background: var(--green-light);
    border-radius: 9px; display: flex; align-items: center;
    justify-content: center; font-size: 17px; flex-shrink: 0;
  }
  .model-info { flex: 1; }
  .model-info .m-name { font-size: 13px; font-weight: 600; color: var(--text); }
  .model-info .m-meta { font-size: 11.5px; color: var(--muted); margin-top: 2px; }
  .model-info .m-vars { font-size: 11px; color: var(--muted); margin-top: 1px; }
  .btn-preview {
    font-size: 12.5px; color: var(--green-btn); font-weight: 500;
    cursor: pointer; background: none; border: none; font-family: 'Inter', sans-serif;
    white-space: nowrap;
  }
  .btn-preview:hover { text-decoration: underline; }

  /* variables grid */
  .vars-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .vars-grid .field { margin-bottom: 0; }

  /* nav buttons */
  .form-nav {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 4px;
  }
  .btn-back {
    display: flex; align-items: center; gap: 6px;
    background: var(--white); color: var(--text);
    border: 1.5px solid var(--border); border-radius: 9px;
    padding: 9px 20px; font-size: 13px; font-weight: 500;
    font-family: 'Inter', sans-serif; cursor: pointer; transition: border-color .18s;
  }
  .btn-back:hover { border-color: var(--green-btn); color: var(--green-btn); }

  .btn-next {
    display: flex; align-items: center; gap: 7px;
    background: var(--green-btn); color: #fff;
    border: none; border-radius: 9px; padding: 10px 22px;
    font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: background .18s;
  }
  .btn-next:hover { background: #2f6b2f; }

  /* ── PREVIEW PANEL ── */
  .preview-panel {
    width: 240px; flex-shrink: 0;
    display: flex; flex-direction: column; gap: 0;
  }

  .preview-card {
    background: var(--white); border-radius: 12px;
    overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    display: flex; flex-direction: column;
  }

  .preview-card-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 14px; border-bottom: 1px solid var(--border);
  }
  .preview-card-header span {
    font-family: 'Sora', sans-serif; font-size: 12px; font-weight: 700; color: var(--text);
  }
  .preview-close {
    width: 22px; height: 22px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    background: #f3f4f6; border: none; cursor: pointer; color: var(--muted);
    transition: background .15s;
  }
  .preview-close:hover { background: var(--border); }

  /* email mock */
  .email-mock { padding: 12px; display: flex; flex-direction: column; gap: 0; }

  .mock-window-bar {
    display: flex; gap: 5px; margin-bottom: 10px;
  }
  .mock-dot {
    width: 8px; height: 8px; border-radius: 50%;
  }
  .mock-dot.red { background: #ef4444; }
  .mock-dot.yellow { background: #f5c518; }
  .mock-dot.green { background: #22c55e; }

  .mock-email {
    border: 1px solid var(--border); border-radius: 8px; overflow: hidden;
    font-size: 10px;
  }

  .mock-top-bar {
    background: var(--green-dark); padding: 6px 10px;
    display: flex; align-items: center; gap: 7px;
  }
  .mock-logo-badge {
    width: 20px; height: 20px; background: var(--yellow); border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-weight: 800; font-size: 8px; color: #1a1a1a;
  }
  .mock-top-text .t1 { font-size: 9px; font-weight: 700; color: #fff; line-height: 1.2; }
  .mock-top-text .t2 { font-size: 8px; color: rgba(255,255,255,0.6); }

  .mock-hero {
    background: var(--green-light); padding: 16px 12px 12px;
    text-align: center; display: flex; flex-direction: column; align-items: center; gap: 6px;
  }
  .mock-hero-emoji { font-size: 22px; }
  .mock-hero-title {
    font-family: 'Sora', sans-serif; font-size: 10px; font-weight: 700;
    color: var(--green-dark); line-height: 1.3; text-align: center;
  }

  .mock-body { padding: 10px 12px; background: #fff; }
  .mock-greeting { font-size: 9.5px; color: var(--text); margin-bottom: 6px; }
  .mock-lines { display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; }
  .mock-line {
    height: 5px; background: #e5e7eb; border-radius: 3px;
  }

  .mock-cta {
    background: var(--yellow); border-radius: 5px;
    padding: 7px 10px; text-align: center;
    font-size: 9px; font-weight: 700; color: #1a1a1a;
    font-family: 'Sora', sans-serif; margin-bottom: 10px;
  }

  .mock-footer {
    padding: 8px 12px; background: #f9fafb; border-top: 1px solid var(--border);
    font-size: 8px; color: var(--muted); line-height: 1.5;
  }

  /* ── FOOTER ── */
  .footer {
    padding: 11px 24px; font-size: 11.5px; color: var(--muted);
    background: var(--green-light); border-top: 1px solid var(--border); flex-shrink: 0;
  }
`;

// ── Icons ──
const ChevDown = ({ s = 12 }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const ChevRight = ({ s = 12 }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const ChevLeft = ({ s = 13 }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const XIcon = ({ s = 12 }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const GridIcon = ({ s = 16 }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);
const ListIcon = ({ s = 16 }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);
const SendIcon = ({ s = 16 }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const BarIcon = ({ s = 16 }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);
const GearIcon = ({ s = 16 }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

// ── Steps config ──
const STEPS = [
  { num: 1, name: "Modelo", sub: "Selecione o modelo" },
  { num: 2, name: "Variáveis", sub: "Personalize o conteúdo" },
  { num: 3, name: "Destinatários", sub: "Defina os alvos" },
  { num: 4, name: "Envio", sub: "Agende ou envie" },
];

export default function EnviarPage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Envios");
  const [currentStep, setCurrentStep] = useState(2); // 1-indexed; screenshot shows step 2 active
  const [modelo, setModelo] = useState("Campanha Safrinha");

  const handleNavClick = (item) => {
    setActiveNav(item);
    navigate(getRoute(item));
  };
  const [versao, setVersao] = useState("v2.3 — Versão mais recente");
  const [nome, setNome] = useState("");
  const [regiao, setRegiao] = useState("Sul");
  const [produto, setProduto] = useState(
    "John Deere S780 — Colhetadeira de Grãos",
  );

  const navItems = HEADER_NAV_ITEMS;

  const stepState = (n) => {
    if (n < currentStep) return "done";
    if (n === currentStep) return "active";
    return "idle";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <Sidebar activeNav={activeNav} onNavClick={handleNavClick} />

        <div className="main">
          <HeaderNav
            activeNav={activeNav}
            onNavClick={handleNavClick}
            navItems={navItems}
          />

          {/* CONTENT */}
          <div className="content">
            {/* Page Header */}
            <div className="page-header">
              <h1>Enviar E-mail</h1>
              <p className="page-sub">
                Compose e agende sua campanha em 4 passos simples
              </p>
            </div>

            {/* Stepper */}
            <div className="stepper">
              {STEPS.map((step, idx) => (
                <div
                  key={step.num}
                  style={{ display: "flex", alignItems: "center", flex: 1 }}
                >
                  <div
                    className={`step ${stepState(step.num)}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setCurrentStep(step.num)}
                  >
                    <div className={`step-circle ${stepState(step.num)}`}>
                      {stepState(step.num) === "done" ? "✓" : step.num}
                    </div>
                    <div className="step-label">
                      <span className="s-name">{step.name}</span>
                      <span className="s-sub">{step.sub}</span>
                    </div>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div
                      className={`step-line ${stepState(step.num) === "done" ? "done" : ""}`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="body-layout">
              {/* ── FORM PANEL ── */}
              <div className="form-panel">
                {/* SECTION 1: Modelo */}
                <div className="section-card">
                  <div className="section-num">
                    <div className="num-badge">1</div>
                    <div>
                      <h2>Selecionar Modelo</h2>
                    </div>
                  </div>

                  <div className="field">
                    <label>Modelo</label>
                    <div className="select-wrap">
                      <select
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                      >
                        <option>Campanha Safrinha</option>
                        <option>Lançamento S780i</option>
                        <option>Relatório Mensal Gerentes</option>
                        <option>Newsletter Revendas</option>
                      </select>
                      <span className="select-arrow">
                        <ChevDown s={13} />
                      </span>
                    </div>
                  </div>

                  <div className="field">
                    <label>Versão do Modelo</label>
                    <div className="version-row">
                      <div className="select-wrap">
                        <select
                          value={versao}
                          onChange={(e) => setVersao(e.target.value)}
                        >
                          <option>v2.3 — Versão mais recente</option>
                          <option>v2.0 — Reformulação visual</option>
                          <option>v1.0 — Versão original</option>
                        </select>
                        <span className="select-arrow">
                          <ChevDown s={13} />
                        </span>
                      </div>
                      <button className="version-link">
                        Ver histórico de versões →
                      </button>
                    </div>
                  </div>

                  {/* Model info card */}
                  <div className="model-preview-card">
                    <div className="model-thumb">🌾</div>
                    <div className="model-info">
                      <div className="m-name">Campanha Safrinha v2.3</div>
                      <div className="m-meta">
                        Marketing Agrícola · Última edição: 28/03/2025 · 32
                        envios
                      </div>
                      <div className="m-vars">
                        3 variáveis identificadas: {"{nome_contato}"},{" "}
                        {"{regiao}"}, {"{produto}"}
                      </div>
                    </div>
                    <button className="btn-preview">Pré-visualizar →</button>
                  </div>
                </div>

                {/* SECTION 2: Variáveis */}
                <div className="section-card">
                  <div className="section-num">
                    <div className="num-badge">2</div>
                    <div>
                      <h2>Preencher Variáveis</h2>
                      <p className="section-sub">
                        Preencha as variáveis encontradas no modelo selecionado
                      </p>
                    </div>
                  </div>

                  <div className="vars-grid">
                    <div className="field">
                      <label>{"{nome_contato}"}</label>
                      <input
                        type="text"
                        placeholder="Ex. João Silva"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>{"{regiao}"}</label>
                      <div className="select-wrap">
                        <select
                          value={regiao}
                          onChange={(e) => setRegiao(e.target.value)}
                        >
                          <option>Sul</option>
                          <option>Sudeste</option>
                          <option>Centro-Oeste</option>
                          <option>Norte</option>
                          <option>Nordeste</option>
                        </select>
                        <span className="select-arrow">
                          <ChevDown s={13} />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="field" style={{ marginTop: 4 }}>
                    <label>{"{produto}"}</label>
                    <input
                      type="text"
                      value={produto}
                      onChange={(e) => setProduto(e.target.value)}
                    />
                  </div>
                </div>

                {/* Navigation */}
                <div className="form-nav">
                  <button
                    className="btn-back"
                    onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                  >
                    <ChevLeft s={13} /> Voltar
                  </button>
                  <button
                    className="btn-next"
                    onClick={() => setCurrentStep((s) => Math.min(4, s + 1))}
                  >
                    Próximo: Destinatários <ChevRight s={13} />
                  </button>
                </div>
              </div>

              {/* ── PREVIEW PANEL ── */}
              <div className="preview-panel">
                <div className="preview-card">
                  <div className="preview-card-header">
                    <span>Pré-visualização</span>
                    <button className="preview-close">
                      <XIcon s={11} />
                    </button>
                  </div>

                  <div className="email-mock">
                    {/* Browser-like dots */}
                    <div className="mock-window-bar">
                      <div className="mock-dot red" />
                      <div className="mock-dot yellow" />
                      <div className="mock-dot green" />
                    </div>

                    <div className="mock-email">
                      {/* Email top bar */}
                      <div className="mock-top-bar">
                        <div className="mock-logo-badge">JD</div>
                        <div className="mock-top-text">
                          <div className="t1">John Deere</div>
                          <div className="t2">Campanha Safrinha 2025</div>
                        </div>
                      </div>

                      {/* Hero */}
                      <div className="mock-hero">
                        <div className="mock-hero-emoji">🌾</div>
                        <div className="mock-hero-title">
                          A colheita perfeita começa
                          <br />
                          com o equipamento certo.
                        </div>
                      </div>

                      {/* Body */}
                      <div className="mock-body">
                        <div className="mock-greeting">
                          Olá,{" "}
                          {nome ? (
                            <strong>{nome}</strong>
                          ) : (
                            <span style={{ color: "#9ca3af" }}>
                              {"{nome_contato}"}
                            </span>
                          )}
                          ,
                        </div>
                        <div className="mock-lines">
                          <div className="mock-line" style={{ width: "90%" }} />
                          <div className="mock-line" style={{ width: "75%" }} />
                          <div className="mock-line" style={{ width: "82%" }} />
                        </div>
                        <div className="mock-cta">Ver oferta da Safrinha →</div>
                      </div>

                      {/* Footer */}
                      <div className="mock-footer">
                        © 2025 John Deere — Uso interno · Descadastrar
                        <br />
                        Região: <em>{regiao || "{regiao}"}</em> · Produto:{" "}
                        <em>
                          {produto ? produto.split("—")[0].trim() : "{produto}"}
                        </em>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <Footer />
        </div>
      </div>
    </>
  );
}
