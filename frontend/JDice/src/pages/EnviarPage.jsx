import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import { getRoute } from "../hooks/navRoutes";
import { HEADER_NAV_ITEMS } from "../components/HeaderNav";
import Footer from "../components/Footer";
import { StylesEnviarPages } from "../css/StyleEnviarPages";

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
      <style>{<StylesEnviarPages />}</style>
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
