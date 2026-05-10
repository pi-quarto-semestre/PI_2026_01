import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import { getRoute } from "../hooks/navRoutes";
import { HEADER_NAV_ITEMS } from "../components/HeaderNav";
import { StyleDashboard } from "../css/StyleDashboard";
import Footer from "../components/Footer";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { useTemplateLibrary } from "../hooks/useTemplateLibrary";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  getUserTemplateActivity,
  isSameMonth,
} from "../../services/templateActivity";

const RECENT_MODEL_TOP_COLORS = ["green-top", "yellow-top", "blue-top"];
const RECENT_VERSION_TAGS = ["green", "yellow", "blue"];

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

const getTimestamp = (value) => {
  const timestamp = new Date(value).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const formatDashboardDate = (value = new Date()) => {
  const formattedValue = value.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);
};

const formatDateTime = (value) => {
  const timestamp = getTimestamp(value);

  if (!timestamp) {
    return "—";
  }

  return new Date(timestamp).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const formatNumber = (value) => Number(value ?? 0).toLocaleString("pt-BR");

const isModelActive = (model) =>
  (model?.subVersions ?? []).some((version) => version.status === "Ativa");

const getLatestTemplateSavedAt = (model) => {
  const timestamps = (model?.subVersions ?? [])
    .map((version) => getTimestamp(version?.savedAt))
    .filter((timestamp) => timestamp > 0);

  if (timestamps.length === 0) {
    return "";
  }

  return new Date(Math.max(...timestamps)).toISOString();
};

const getScheduledCount = (entries = [], referenceDate = new Date()) =>
  (Array.isArray(entries) ? entries : []).filter((entry) => {
    const scheduledAt = getTimestamp(entry?.scheduledAt ?? entry?.sendAt);
    return scheduledAt >= referenceDate.getTime();
  }).length;

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Dashboard");
  const navItems = HEADER_NAV_ITEMS;
  const { handleError } = useErrorHandler();
  const {
    templates: models,
    loading,
    error,
  } = useTemplateLibrary({
    onError: handleError,
  });
  const templateActivity = getUserTemplateActivity();
  const sendsThisMonth = templateActivity.sends.filter((entry) =>
    isSameMonth(entry?.sentAt),
  );
  const monthlySendCount = sendsThisMonth.length;
  const monthlyRecipientCount = sendsThisMonth.reduce(
    (total, entry) => total + (Number(entry?.recipientCount) || 0),
    0,
  );
  const activeModelsCount = models.filter(isModelActive).length;
  const updatedModelsThisMonth = models.filter((model) =>
    isSameMonth(getLatestTemplateSavedAt(model)),
  ).length;
  const scheduledCount = getScheduledCount(templateActivity.scheduled);
  const recentModels = [...models]
    .filter((model) => model.sendCount > 0 && model.lastUsedAt)
    .sort(
      (left, right) => getTimestamp(right.lastUsedAt) - getTimestamp(left.lastUsedAt),
    )
    .slice(0, 3);

  const stats = [
    {
      label: "Modelos Ativos",
      value: loading ? "" : formatNumber(activeModelsCount),
      sub: loading
        ? ""
        : activeModelsCount > 0
          ? `${formatNumber(updatedModelsThisMonth)} atualizados neste mês`
          : "Nenhum modelo ativo encontrado",
      icon: FileIcon,
      tone: "",
      loading,
    },
    {
      label: "Envios no Mês",
      value: formatNumber(monthlySendCount),
      sub:
        monthlySendCount > 0
          ? `${formatNumber(monthlyRecipientCount)} destinatários alcançados`
          : "Nenhum envio concluído neste mês",
      icon: MailBulkIcon,
      tone: "",
      loading: false,
    },
    {
      label: "Agendados",
      value: formatNumber(scheduledCount),
      sub:
        scheduledCount > 0
          ? `${formatNumber(scheduledCount)} aguardando disparo`
          : "Nenhum envio agendado",
      icon: CalendarIcon,
      tone: "green",
      loading: false,
    },
  ];

  const handleNavClick = (item) => {
    setActiveNav(item);
    navigate(getRoute(item));
  };

  const handleUseTemplate = (model) => {
    navigate("/enviar", {
      state: {
        selectedTemplateId: model.id,
        selectedTemplateVersion: model.lastUsedVersion || model.current,
      },
    });
  };

  return (
    <>
      <StyleDashboard />
      <div className="app">
        <Sidebar activeNav={activeNav} onNavClick={handleNavClick} />

        <div className="main">
          <HeaderNav
            activeNav={activeNav}
            onNavClick={handleNavClick}
            navItems={navItems}
          />

          <div className="content">
            <div className="page-header">
              <div>
                <h1>Dashboard</h1>
                <p className="page-date">{formatDashboardDate()}</p>
              </div>
              <button className="btn-primary" onClick={() => navigate("/enviar")}>
                <PlusIcon size={14} />
                Enviar E-mail
              </button>
            </div>

            <div className="stat-grid">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className={`stat-card ${stat.tone}`.trim()}
                  >
                    <div className="stat-icon">
                      <Icon size={20} />
                    </div>
                    <div className="stat-label">{stat.label}</div>
                    {stat.loading ? (
                      <LoadingSpinner label="Carregando..." size={20} stack />
                    ) : (
                      <>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-sub">{stat.sub}</div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="section-header">
              <h2>Modelos Recentes</h2>
              <button className="see-all" onClick={() => navigate("/modelosPage")}>
                Ver todos →
              </button>
            </div>
            <p className="section-sub">
              Modelos usados em envios concluídos mais recentemente
            </p>

            {error ? (
              <p className="section-sub">Erro ao carregar modelos: {error}</p>
            ) : loading ? (
              <LoadingSpinner
                label="Carregando modelos recentes..."
                minHeight={180}
                stack
              />
            ) : recentModels.length === 0 ? (
              <div className="model-grid">
                <div className="model-card green-top">
                  <div className="model-card-header">
                    <div className="model-icon-wrap">📄</div>
                    <div className="model-meta">
                      <div className="model-name">
                        Nenhum modelo usado recentemente
                      </div>
                      <div className="model-category">
                        Os modelos aparecerão aqui assim que um envio for
                        concluído.
                      </div>
                    </div>
                  </div>
                  <hr className="model-card-divider" />
                  <div className="model-info-row">
                    <span>
                      O histórico é atualizado automaticamente quando um envio
                      é realizado com sucesso.
                    </span>
                  </div>
                  <div className="model-card-actions">
                    <button
                      className="btn-use"
                      onClick={() => navigate("/enviar")}
                    >
                      Enviar e-mail
                    </button>
                    <button
                      className="btn-view"
                      onClick={() => navigate("/modelosPage")}
                    >
                      Ver modelos
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="model-grid">
                {recentModels.map((model, index) => (
                  <div
                    key={model.id}
                    className={`model-card ${
                      RECENT_MODEL_TOP_COLORS[index % RECENT_MODEL_TOP_COLORS.length]
                    }`}
                  >
                    <div className="model-card-header">
                      <div className="model-icon-wrap">{model.icon}</div>
                      <div className="model-meta">
                        <div className="model-name">
                          {model.name}
                          <span
                            className={`version-tag ${
                              RECENT_VERSION_TAGS[index % RECENT_VERSION_TAGS.length]
                            }`}
                          >
                            {model.lastUsedVersion || model.current || "Sem versão"}
                          </span>
                        </div>
                        <div className="model-category">{model.category}</div>
                      </div>
                    </div>
                    <hr className="model-card-divider" />
                    <div className="model-info-row">
                      <span>
                        Último envio: <strong>{formatDateTime(model.lastUsedAt)}</strong>
                      </span>
                      <span>
                        Última edição: <strong>{model.lastEdit || "—"}</strong>
                      </span>
                      <span>{model.sends || "1 envio realizado"}</span>
                    </div>
                    <div className="model-card-actions">
                      <button
                        className="btn-use"
                        onClick={() => handleUseTemplate(model)}
                      >
                        Usar modelo
                      </button>
                      <button
                        className="btn-view"
                        onClick={() => navigate("/modelosPage")}
                      >
                        Visualizar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

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
                  {scheduled.map((row, index) => (
                    <tr key={index}>
                      <td data-label="Modelo">
                        <div className="row-indicator">
                          <div className={`dot ${row.dot}`} />
                          <div>
                            <div className="row-name">{row.name}</div>
                            <div className="row-sub">{row.cat}</div>
                          </div>
                        </div>
                      </td>
                      <td className="cell-muted" data-label="Destinatarios">
                        {row.recipients}
                      </td>
                      <td className="cell-muted" data-label="Data/Hora">
                        {row.datetime}
                      </td>
                      <td data-label="Status">
                        <span className="badge-agendado">{row.status}</span>
                      </td>
                      <td className="cell-muted" data-label="Criado Por">
                        {row.createdBy}
                      </td>
                      <td data-label="Acoes">
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

          <Footer />
        </div>
      </div>
    </>
  );
}
