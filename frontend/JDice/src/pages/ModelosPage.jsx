import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import { getRoute } from "../hooks/navRoutes";
import { HEADER_NAV_ITEMS } from "../components/HeaderNav";
import Footer from "../components/Footer";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { StylesModelosPage } from "../css/StyleModelosPage";
import { useTemplateLibrary } from "../hooks/useTemplateLibrary";

// ── Icons ──
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

export default function ModelosPage() {
  const navigate = useNavigate();
  const navItems = HEADER_NAV_ITEMS;
  const [activeNav, setActiveNav] = useState("Modelos");
  const [activePage, setActivePage] = useState(1);
  const { handleError } = useErrorHandler();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState({});
  const {
    templates: models,
    loading,
    error,
  } = useTemplateLibrary({
    onError: handleError,
  });

  const handleNavClick = (item) => {
    setActiveNav(item);
    navigate(getRoute(item));
  };

  useEffect(() => {
    if (models.length === 0) {
      setExpanded({});
      return;
    }

    setExpanded((previousState) => {
      if (Object.keys(previousState).length > 0) {
        return previousState;
      }

      return {
        [models[0].id]: true,
      };
    });
  }, [models]);

  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const handleUseTemplate = (model, version = model.current) => {
    navigate("/enviar", {
      state: {
        selectedTemplateId: model.id,
        selectedTemplateVersion: version,
      },
    });
  };

  const filtered = models.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <>
      <StylesModelosPage />
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
                <button
                  className="btn-primary"
                  onClick={() => navigate("/criarTemplate")}
                >
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
            </div>

            {/* Table */}
            <div className="table-wrap">
              {loading && <p className="page-sub">Carregando modelos...</p>}
              {!loading && error && <p className="page-sub">Erro ao carregar modelos: {error}</p>}
              <table>
                <thead>
                  <tr>
                    <th>Modelo</th>
                    <th>Categoria</th>
                    <th>Versões</th>
                    <th>Versão Atual</th>
                    <th>Última Edição</th>
                    <th>Envios</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="cell-muted">
                        Nenhum modelo encontrado para a busca informada.
                      </td>
                    </tr>
                  )}
                  {filtered.map((m) => (
                    <Fragment key={m.id}>
                      {/* Main row */}
                      <tr>
                        <td data-label="Modelo">
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
                        <td className="cell-muted" data-label="Categoria">
                          <div>{m.category}</div>
                          {m.tags.length > 0 && (
                            <div className="model-file">{m.tags.join(", ")}</div>
                          )}
                        </td>
                        <td data-label="Versões">
                          <div className="version-tags">
                            {m.versions.map((v, i) => (
                              <span key={i} className={`vtag ${m.tagStyle[i]}`}>
                                {v}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td data-label="Versão Atual">
                          <span className="current-badge">{m.current}</span>
                        </td>
                        <td className="cell-muted" data-label="Última Edição">
                          {m.lastEdit}
                        </td>
                        <td className="cell-muted" data-label="Envios">
                          {m.sends}
                        </td>
                        <td data-label="Ações">
                          <div className="actions-cell">
                            <button
                              className="act-link green"
                              onClick={() => handleUseTemplate(m)}
                            >
                              Usar
                            </button>
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
                            <td data-label="Versão">
                              <div className="model-cell sub-model-cell">
                                <div className="model-thumb sub">{sv.icon}</div>
                                <div>
                                  <div className="model-name-text sub-model-title">{sv.ver}</div>
                                  <div className="sub-desc">{sv.desc}</div>
                                </div>
                              </div>
                            </td>
                            <td colSpan={3} className="cell-muted" data-label="Detalhes">
                              <div className="sub-date">{sv.date}</div>
                            </td>
                            <td colSpan={2} data-label="Status">
                              <span
                                className={`status-badge ${sv.status.toLowerCase()}`}
                              >
                                {sv.status}
                              </span>
                            </td>
                            <td data-label="Ações">
                              <div className="actions-cell">
                                {sv.status === "Ativa" && (
                                  <button
                                    className="act-link green"
                                    onClick={() => handleUseTemplate(m, sv.ver)}
                                  >
                                    Usar
                                  </button>
                                )}
                                <button className="act-link grey">Ver</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>

              {/* Table footer */}
              <div className="table-footer">
                <span>Exibindo {filtered.length} de {models.length} modelos</span>
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
          <Footer />
        </div>
      </div>
    </>
  );
}
