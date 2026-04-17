import { useCallback, useEffect, useState } from "react";
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
import DestinatariosPage from "./DestinatariosPage";

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

const formatVariableToken = (variable) => `{${variable}}`;

const formatVariableName = (variable) =>
  variable.replace(/[_-]+/g, " ").trim();

const buildVariableState = (parameters, currentValues = {}) =>
  parameters.reduce((acc, parameter) => {
    acc[parameter] = currentValues[parameter] ?? "";
    return acc;
  }, {});

export default function EnviarPage() {
  const [errors, setErrors] = useState({
    selectedModel: "",
    versao: "",
  });
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Envios"); 

  const [selectedModel, setSelectedModel] = useState(""); 
  const [versions, setVersions] = useState([]); 
  const [versao, setVersao] = useState(""); 

  const [templateData, setTemplateData] = useState({
    content: "",
    parameters: [],
  });
  const [templateVariables, setTemplateVariables] = useState({});
  const [templateLoading, setTemplateLoading] = useState(false);
  const [templateError, setTemplateError] = useState("");
  const [sectionStatus, setSectionStatus] = useState({
    section3Complete: false,
    section4Complete: false,
  });

  const navItems = HEADER_NAV_ITEMS;
  const [models, setModels] = useState([]);
  const { handleError } = useErrorHandler();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const currentModel = models.find((m) => m.id === selectedModel) || null;

  const handleNavClick = (item) => {
    setActiveNav(item);
    navigate(getRoute(item));
  };

  const handleModelChange = (e) => {
    const selectedId = e.target.value;
    setSelectedModel(selectedId);
    setVersao("");
    setErrors({ selectedModel: "", versao: "" });
    setTemplateData({ content: "", parameters: [] });
    setTemplateVariables({});
    setTemplateLoading(false);
    setTemplateError("");

    if (!selectedId) {
      setVersions([]);
      return;
    }

    const found = models.find((m) => m.id === selectedId);
    const subs = found?.subVersions || [];
    setVersions(subs);
    if (subs.length > 0) {
      setTemplateLoading(true);
      setVersao(subs[0].ver);
    }
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
  }, [handleError]);

  useEffect(() => {
    if (!currentModel || !versao) {
      return;
    }

    let isMounted = true;

    api
      .get("/api/templates/template", {
        params: {
          name: currentModel.name,
          version: versao,
        },
      })
      .then((resp) => {
        if (!isMounted) return;

        const parameters = Array.isArray(resp.data?.parameters)
          ? resp.data.parameters
          : [];

        setTemplateData({
          content: resp.data?.content || "",
          parameters,
        });
        setTemplateVariables((prev) => buildVariableState(parameters, prev));
        setErrors((prev) => {
          const nextErrors = {
            selectedModel: prev.selectedModel || "",
            versao: prev.versao || "",
          };

          parameters.forEach((parameter) => {
            nextErrors[parameter] = prev[parameter] || "";
          });

          return nextErrors;
        });
      })
      .catch((err) => {
        if (!isMounted) return;

        setTemplateData({ content: "", parameters: [] });
        setTemplateVariables({});

        if (err.response?.status === 404) {
          setTemplateError(
            "Não foi possível encontrar o template da versão selecionada.",
          );
          return;
        }

        setTemplateError("Não foi possível carregar as variáveis do template.");

        if (!err.response || err.response.status >= 500) {
          handleError(err);
          return;
        }

        console.error("Erro ao carregar template:", err);
      })
      .finally(() => {
        if (isMounted) {
          setTemplateLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentModel, versao, handleError]);

  const handleVariableChange = (parameter, value) => {
    setTemplateVariables((prev) => ({
      ...prev,
      [parameter]: value,
    }));

    if (errors[parameter]) {
      setErrors((prev) => ({
        ...prev,
        [parameter]: "",
      }));
    }
  };

  const templateParameters = templateData.parameters;
  const section1Complete = Boolean(selectedModel && versao);
  const section2Filled =
    section1Complete &&
    !templateLoading &&
    !templateError &&
    templateParameters.every((parameter) =>
      Boolean(templateVariables[parameter]?.trim()),
    );
  const step1Done = section1Complete;
  const step2Done = step1Done && section2Filled;
  const step3Done = step2Done && sectionStatus.section3Complete;
  const step4Done = step3Done && sectionStatus.section4Complete;
  const completedSteps = [
    ...(step1Done ? [1] : []),
    ...(step2Done ? [2] : []),
    ...(step3Done ? [3] : []),
    ...(step4Done ? [4] : []),
  ];

  const handleSectionStatusChange = useCallback(
    ({ section3Complete, section4Complete }) => {
      setSectionStatus({
        section3Complete,
        section4Complete,
      });
    },
    [],
  );

  const templateVariablesText = templateLoading
    ? "Carregando variáveis do modelo..."
    : templateError
      ? templateError
      : currentModel && versao
        ? templateParameters.length > 0
          ? `${templateParameters.length} variáveis identificadas: ${templateParameters
              .map(formatVariableToken)
              .join(", ")}`
          : "Nenhuma variável identificada neste modelo."
        : "Selecione um modelo e uma versão para carregar as variáveis.";

  const handleNext = () => {
    if (templateLoading) return;

    const variableErrors = templateParameters.reduce((acc, parameter) => {
      if (!templateVariables[parameter]?.trim()) {
        acc[parameter] = `${formatVariableName(parameter)} não pode estar vazio`;
      }

      return acc;
    }, {});

    const newErrors = {
      selectedModel: !selectedModel ? "Selecione um modelo" : "",
      versao: !versao ? "Selecione uma versão" : "",
      ...variableErrors,
    };

    if (templateError) {
      newErrors.versao = templateError;
    }

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e !== "");
    if (!hasError) {
      // Rodar a rotina para envio e e-mail AQUI (eu acho)
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
            <Stepper numeroPasso={1} completedSteps={completedSteps} />

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
                          onChange={(e) => {
                            setVersao(e.target.value);
                            setErrors((prev) => ({
                              selectedModel: prev.selectedModel || "",
                              versao: "",
                            }));
                            setTemplateData({ content: "", parameters: [] });
                            setTemplateVariables({});
                            setTemplateLoading(true);
                            setTemplateError("");
                          }}
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
                      <div className="m-vars">{templateVariablesText}</div>
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

                  {templateLoading ? (
                    <p className="section-sub">Carregando variáveis do template...</p>
                  ) : templateError ? (
                    <span className="field-error">{templateError}</span>
                  ) : !currentModel || !versao ? (
                    <p className="section-sub">
                      Selecione um modelo e uma versão para carregar os campos.
                    </p>
                  ) : templateParameters.length === 0 ? (
                    <p className="section-sub">
                      O modelo selecionado não possui variáveis para preencher.
                    </p>
                  ) : (
                    <div className="vars-grid">
                      {templateParameters.map((parameter) => (
                        <div className="field" key={parameter}>
                          <label>{formatVariableToken(parameter)}</label>
                          <input
                            type="text"
                            placeholder={`Informe ${formatVariableName(parameter)}`}
                            value={templateVariables[parameter] || ""}
                            onChange={(e) =>
                              handleVariableChange(parameter, e.target.value)
                            }
                          />
                          {errors[parameter] && (
                            <span className="field-error">
                              {errors[parameter]}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <DestinatariosPage
                  templateName={currentModel?.name || ""}
                  templateVersion={versao}
                  templateVariables={templateVariables}
                  onSectionStatusChange={handleSectionStatusChange}
                />

                {/* Navigation */}
                <div className="form-nav">
                  <button className="btn-back">
                    <ChevLeft s={13} /> Voltar
                  </button>
                  {/* Botão com handleNext */}
                  <button className="btn-confirm" onClick={handleNext}>✈ Confirmar Envio</button>
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
