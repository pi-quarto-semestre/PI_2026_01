import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import { getRoute } from "../components/navRoutes";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green-dark: #1a4a1a;
    --green-mid: #2d6a2d;
    --green-btn: #3a7d3a;
    --green-light: #eef4ee;
    --yellow: #f5c518;
    --yellow-soft: #fffbe6;
    --blue-tag: #2563eb;
    --orange: #f97316;
    --white: #ffffff;
    --text: #1a1a1a;
    --muted: #6b7280;
    --border: #e5e7eb;
    --sidebar-w: 52px;
    --topbar-h: 52px;
  }

  html, body, #root { height: 100%; font-family: 'Inter', sans-serif; background: var(--green-light); }

  /* ── LAYOUT ── */
  .app { display: flex; height: 100vh; overflow: hidden; }

  /* ── SIDEBAR ── */
  .sidebar {
    width: var(--sidebar-w);
    background: var(--green-dark);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0 16px;
    gap: 4px;
    flex-shrink: 0;
    z-index: 10;
  }

  .sidebar-logo {
    width: 32px; height: 32px;
    background: var(--yellow);
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif;
    font-weight: 800; font-size: 12px; color: #1a1a1a;
    margin-bottom: 18px;
  }

  .sidebar-icon {
    width: 36px; height: 36px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.55);
    cursor: pointer;
    transition: background 0.18s, color 0.18s;
    border: none; background: transparent;
  }
  .sidebar-icon:hover, .sidebar-icon.active {
    background: rgba(255,255,255,0.12);
    color: #fff;
  }
  .sidebar-icon.active { color: var(--yellow); }

  .sidebar-spacer { flex: 1; }

  /* ── MAIN ── */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

  /* ── TOPBAR ── */
  .topbar {
    height: var(--topbar-h);
    background: var(--green-dark);
    display: flex; align-items: center;
    padding: 0 24px;
    gap: 0;
    flex-shrink: 0;
  }

  .topbar-brand {
    display: flex; flex-direction: column;
    margin-right: 40px;
  }
  .topbar-brand .brand-name {
    font-family: 'Sora', sans-serif;
    font-size: 13px; font-weight: 700;
    color: #fff; line-height: 1.2;
  }
  .topbar-brand .brand-sub {
    font-size: 9px; font-weight: 600;
    letter-spacing: 1.2px;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
  }

  .topbar-nav { display: flex; align-items: center; gap: 4px; flex: 1; }

  .nav-link {
    padding: 6px 16px;
    font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,0.65);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: color 0.16s;
    background: none; border-top: none; border-left: none; border-right: none;
    font-family: 'Inter', sans-serif;
  }
  .nav-link:hover { color: #fff; }
  .nav-link.active {
    color: #fff;
    border-bottom-color: var(--yellow);
  }

  .topbar-user {
    display: flex; align-items: center; gap: 10px;
    margin-left: auto;
  }
  .topbar-user .user-info { text-align: right; }
  .topbar-user .user-name {
    font-size: 12px; font-weight: 600; color: #fff;
  }
  .topbar-user .user-role {
    font-size: 10.5px; color: rgba(255,255,255,0.55);
  }
  .user-avatar {
    width: 32px; height: 32px;
    background: var(--yellow);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif;
    font-size: 11px; font-weight: 700; color: #1a1a1a;
    flex-shrink: 0;
  }

  /* ── CONTENT ── */
  .content {
    flex: 1;
    overflow-y: auto;
    padding: 28px 32px 32px;
  }

  /* ── PAGE HEADER ── */
  .page-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 24px;
  }
  .page-header h1 {
    font-family: 'Sora', sans-serif;
    font-size: 22px; font-weight: 800; color: var(--text);
    line-height: 1.2;
  }
  .page-header .page-date {
    font-size: 12.5px; color: var(--muted); margin-top: 3px;
  }

  .btn-primary {
    display: flex; align-items: center; gap: 7px;
    background: var(--green-btn);
    color: #fff;
    border: none; border-radius: 9px;
    padding: 10px 20px;
    font-family: 'Sora', sans-serif;
    font-size: 13px; font-weight: 600;
    cursor: pointer;
    transition: background 0.18s;
    flex-shrink: 0;
  }
  .btn-primary:hover { background: #2f6b2f; }

  /* ── STAT CARDS ── */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 28px;
  }

  .stat-card {
    background: var(--white);
    border-radius: 14px;
    padding: 18px 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  }
  .stat-card.green {
    background: var(--green-btn);
  }

  .stat-label {
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .stat-card.green .stat-label { color: rgba(255,255,255,0.75); }

  .stat-value {
    font-family: 'Sora', sans-serif;
    font-size: 32px; font-weight: 800;
    color: var(--text); line-height: 1;
    margin-bottom: 6px;
  }
  .stat-card.green .stat-value { color: #fff; }

  .stat-sub {
    font-size: 11.5px; color: var(--green-btn); font-weight: 500;
  }
  .stat-card.green .stat-sub { color: var(--yellow); }

  .stat-icon {
    position: absolute; top: 16px; right: 16px;
    color: #d1d5db; opacity: 0.7;
  }
  .stat-card.green .stat-icon { color: rgba(255,255,255,0.3); opacity: 1; }

  /* ── SECTION HEADER ── */
  .section-header {
    display: flex; align-items: baseline; justify-content: space-between;
    margin-bottom: 6px;
  }
  .section-header h2 {
    font-family: 'Sora', sans-serif;
    font-size: 15px; font-weight: 700; color: var(--text);
  }
  .section-header .see-all {
    font-size: 12.5px; color: var(--green-btn); font-weight: 500;
    cursor: pointer; background: none; border: none;
    font-family: 'Inter', sans-serif;
  }
  .section-header .see-all:hover { text-decoration: underline; }
  .section-sub {
    font-size: 12px; color: var(--muted); margin-bottom: 16px;
  }

  /* ── MODEL CARDS ── */
  .model-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-bottom: 28px;
  }

  .model-card {
    background: var(--white);
    border-radius: 14px;
    padding: 18px 20px 16px;
    border-top: 3px solid transparent;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
    display: flex; flex-direction: column;
    gap: 0;
  }
  .model-card.green-top  { border-top-color: var(--green-btn); }
  .model-card.yellow-top { border-top-color: var(--yellow); }
  .model-card.blue-top   { border-top-color: var(--blue-tag); }

  .model-card-header {
    display: flex; align-items: flex-start; gap: 12px;
    margin-bottom: 14px;
  }

  .model-icon-wrap {
    width: 40px; height: 40px;
    background: var(--green-light);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-size: 20px;
  }

  .model-meta { flex: 1; }
  .model-name {
    font-family: 'Sora', sans-serif;
    font-size: 13.5px; font-weight: 700; color: var(--text);
    display: flex; align-items: center; gap: 7px; flex-wrap: wrap;
  }
  .version-tag {
    font-size: 10px; font-weight: 600;
    padding: 2px 7px; border-radius: 20px;
    font-family: 'Inter', sans-serif;
  }
  .version-tag.green { background: #dcfce7; color: #166534; }
  .version-tag.yellow { background: #fef9c3; color: #854d0e; }
  .version-tag.blue   { background: #dbeafe; color: #1e40af; }

  .model-category {
    font-size: 11.5px; color: var(--muted); margin-top: 2px;
  }

  .model-card-divider {
    border: none; border-top: 1px solid var(--border);
    margin: 10px 0 12px;
  }

  .model-info-row {
    display: flex; flex-direction: column; gap: 3px;
    margin-bottom: 14px;
  }
  .model-info-row span {
    font-size: 11.5px; color: var(--muted);
  }
  .model-info-row span strong { color: var(--text); font-weight: 500; }

  .model-card-actions { display: flex; gap: 10px; margin-top: auto; }

  .btn-use {
    flex: 1;
    background: var(--green-btn);
    color: #fff;
    border: none; border-radius: 8px;
    padding: 8px 0;
    font-size: 12.5px; font-weight: 600;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: background 0.18s;
  }
  .btn-use:hover { background: #2f6b2f; }

  .btn-view {
    flex: 1;
    background: transparent;
    color: var(--text);
    border: 1.5px solid var(--border);
    border-radius: 8px;
    padding: 8px 0;
    font-size: 12.5px; font-weight: 500;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: border-color 0.18s;
  }
  .btn-view:hover { border-color: var(--green-btn); color: var(--green-btn); }

  /* ── SCHEDULED TABLE ── */
  .table-card {
    background: var(--white);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }

  thead tr {
    background: #f9fafb;
    border-bottom: 1px solid var(--border);
  }

  thead th {
    padding: 11px 16px;
    text-align: left;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--muted);
  }

  tbody tr {
    border-bottom: 1px solid var(--border);
    transition: background 0.15s;
  }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: #f9fafb; }

  tbody td { padding: 13px 16px; vertical-align: middle; }

  .row-indicator {
    display: flex; align-items: flex-start; gap: 8px;
  }
  .dot {
    width: 7px; height: 7px; border-radius: 50%;
    margin-top: 5px; flex-shrink: 0;
  }
  .dot.green { background: var(--green-btn); }
  .dot.yellow { background: var(--yellow); }
  .dot.blue   { background: var(--blue-tag); }

  .row-name { font-weight: 600; color: var(--text); font-size: 13px; }
  .row-sub  { font-size: 11px; color: var(--muted); margin-top: 1px; }

  .badge-agendado {
    display: inline-block;
    background: #fff7ed;
    color: var(--orange);
    border: 1px solid #fed7aa;
    border-radius: 20px;
    padding: 3px 10px;
    font-size: 11.5px; font-weight: 600;
  }

  .actions-cell { display: flex; gap: 14px; }

  .act-edit {
    font-size: 12.5px; color: var(--green-btn); font-weight: 500;
    cursor: pointer; background: none; border: none;
    font-family: 'Inter', sans-serif;
  }
  .act-edit:hover { text-decoration: underline; }

  .act-cancel {
    font-size: 12.5px; color: #dc2626; font-weight: 500;
    cursor: pointer; background: none; border: none;
    font-family: 'Inter', sans-serif;
  }
  .act-cancel:hover { text-decoration: underline; }

  /* ── FOOTER ── */
  .footer {
    padding: 14px 32px;
    font-size: 11.5px;
    color: var(--muted);
    background: var(--green-light);
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }
`;

// ── Icons ──
const GridIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
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
const ListIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
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
const SendIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
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
const BarChartIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
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
const GearIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
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
const FileIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);
const MailBulkIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const CalendarIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const TrendUpIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const PlusIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// ── Data ──
const scheduled = [
  {
    dot: "yellow",
    name: "Campanha Safrinha v2.3",
    cat: "Marketing Agrícola",
    recipients: "847 contatos (Lista Sul)",
    datetime: "03/04/2025 — 08:00",
    status: "Agendado",
    createdBy: "Maria Alves",
  },
  {
    dot: "blue",
    name: "Relatório Mensal v4.1",
    cat: "Comunicados Internos",
    recipients: "12 gerentes regionais",
    datetime: "05/04/2025 — 09:00",
    status: "Agendado",
    createdBy: "Carlos Mendes",
  },
  {
    dot: "green",
    name: "Lançamento S780i v1.0",
    cat: "Produtos e Lançamentos",
    recipients: "2.340 revendas (Nacional)",
    datetime: "07/04/2025 — 14:30",
    status: "Agendado",
    createdBy: "Maria Alves",
  },
];

const models = [
  {
    topColor: "green-top",
    icon: "🌾",
    name: "Campanha Sa...",
    version: "v2.1",
    tagStyle: "green",
    cat: "Marketing Agrícola",
    lastEdit: "28/03/2025",
    sends: "32 envios realizados",
  },
  {
    topColor: "yellow-top",
    icon: "🚜",
    name: "Lançamento S7l...",
    version: "v1.0",
    tagStyle: "yellow",
    cat: "Produtos e Lançamentos",
    lastEdit: "25/03/2025",
    sends: "8 envios realizados",
  },
  {
    topColor: "blue-top",
    icon: "📄",
    name: "Relatório Mensal",
    version: "v4.1",
    tagStyle: "blue",
    cat: "Comunicados Internos",
    lastEdit: "01/04/2025",
    sends: "156 envios realizados",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Dashboard");
  const navItems = ["Dashboard", "Modelos", "Envios"];

  const handleNavClick = (item) => {
    setActiveNav(item);
    navigate(getRoute(item));
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

          {/* ── CONTENT ── */}
          <div className="content">
            {/* Page Header */}
            <div className="page-header">
              <div>
                <h1>Dashboard</h1>
                <p className="page-date">Quarta-feira, 01 de abril de 2025</p>
              </div>
              <button className="btn-primary">
                <PlusIcon size={14} />
                Enviar E-mail
              </button>
            </div>

            {/* Stats */}
            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <FileIcon size={20} />
                </div>
                <div className="stat-label">Modelos Ativos</div>
                <div className="stat-value">24</div>
                <div className="stat-sub">↑ 3 novos este mês</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <MailBulkIcon size={20} />
                </div>
                <div className="stat-label">Envios no Mês</div>
                <div className="stat-value">1.847</div>
                <div className="stat-sub">↑ 12% vs mês anterior</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <TrendUpIcon size={20} />
                </div>
                <div className="stat-label">Taxa de Abertura</div>
                <div className="stat-value">68%</div>
                <div className="stat-sub">↑ 5pp acima da média</div>
              </div>
              <div className="stat-card green">
                <div className="stat-icon">
                  <CalendarIcon size={20} />
                </div>
                <div className="stat-label">Agendados</div>
                <div className="stat-value">7</div>
                <div className="stat-sub">próximos 7 dias</div>
              </div>
            </div>

            {/* Models */}
            <div className="section-header">
              <h2>Modelos Recentes</h2>
              <button className="see-all">Ver todos →</button>
            </div>
            <p className="section-sub">
              Acesso rápido aos seus modelos mais usados
            </p>

            <div className="model-grid">
              {models.map((m, i) => (
                <div key={i} className={`model-card ${m.topColor}`}>
                  <div className="model-card-header">
                    <div className="model-icon-wrap">{m.icon}</div>
                    <div className="model-meta">
                      <div className="model-name">
                        {m.name}
                        <span className={`version-tag ${m.tagStyle}`}>
                          {m.version}
                        </span>
                      </div>
                      <div className="model-category">{m.cat}</div>
                    </div>
                  </div>
                  <hr className="model-card-divider" />
                  <div className="model-info-row">
                    <span>
                      Última edição: <strong>{m.lastEdit}</strong>
                    </span>
                    <span>{m.sends}</span>
                  </div>
                  <div className="model-card-actions">
                    <button className="btn-use">Usar modelo</button>
                    <button className="btn-view">Visualizar</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Scheduled */}
            <div className="section-header" style={{ marginBottom: 14 }}>
              <h2>Próximos Envios Agendados</h2>
            </div>

            <div className="table-card">
              <table>
                <thead>
                  <tr>
                    <th>Modelo</th>
                    <th>Destinatários</th>
                    <th>Data/Hora</th>
                    <th>Status</th>
                    <th>Criado Por</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduled.map((row, i) => (
                    <tr key={i}>
                      <td>
                        <div className="row-indicator">
                          <div className={`dot ${row.dot}`} />
                          <div>
                            <div className="row-name">{row.name}</div>
                            <div className="row-sub">{row.cat}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: "#4b5563", fontSize: 13 }}>
                        {row.recipients}
                      </td>
                      <td style={{ color: "#4b5563", fontSize: 13 }}>
                        {row.datetime}
                      </td>
                      <td>
                        <span className="badge-agendado">{row.status}</span>
                      </td>
                      <td style={{ color: "#4b5563", fontSize: 13 }}>
                        {row.createdBy}
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button className="act-edit">Editar</button>
                          <button className="act-cancel">Cancelar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <footer className="footer">
            John Deere Mail Manager — Plataforma de uso interno © 2025
          </footer>
        </div>
      </div>
    </>
  );
}
