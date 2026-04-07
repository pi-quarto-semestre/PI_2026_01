import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import { getRoute } from "../components/navRoutes";
import { HEADER_NAV_ITEMS } from "../components/HeaderNav";
import ApiConsuming from "./ApiConsuming";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green-dark: #1a4a1a;
    --green-mid:  #2d6a2d;
    --green-btn:  #3a7d3a;
    --green-light:#eef4ee;
    --yellow:     #f5c518;
    --white:      #ffffff;
    --text:       #1a1a1a;
    --muted:      #6b7280;
    --border:     #e5e7eb;
    --row-hover:  #f9fafb;
    --sidebar-w:  52px;
    --topbar-h:   52px;
  }

  html, body, #root { height: 100%; font-family: 'Inter', sans-serif; background: var(--green-light); }

  .app { display: flex; height: 100vh; overflow: hidden; }

  /* ── SIDEBAR ── */
  .sidebar {
    width: var(--sidebar-w);
    background: var(--green-dark);
    display: flex; flex-direction: column; align-items: center;
    padding: 12px 0 16px; gap: 4px; flex-shrink: 0; z-index: 10;
  }
  .sidebar-logo {
    width: 32px; height: 32px; background: var(--yellow);
    border-radius: 7px; display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-weight: 800; font-size: 12px; color: #1a1a1a;
    margin-bottom: 18px;
  }
  .sidebar-icon {
    width: 36px; height: 36px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.5); cursor: pointer;
    transition: background .18s, color .18s;
    border: none; background: transparent;
  }
  .sidebar-icon:hover { background: rgba(255,255,255,0.1); color: #fff; }
  .sidebar-icon.active { background: rgba(255,255,255,0.12); color: var(--yellow); }
  .sidebar-spacer { flex: 1; }

  /* ── MAIN ── */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

  /* ── TOPBAR ── */
  .topbar {
    height: var(--topbar-h); background: var(--green-dark);
    display: flex; align-items: center; padding: 0 24px; flex-shrink: 0;
  }
  .topbar-brand { display: flex; flex-direction: column; margin-right: 40px; }
  .topbar-brand .brand-name {
    font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 700; color: #fff; line-height: 1.2;
  }
  .topbar-brand .brand-sub {
    font-size: 9px; font-weight: 600; letter-spacing: 1.2px;
    color: rgba(255,255,255,0.5); text-transform: uppercase;
  }
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
  .topbar-user .user-info { text-align: right; }
  .topbar-user .user-name { font-size: 12px; font-weight: 600; color: #fff; }
  .topbar-user .user-role { font-size: 10.5px; color: rgba(255,255,255,0.55); }
  .user-avatar {
    width: 32px; height: 32px; background: var(--yellow); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-size: 11px; font-weight: 700; color: #1a1a1a;
  }

  /* ── CONTENT ── */
  .content { flex: 1; overflow-y: auto; padding: 24px 28px 28px; display: flex; flex-direction: column; gap: 18px; }

  /* ── PAGE HEADER ── */
  .page-header { display: flex; align-items: flex-start; justify-content: space-between; }
  .page-header h1 {
    font-family: 'Sora', sans-serif; font-size: 21px; font-weight: 800; color: var(--text); line-height: 1.2;
  }
  .page-header .page-sub { font-size: 12.5px; color: var(--muted); margin-top: 3px; }
  .header-actions { display: flex; gap: 10px; align-items: center; }

  .btn-secondary {
    display: flex; align-items: center; gap: 6px;
    background: var(--white); color: var(--text);
    border: 1.5px solid var(--border); border-radius: 9px;
    padding: 9px 18px; font-size: 13px; font-weight: 500;
    font-family: 'Inter', sans-serif; cursor: pointer; transition: border-color .18s;
  }
  .btn-secondary:hover { border-color: var(--green-btn); color: var(--green-btn); }

  .btn-primary {
    display: flex; align-items: center; gap: 6px;
    background: var(--green-btn); color: #fff;
    border: none; border-radius: 9px; padding: 9px 18px;
    font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: background .18s;
  }
  .btn-primary:hover { background: #2f6b2f; }

  /* ── TOOLBAR ── */
  .toolbar { display: flex; align-items: center; gap: 10px; }

  .search-wrap { position: relative; flex: 0 0 260px; }
  .search-wrap input {
    width: 100%; height: 38px; padding: 0 14px 0 36px;
    border: 1.5px solid var(--border); border-radius: 9px;
    background: var(--white); font-size: 13px; color: var(--text);
    font-family: 'Inter', sans-serif; outline: none; transition: border-color .2s;
  }
  .search-wrap input:focus { border-color: var(--green-btn); }
  .search-wrap input::placeholder { color: #b0b7c0; }
  .search-icon {
    position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
    color: #9ca3af; pointer-events: none;
  }

  .filter-btn {
    height: 38px; padding: 0 14px; display: flex; align-items: center; gap: 5px;
    border: 1.5px solid var(--border); border-radius: 9px; background: var(--white);
    font-size: 13px; color: var(--text); cursor: pointer; font-family: 'Inter', sans-serif;
    transition: border-color .18s;
  }
  .filter-btn:hover { border-color: var(--green-btn); }

  .toolbar-spacer { flex: 1; }

  .view-toggle { display: flex; gap: 2px; }
  .view-btn {
    width: 36px; height: 36px; border-radius: 8px; border: 1.5px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    background: var(--white); color: var(--muted); cursor: pointer; transition: all .18s;
  }
  .view-btn.active { background: var(--green-light); border-color: var(--green-btn); color: var(--green-btn); }

  /* ── TABLE ── */
  .table-wrap {
    background: var(--white); border-radius: 14px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
    display: flex; flex-direction: column; max-height: 600px; overflow: hidden;
  }

  table { width: 100%; border-collapse: collapse; font-size: 13px; overflow:auto}

  .table-wrap table {
    display: flex;
    flex-direction: column;
  }

  .table-wrap thead {
    flex-shrink: 0;
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  .table-wrap tbody {
    display: block;
    overflow-y: auto;
    flex: 1;
  }

  .table-wrap tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  thead tr { background: var(--green-btn); }
  thead th {
    padding: 11px 14px; text-align: left;
    font-size: 10.5px; font-weight: 600; letter-spacing: 0.7px;
    text-transform: uppercase; color: rgba(255,255,255,0.9);
    white-space: nowrap;
  }

  .table-wrap tbody tr { border-bottom: 1px solid var(--border); transition: background .15s; }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: var(--row-hover); }
  tbody tr.sub-row { background: #f9fafb; }
  tbody tr.sub-row:hover { background: #f3f4f6; }

  tbody td { padding: 11px 14px; vertical-align: middle; }

  /* model name cell */
  .model-cell { display: flex; align-items: center; gap: 10px; }
  .model-thumb {
    width: 34px; height: 34px; border-radius: 8px;
    background: var(--green-light); display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .model-thumb.sub {
    width: 28px; height: 28px; background: #f0f0f0; border-radius: 6px; font-size: 12px;
  }
  .model-name-text { font-weight: 600; color: var(--text); font-size: 13px; }
  .model-file { font-size: 11px; color: var(--muted); margin-top: 1px; }

  .expand-btn {
    background: none; border: none; cursor: pointer; color: var(--muted);
    display: flex; align-items: center; padding: 2px;
    transition: color .15s;
  }
  .expand-btn:hover { color: var(--text); }
  .expand-btn.open { color: var(--green-btn); }

  /* version tags */
  .version-tags { display: flex; gap: 5px; flex-wrap: wrap; }
  .vtag {
    padding: 2px 8px; border-radius: 20px; font-size: 10.5px; font-weight: 600;
    font-family: 'Inter', sans-serif; cursor: pointer;
  }
  .vtag.grey   { background: #f3f4f6; color: var(--muted); }
  .vtag.green  { background: #dcfce7; color: #166534; }
  .vtag.yellow { background: #fef9c3; color: #854d0e; }
  .vtag.blue   { background: #dbeafe; color: #1e40af; }

  .current-badge {
    font-size: 13px; font-weight: 600; color: var(--text);
  }

  /* status badge */
  .status-badge {
    display: inline-block; padding: 3px 10px; border-radius: 20px;
    font-size: 11.5px; font-weight: 600;
  }
  .status-badge.ativa   { background: #dcfce7; color: #166534; }
  .status-badge.inativa { background: #f3f4f6; color: var(--muted); }

  /* actions cell */
  .actions-cell { display: flex; align-items: center; gap: 10px; }
  .act-link {
    font-size: 12.5px; font-weight: 500; cursor: pointer;
    background: none; border: none; font-family: 'Inter', sans-serif;
    transition: color .15s; padding: 0;
  }
  .act-link.green { color: var(--green-btn); }
  .act-link.green:hover { text-decoration: underline; }
  .act-link.grey  { color: var(--muted); }
  .act-link.grey:hover  { color: var(--text); }
  .act-more {
    width: 24px; height: 24px; border-radius: 6px; border: none;
    background: transparent; cursor: pointer; display: flex; align-items: center;
    justify-content: center; color: var(--muted); transition: background .15s;
  }
  .act-more:hover { background: var(--border); color: var(--text); }

  /* sub-row details */
  .sub-date { font-size: 12px; color: var(--muted); }
  .sub-desc { font-size: 11px; color: #9ca3af; margin-top: 1px; }

  /* ── PAGINATION ── */
  .table-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px; border-top: 1px solid var(--border);
    font-size: 12.5px; color: var(--muted);
  }
  .pagination { display: flex; gap: 4px; align-items: center; }
  .page-btn {
    width: 30px; height: 30px; border-radius: 7px; border: 1.5px solid var(--border);
    background: var(--white); font-size: 12.5px; color: var(--muted);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all .18s; font-family: 'Inter', sans-serif;
  }
  .page-btn:hover { border-color: var(--green-btn); color: var(--green-btn); }
  .page-btn.active { background: var(--green-btn); border-color: var(--green-btn); color: #fff; font-weight: 600; }

  /* ── DROP ZONE ── */
  .dropzone {
    border: 2px dashed var(--border); border-radius: 14px;
    padding: 36px 20px; text-align: center;
    background: var(--white); cursor: pointer; transition: border-color .2s, background .2s;
  }
  .dropzone:hover { border-color: var(--green-btn); background: #f4faf4; }
  .dropzone-icon { color: #c7cfd8; margin-bottom: 10px; }
  .dropzone-text { font-size: 13px; color: var(--muted); }
  .dropzone-text a { color: var(--green-btn); font-weight: 600; text-decoration: none; cursor: pointer; }
  .dropzone-sub { font-size: 11.5px; color: #b0b7c0; margin-top: 4px; }

  /* ── FOOTER ── */
  .footer {
    padding: 12px 28px; font-size: 11.5px; color: var(--muted);
    background: var(--green-light); border-top: 1px solid var(--border); flex-shrink: 0;
  }
`;

// ── Icons ──
const Icon = ({ d, size = 16, ...p }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <path d={d} />
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
const ListIcon2 = ({ s = 16 }) => (
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
const SearchIcon = ({ s = 15 }) => (
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
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
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
const MoreIcon = ({ s = 15 }) => (
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
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);
const UploadIcon = ({ s = 32 }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
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
const PlusIcon = ({ s = 14 }) => (
  <svg
    width={s}
    height={s}
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
const ImportIcon = ({ s = 14 }) => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// ── Data ──
// Retornar do backend uma estrutura mais ou menos dessa forma para deixar a tabela dinamica
const MODELS = [
  {
    id: 0,
    icon: "🌾",
    name: "Teste123",
    file: "",
    category: "",
    versions: [],
    current: "",
    tagStyle: [],
    lastEdit: "",
    sends: null,
    subVersions: [
      {
        ver: "Versão 2.3",
        date: "28/03/2025 — Maria Alves",
        desc: "Ajuste no CTA e cores da safrinha",
        status: "Ativa",
        icon: "🌾",
      },
    ],
  },
];

export default function ModelosPage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Modelos");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState({ 1: true });
  const [viewMode, setViewMode] = useState("list");
  const [activePage, setActivePage] = useState(1);
  const navItems = HEADER_NAV_ITEMS;

  const handleNavClick = (item) => {
    setActiveNav(item);
    navigate(getRoute(item));
  };

  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const filtered = MODELS.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase()),
  );

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
              <div>
                <h1>Modelos de E-mail</h1>
                <p className="page-sub">
                  Gerencie e versione os modelos da sua pasta
                </p>
              </div>
              <div className="header-actions">
                <button className="btn-secondary">
                  <ImportIcon s={14} /> Importar
                </button>
                <button className="btn-primary">
                  <PlusIcon s={14} /> Novo
                </button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="toolbar">
              <div className="search-wrap">
                <span className="search-icon">
                  <SearchIcon s={14} />
                </span>
                <input
                  type="text"
                  placeholder="Buscar modelos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="filter-btn">
                Categoria <ChevDown s={11} />
              </button>
              <button className="filter-btn">
                Versão <ChevDown s={11} />
              </button>
              <button className="filter-btn">
                Status <ChevDown s={11} />
              </button>
              <div className="toolbar-spacer" />
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <GridIcon s={15} />
                </button>
                <button
                  className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <ListIcon2 s={15} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: 280 }}>Modelo</th>
                    <th style={{ width: 200 }}>Categoria</th>
                    <th style={{ width: 180 }}>Versões</th>
                    <th style={{ width: 80 }}>Atual</th>
                    <th style={{ width: 120 }}>Última Edição</th>
                    <th style={{ width: 70 }}>Envios</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m) => (
                    <>
                      {/* Main row */}
                      <tr key={m.id}>
                        <td>
                          <div className="model-cell">
                            {m.subVersions ? (
                              <button
                                className={`expand-btn ${expanded[m.id] ? "open" : ""}`}
                                onClick={() => toggle(m.id)}
                              >
                                {expanded[m.id] ? (
                                  <ChevDown s={13} />
                                ) : (
                                  <ChevRight s={13} />
                                )}
                              </button>
                            ) : (
                              <span
                                style={{ width: 20, display: "inline-block" }}
                              />
                            )}
                            <div className="model-thumb">{m.icon}</div>
                            <div>
                              <div className="model-name-text">{m.name}</div>
                              <div className="model-file">{m.file}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ color: "#4b5563", fontSize: 13 }}>
                          {m.category}
                        </td>
                        <td>
                          <div className="version-tags">
                            {m.versions.map((v, i) => (
                              <span key={i} className={`vtag ${m.tagStyle[i]}`}>
                                {v}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <span className="current-badge">{m.current}</span>
                        </td>
                        <td style={{ color: "#4b5563", fontSize: 13 }}>
                          {m.lastEdit}
                        </td>
                        <td style={{ color: "#4b5563", fontSize: 13 }}>
                          {m.sends}
                        </td>
                        <td>
                          <div className="actions-cell">
                            <button className="act-link green">Usar</button>
                            <button className="act-link grey">Editar</button>
                            <button className="act-more">
                              <MoreIcon s={14} />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Sub-version rows */}
                      {expanded[m.id] &&
                        m.subVersions &&
                        m.subVersions.map((sv, si) => (
                          <tr key={`${m.id}-sub-${si}`} className="sub-row">
                            <td>
                              <div
                                className="model-cell"
                                style={{ paddingLeft: 32 }}
                              >
                                <div className="model-thumb sub">{sv.icon}</div>
                                <div>
                                  <div
                                    className="model-name-text"
                                    style={{ fontWeight: 500 }}
                                  >
                                    {sv.ver}
                                  </div>
                                  <div className="sub-desc">{sv.desc}</div>
                                </div>
                              </div>
                            </td>
                            <td colSpan={3}>
                              <div className="sub-date">{sv.date}</div>
                            </td>
                            <td colSpan={2}>
                              <span
                                className={`status-badge ${sv.status.toLowerCase()}`}
                              >
                                {sv.status}
                              </span>
                            </td>
                            <td>
                              <div className="actions-cell">
                                {sv.status === "Ativa" && (
                                  <button className="act-link green">
                                    Usar
                                  </button>
                                )}
                                <button className="act-link grey">Ver</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </>
                  ))}
                </tbody>
              </table>

              {/* Table footer */}
              <div className="table-footer">
                <span>Exibindo {filtered.length} de 24 modelos</span>
                <div className="pagination">
                  <button className="page-btn">‹</button>
                  {[1, 2, 3].map((p) => (
                    <button
                      key={p}
                      className={`page-btn ${activePage === p ? "active" : ""}`}
                      onClick={() => setActivePage(p)}
                    >
                      {p}
                    </button>
                  ))}
                  <button className="page-btn">›</button>
                </div>
              </div>
            </div>

            {/* Drop zone */}
            <div className="dropzone">
              <div className="dropzone-icon">
                <UploadIcon s={30} />
              </div>
              <div className="dropzone-text">
                Arraste um arquivo HTML para adicionar novo modelo, ou clique em{" "}
                <a>+ Novo</a>
              </div>
              <div className="dropzone-sub">
                Formatos suportados: .html, .htm — Máx. 5MB por arquivo
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <footer className="footer">
            John Deere Mail Manager — Plataforma de uso interno © 2025
          </footer>
        </div>
      </div>
    </>
  );
}
