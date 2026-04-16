import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import { getRoute } from "../hooks/navRoutes";
import { HEADER_NAV_ITEMS } from "../components/HeaderNav";
import Footer from "../components/Footer";
import { StylesEnviarPages } from "../css/StyleEnviarPages";
import { api } from "../../services/api";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { Stepper } from "../components/Stepper";

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

const normalizeTemplates = (root) => {
  return (root.children || []).map((template) => {
    const versions = (template.children || []).filter((item) => item.directory);
    const versionLabels = versions.map((v) => v.name);

    return {
      id: template.path,
      name: template.name,
      file: versionLabels.join(", "),
      subVersions: versions.map((version) => ({
        ver: version.name,
      })),
    };
  });
};

export default function EnviarPage() {
  const [errors, setErrors] = useState({
    selectedModel: "",
    versao: "",
    nomeContato: "",
    produto: "",
  });
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Envios"); // ✅ começa no passo 1

  const [selectedModel, setSelectedModel] = useState(""); // ✅ ID do modelo selecionado
  const [versions, setVersions] = useState([]); // ✅ versões do modelo atual
  const [versao, setVersao] = useState(""); // ✅ versão selecionada

  // Variáveis do template
  const [nomeContato, setNomeContato] = useState(""); // ✅ separado do estado do modelo
  const [regiao, setRegiao] = useState("Sul");
  const [produto, setProduto] = useState("");

  const navItems = HEADER_NAV_ITEMS;
  const [models, setModels] = useState([]);
  const { handleError } = useErrorHandler();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  const handleNavClick = (item) => {
    setActiveNav(item);
    navigate(getRoute(item));
  };

  // ✅ Ao trocar modelo, atualiza as versões disponíveis
  const handleModelChange = (e) => {
    const selectedId = e.target.value;
    setSelectedModel(selectedId);
    setVersao("");

    if (!selectedId) {
      setVersions([]);
      return;
    }

    const found = models.find((m) => m.id === selectedId);
    const subs = found?.subVersions || [];
    setVersions(subs);
    if (subs.length > 0) setVersao(subs[0].ver);
  };

  useEffect(() => {
    api
      .get("/api/templates/list")
      .then((resp) => {
        setModels(normalizeTemplates(resp.data));
      })
      .catch((err) => {
        handleError(err);
        setModels([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ✅ Modelo atualmente selecionado (objeto completo)
  const currentModel = models.find((m) => m.id === selectedModel) || null;

  const handleNext = () => {
    const newErrors = {
      selectedModel: !selectedModel ? "Selecione um modelo" : "",
      versao: !versao ? "Selecione uma versão" : "",
      nomeContato: !nomeContato.trim()
        ? "Nome do contato não pode estar vazio"
        : "",
      produto: !produto.trim() ? "Produto não pode estar vazio" : "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e !== "");
    if (!hasError) {
      navigate("/destinatarios");
    }
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

          <div className="content">
            {/* Page Header */}
            <div className="page-header">
              <h1>Enviar E-mail</h1>
              <p className="page-sub">
                Compose e agende sua campanha em 4 passos simples
              </p>
            </div>

            {/* Stepper */}
            <Stepper numeroPasso={1}/>

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

                  {/* Select Modelo */}
                  <div className="field">
                    <label>Modelo</label>
                    <div className="select-wrap">
                      <select
                        value={selectedModel}
                        id="templateName"
                        onChange={handleModelChange}
                      >
                        <option value="" disabled>
                          Selecione um modelo...
                        </option>
                        {models.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                      <span className="select-arrow">
                        <ChevDown s={13} />
                      </span>
                    </div>
                    {errors.selectedModel && (
                      <span className="field-error">
                        {errors.selectedModel}
                      </span>
                    )}
                  </div>

                  {/* Select Versão */}
                  <div className="field">
                    <label>Versão do Modelo</label>
                    <div className="version-row">
                      <div className="select-wrap">
                        <select
                          value={versao}
                          onChange={(e) => setVersao(e.target.value)}
                          disabled={!selectedModel || versions.length === 0}
                        >
                          {versions.length === 0 ? (
                            <option value="">
                              {selectedModel
                                ? "Nenhuma versão disponível"
                                : "Selecione um modelo primeiro"}
                            </option>
                          ) : (
                            versions.map((v) => (
                              <option key={v.ver} value={v.ver}>
                                {v.ver}
                              </option>
                            ))
                          )}
                        </select>
                        <span className="select-arrow">
                          <ChevDown s={13} />
                        </span>
                      </div>
                      <button className="version-link">
                        Ver histórico de versões →
                      </button>
                    </div>
                    {errors.versao && (
                      <span className="field-error">{errors.versao}</span>
                    )}
                  </div>

                  {/* ✅ Model preview card dinâmico */}
                  <div className="model-preview-card">
                    <div className="model-thumb">🌾</div>
                    <div className="model-info">
                      <div className="m-name">
                        {currentModel
                          ? `${currentModel.name}${versao ? ` — ${versao}` : ""}`
                          : "Nenhum modelo selecionado"}
                      </div>
                      <div className="m-meta">
                        {currentModel
                          ? `Arquivos: ${currentModel.file || "—"}`
                          : "Selecione um modelo para ver os detalhes"}
                      </div>
                      <div className="m-vars">
                        3 variáveis identificadas: {"{nome_contato}"},{" "}
                        {"{regiao}"}, {"{produto}"}
                      </div>
                    </div>
                    <button className="btn-preview" disabled={!currentModel}>
                      Pré-visualizar →
                    </button>
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
                        value={nomeContato}
                        onChange={(e) => {
                          setNomeContato(e.target.value);
                          if (errors.nomeContato)
                            setErrors((prev) => ({ ...prev, nomeContato: "" })); // limpa erro ao digitar
                        }}
                      />
                      {errors.nomeContato && (
                        <span className="field-error">
                          {errors.nomeContato}
                        </span>
                      )}
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

                  {/* Input produto */}
                  <div className="field" style={{ marginTop: 4 }}>
                    <label>{"{produto}"}</label>
                    <input
                      type="text"
                      value={produto}
                      onChange={(e) => {
                        setProduto(e.target.value);
                        if (errors.produto)
                          setErrors((prev) => ({ ...prev, produto: "" })); // limpa erro ao digitar
                      }}
                    />
                    {errors.produto && (
                      <span className="field-error">{errors.field}</span>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="form-nav">
                  <button className="btn-back">
                    <ChevLeft s={13} /> Voltar
                  </button>
                  {/* Botão com handleNext */}
                  <button className="btn-next" onClick={handleNext}>
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
                    <div className="mock-window-bar">
                      <div className="mock-dot red" />
                      <div className="mock-dot yellow" />
                      <div className="mock-dot green" />
                    </div>

                    <div className="mock-email">
                      <div className="mock-top-bar">
                        <div className="mock-logo-badge">JD</div>
                        <div className="mock-top-text">
                          <div className="t1">John Deere</div>
                          <div className="t2">
                            {/* ✅ dinâmico com fallback */}
                            {currentModel
                              ? `${currentModel.name}${versao ? ` — ${versao}` : ""}`
                              : "Campanha Safrinha 2025"}
                          </div>
                        </div>
                      </div>

                      <div className="mock-hero">
                        <div className="mock-hero-emoji">🌾</div>
                        <div className="mock-hero-title">
                          A colheita perfeita começa
                          <br />
                          com o equipamento certo.
                        </div>
                      </div>

                      <div className="mock-body">
                        <div className="mock-greeting">
                          Olá, {/* ✅ usa nomeContato agora */}
                          {nomeContato ? (
                            <strong>{nomeContato}</strong>
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

          <Footer />
        </div>
      </div>
    </>
  );
}
