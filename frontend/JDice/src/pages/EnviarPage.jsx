import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import { getRoute } from "../hooks/navRoutes";
import { HEADER_NAV_ITEMS } from "../components/HeaderNav";
import Footer from "../components/Footer";
import { StylesEnviarPages } from "../css/StyleEnviarPages";
import { api } from "../../services/api";
import { recordTemplateSend } from "../../services/templateActivity";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { Stepper } from "../components/Stepper";
import LoadingSpinner from "../components/LoadingSpinner";
import DestinatariosPage from "./DestinatariosPage";
import { useTemplateLibrary } from "../hooks/useTemplateLibrary";

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
    assunto: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNav, setActiveNav] = useState("Envios"); 
  const destinatariosRef = useRef(null);
  const routeSelectionApplied = useRef(false);

  const [selectedModel, setSelectedModel] = useState(""); 
  const [assunto, setAssunto] = useState("");
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
  const [submitFeedback, setSubmitFeedback] = useState({
    type: "",
    title: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const navItems = HEADER_NAV_ITEMS;
  const { handleError } = useErrorHandler();
  const {
    templates: models,
    loading,
    error: templatesError,
  } = useTemplateLibrary({
    onError: handleError,
  });
  const currentModel = models.find((m) => m.id === selectedModel) || null;

  const handleNavClick = (item) => {
    setActiveNav(item);
    navigate(getRoute(item));
  };

  const resetLoadedTemplate = useCallback(() => {
    setTemplateData({ content: "", parameters: [] });
    setTemplateVariables({});
    setTemplateLoading(false);
    setTemplateError("");
  }, []);

  const handleModelChange = (e) => {
    const selectedId = e.target.value;
    setSelectedModel(selectedId);
    setVersao("");
    setVersions([]);
    setErrors((prev) => ({ ...prev, selectedModel: "", versao: "" }));
    resetLoadedTemplate();
  };

  useEffect(() => {
    if (routeSelectionApplied.current || models.length === 0) {
      return;
    }

    const routeTemplateId = location.state?.selectedTemplateId;

    if (!routeTemplateId) {
      routeSelectionApplied.current = true;
      return;
    }

    const foundTemplate = models.find((model) => model.id === routeTemplateId);
    routeSelectionApplied.current = true;

    if (!foundTemplate) {
      return;
    }

    setSelectedModel(foundTemplate.id);
    setErrors((prev) => ({ ...prev, selectedModel: "", versao: "" }));
    resetLoadedTemplate();
  }, [location.state, models, resetLoadedTemplate]);

  useEffect(() => {
    if (!selectedModel) {
      setVersions([]);
      return;
    }

    const foundTemplate = models.find((model) => model.id === selectedModel);
    const availableVersions = foundTemplate?.subVersions || [];
    const preferredVersion = location.state?.selectedTemplateVersion;

    setVersions(availableVersions);

    if (availableVersions.length === 0) {
      if (versao) {
        setVersao("");
      }
      return;
    }

    const versionExists = availableVersions.some((version) => version.ver === versao);

    if (versionExists) {
      return;
    }

    const nextVersion =
      availableVersions.find((version) => version.ver === preferredVersion)?.ver ||
      availableVersions[0].ver;

    setVersao(nextVersion);
    setTemplateLoading(true);
    setTemplateError("");
  }, [location.state, models, selectedModel, versao]);

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
            assunto: prev.assunto || "",
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

  const templateVariablesText = templateError
      ? templateError
      : currentModel && versao
        ? templateParameters.length > 0
          ? `${templateParameters.length} variáveis identificadas: ${templateParameters
              .map(formatVariableToken)
              .join(", ")}`
          : "Nenhuma variável identificada neste modelo."
        : "Selecione um modelo e uma versão para carregar as variáveis.";

  const validateForm = () => {
    const nextErrors = {
      selectedModel: "",
      versao: "",
      assunto: "",
    };

    if (!selectedModel) {
      nextErrors.selectedModel = "Selecione um modelo.";
    }

    if (!versao) {
      nextErrors.versao = "Selecione uma versão.";
    }

    if (!assunto.trim()) {
      nextErrors.assunto = "Informe o assunto do e-mail.";
    }

    templateParameters.forEach((parameter) => {
      if (!templateVariables[parameter]?.trim()) {
        nextErrors[parameter] = "Preencha esta variável.";
      }
    });

    setErrors(nextErrors);

    return Object.values(nextErrors).every((value) => !value);
  };

  const enviarEmail = async () => {
    setSubmitFeedback({ type: "", title: "", message: "" });

    const parentFormIsValid = validateForm();
    const destinatariosFormIsValid =
      destinatariosRef.current?.validate?.() ?? false;

    if (!parentFormIsValid || !destinatariosFormIsValid) {
      setSubmitFeedback({
        type: "error",
        title: "",
        message: "Revise os campos obrigatórios antes de confirmar o envio.",
      });
      return;
    }

    const dadosDestinatarios = destinatariosRef.current.getFormData();

    if (dadosDestinatarios.schedMode === "sched") {
      setSubmitFeedback({
        type: "error",
        title: "",
        message:
          "O backend disponível nesta tela suporta apenas envio imediato no momento.",
      });
      return;
    }

    const toEmails = dadosDestinatarios.toChips
      .map((chip) => chip.label?.trim())
      .filter(Boolean);
    const ccEmails = dadosDestinatarios.ccChips
      .map((chip) => chip.label?.trim())
      .filter(Boolean);

    const payload = new URLSearchParams();
    payload.append("name", currentModel.name);
    payload.append("version", versao);
    payload.append("subject", assunto.trim());
    payload.append("sendTo", toEmails.join(","));
    ccEmails.forEach((email) => payload.append("sendCcTo", email));
    payload.append("templateParams", JSON.stringify(templateVariables));

    try {
      setIsSending(true);
      const response = await api.post("/api/mail/sendNow", payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setSubmitFeedback({
        type: "success",
        title: "Envio concluído",
        message: response.data || "O e-mail foi enviado com sucesso.",
      });
      recordTemplateSend({
        name: currentModel.name,
        version: versao,
        category: currentModel.category,
        recipientCount: toEmails.length + ccEmails.length,
        subject: assunto.trim(),
      });

      const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await esperar(2000);
      setSubmitFeedback({
        type: "success",
        title: "Redirecionando",
        message: "Você será levado para a página de dashboard.",
      });
      await esperar(2000);
      navigate("/dashboard");

    } catch (err) {
      const message =
        err.response?.data ||
        err.message ||
        "Não foi possível enviar o e-mail.";

      setSubmitFeedback({
        type: "error",
        title: "",
        message,
      });

      if (!err.response) {
        handleError(err);
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <style>{<StylesEnviarPages />}</style>
      {submitFeedback.type === "success" && (
        <div className="feedback-modal-overlay">
          <div className="feedback-modal" role="alertdialog" aria-live="assertive">
            <div className="feedback-modal-icon">✓</div>
            <h2>{submitFeedback.title}</h2>
            <p>{submitFeedback.message}</p>
          </div>
        </div>
      )}
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

                  
                  <div className="field">
                    <label>Assunto do e-mail:</label>
                    <input
                      className="std-input"
                      placeholder="Digite o assunto do e-mail"
                      value={assunto}
                      onChange={(e) => {
                        setAssunto(e.target.value);
                        if (errors.assunto) {
                          setErrors((prev) => ({
                            ...prev,
                            assunto: "",
                          }));
                        }
                      }}
                    />
                    {errors.assunto && (
                      <span className="field-error">{errors.assunto}</span>
                    )}
                  </div>

                  {/* Select Modelo */}
                  <div className="field">
                    <label>Modelo</label>
                    <div className="select-wrap">
                      <select
                        value={selectedModel}
                        id="templateName"
                        onChange={handleModelChange}
                        disabled={loading}
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
                    {templatesError && (
                      <span className="field-error">{templatesError}</span>
                    )}
                    {loading && (
                      <LoadingSpinner
                        label="Carregando modelos..."
                        size={16}
                        inline
                      />
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
                              ...prev,
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
                          ? `Categoria: ${currentModel.category || "Sem categoria"}`
                          : "Selecione um modelo para ver os detalhes"}
                      </div>
                      {currentModel && (
                        <div className="m-meta">
                          Arquivos: {currentModel.file || "—"}
                          {currentModel.tags.length > 0
                            ? ` • Tags: ${currentModel.tags.join(", ")}`
                            : ""}
                        </div>
                      )}
                      <div className="m-vars">
                        {templateLoading ? (
                          <LoadingSpinner
                            label="Carregando variáveis do modelo..."
                            size={14}
                            inline
                          />
                        ) : (
                          templateVariablesText
                        )}
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

                  {templateLoading ? (
                    <LoadingSpinner
                      label="Carregando variáveis do template..."
                      minHeight={120}
                      stack
                    />
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
                  ref={destinatariosRef}
                  templateName={currentModel?.name || ""}
                  templateVersion={versao}
                  templateCategory={currentModel?.category || ""}
                  templateTags={currentModel?.tags || []}
                  templateVariables={templateVariables}
                  onSectionStatusChange={handleSectionStatusChange}
                />

                {/* Navigation */}
                {submitFeedback.type === "error" && submitFeedback.message && (
                  <div className={`send-feedback ${submitFeedback.type}`}>
                    {submitFeedback.message}
                  </div>
                )}
                <div className="form-nav">
                  <button className="btn-back">
                    <ChevLeft s={13} /> Voltar
                  </button>
                  {/* Botão com handleNext */}
                  <button
                    className="btn-confirm"
                    onClick={enviarEmail}
                    disabled={isSending}
                  >
                    {isSending ? (
                      <LoadingSpinner
                        label="Enviando..."
                        size={16}
                        inline
                        light
                      />
                    ) : (
                      "✈ Confirmar Envio"
                    )}
                  </button>
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
