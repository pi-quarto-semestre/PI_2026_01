import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import { getRoute } from "../hooks/navRoutes";
import { HEADER_NAV_ITEMS } from "../components/HeaderNav";
import { StyleDashboard } from "../css/StyleDashboard";
import Footer from "../components/Footer";

// ── Icons ──
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
  const navItems = HEADER_NAV_ITEMS;

  const handleNavClick = (item) => {
    setActiveNav(item);
    navigate(getRoute(item));
  };

  return (
    <>
      <style>{<StyleDashboard />}</style>
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
          
          {/* FOOTER */}
          <Footer />
        </div>
      </div>
    </>
  );
}
