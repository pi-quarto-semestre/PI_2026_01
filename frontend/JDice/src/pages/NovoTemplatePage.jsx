import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import { getRoute } from "../hooks/navRoutes";
import { HEADER_NAV_ITEMS } from "../components/HeaderNav";
import { api } from "../../services/api";
import Footer from "../components/Footer";
import { StylesNovoTemplatePage } from "../css/StyleNovoTemplatePage";
import { saveUserTemplateMetadata } from "../hooks/useTemplateLibrary";

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const SaveIcon = ({ s = 15 }) => (
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
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);
const EyeIcon = ({ s = 14 }) => (
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
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const TrashIcon = ({ s = 14 }) => (
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
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);
const TagIcon = ({ s = 14 }) => (
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
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const FileIcon = ({ s = 14 }) => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);
const TypeIcon = ({ s = 14 }) => (
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
    <polyline points="4 7 4 4 20 4 20 7" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
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

const VARIABLES = [
  "[[${nome_contato}]]",
  "[[${regiao}]]",
  "[[${produto}]]",
  "[[${data}]]",
  "[[${empresa}]]",
  "[[${hora}]]",
];

function getVersionStyle(v) {
  if (!v) return "green";
  const n = parseFloat(v);
  if (n >= 3) return "blue";
  if (n >= 2) return "yellow";
  return "green";
}

function countWords(html) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text ? text.split(" ").length : 0;
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function NovoTemplatePage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Modelos");
  const navItems = HEADER_NAV_ITEMS;
  const [nome, setNome] = useState("");
  const [versao, setVersao] = useState("1.0");
  const [categoria, setCategoria] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleNavClick = (item) => {
    setActiveNav(item);
    navigate(getRoute(item));
  };

  const quillRef = useRef(null);
  const quillInst = useRef(null);
  const tagInputRef = useRef(null);

  function initQuill() {
    if (!quillRef.current || quillInst.current) return;
    const q = new window.Quill(quillRef.current, {
      theme: "snow",
      placeholder:
        "Escreva o corpo do e-mail aqui...\n\nUse as variáveis dinâmicas disponíveis abaixo para personalizar o conteúdo por destinatário.",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "blockquote", "code-block"],
          ["clean"],
        ],
      },
    });
    quillInst.current = q;
    q.on("text-change", () => {
      const html = q.root.innerHTML;
      setBodyHtml(html);
      setWordCount(countWords(html));
    });
  }

  /* Load Quill from CDN */
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.min.js";
    script.onload = () => initQuill();
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  /* Insert variable at cursor */
  function insertVariable(varStr) {
    const q = quillInst.current;
    if (!q) return;
    const range = q.getSelection(true);
    q.insertText(range ? range.index : q.getLength(), varStr);
  }

  /* Tag handling */
  function handleTagKey(e) {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const val = tagInput.trim().replace(/,/g, "");
      if (val && !tags.includes(val)) setTags((t) => [...t, val]);
      setTagInput("");
    }
    if (e.key === "Backspace" && !tagInput && tags.length) {
      setTags((t) => t.slice(0, -1));
    }
  }

  /* Validation & save */
  function validate() {
    const e = {};
    if (!nome.trim()) e.nome = "Nome do template é obrigatório.";
    if (!versao.trim()) e.versao = "Versão é obrigatória.";
    if (!categoria) e.categoria = "Selecione uma categoria.";
    const textLen = bodyHtml.replace(/<[^>]*>/g, "").trim().length;
    if (textLen < 10) e.body = "O corpo do e-mail não pode estar vazio.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function criarTemplate() {
    // 1. Captura o HTML do editor Quill
    const texto = quillInst.current?.root?.innerHTML || "";

    // 2. Adiciona a estrutura básica HTML ao texto
    const conteudoHTML = `
          <!DOCTYPE html>
          <html xmlns:th="http://www.thymeleaf.org">
          <body>
              ${texto}
          </body>
          </html>
      `;

    // 3. Cria um objeto Blob com o conteúdo HTML
    const blob = new Blob([conteudoHTML], { type: "text/html" });
    const formData = new FormData();
    formData.append("file", blob, "template.html");
    formData.append("name", nome);
    formData.append("version", versao);

    const response = await api.post("/api/templates/upload", formData);
    console.log("Sucesso", response.data);
    return response;
  }

  async function handleSave() {
    if (!validate()) return;
    try {
      await criarTemplate();
      saveUserTemplateMetadata({
        name: nome,
        version: versao,
        category: categoria,
        tags,
      });
      setToast(true);
      setTimeout(() => {
        setToast(false);
        navigate("/modelosPage");
      }, 3200);
    } catch (error) {
      console.error("Erro ao salvar template:", error);
    }
  }

  const verStyle = getVersionStyle(versao);

  return (
    <>
      <style>{<StylesNovoTemplatePage />}</style>

      {/* Toast */}
      <div className={`toast ${toast ? "show" : ""}`}>
        <span className="toast-icon">✅</span>
        Template <strong>"{nome}"</strong> salvo com sucesso!
      </div>
      

      <div className="app">
        {/* SIDEBAR */}
        <Sidebar activeNav={activeNav} onNavClick={handleNavClick} />

        <div className="main">
          {/* TOPBAR */}
          <HeaderNav
            activeNav={activeNav}
            onNavClick={handleNavClick}
            navItems={navItems}
          />

          {/* CONTENT */}
          <div className="content">
            {/* Page Header */}
            <div className="page-header">
              <div className="page-header-left">
                <div className="breadcrumb">
                  <span>Modelos</span>
                  <span className="sep">/</span>
                  <span className="current">Novo Template</span>
                </div>
                <h1>Criar Template de E-mail</h1>
              </div>
            </div>

            <div className="body-layout">
              {/* ── FORM COLUMN ── */}
              <div className="form-column">
                {/* Card 1 — Identificação */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-header-icon">
                      <FileIcon s={15} />
                    </div>
                    <div>
                      <h2>Identificação</h2>
                      <p>Nome, versão e categorização do template</p>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="fields-row">
                      {/* Nome */}
                      <div className="field full">
                        <label>
                          Nome do Template <span className="required">*</span>
                        </label>
                        <input
                          id="campoNome"
                          type="text"
                          placeholder="Ex.: Campanha Safrinha 2025"
                          value={nome}
                          maxLength={80}
                          className={errors.nome ? "error" : ""}
                          onChange={(e) => {
                            setNome(e.target.value);
                            setErrors((p) => ({ ...p, nome: "" }));
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          {errors.nome ? (
                            <span className="field-error">⚠ {errors.nome}</span>
                          ) : (
                            <span className="field-hint">
                              Escolha um nome descritivo e único para facilitar
                              a busca.
                            </span>
                          )}
                          <span
                            className={`char-count ${nome.length > 60 ? "warn" : "ok"}`}
                          >
                            {nome.length}/80
                          </span>
                        </div>
                      </div>

                      {/* Versão */}
                      <div className="field">
                        <label>
                          Versão <span className="required">*</span>
                        </label>
                        <input
                          id="campoVersao"
                          type="text"
                          placeholder="1.0"
                          value={versao}
                          className={errors.versao ? "error" : ""}
                          onChange={(e) => {
                            setVersao(e.target.value);
                            setErrors((p) => ({ ...p, versao: "" }));
                          }}
                        />
                        {errors.versao ? (
                          <span className="field-error">⚠ {errors.versao}</span>
                        ) : (
                          versao && (
                            <span className={`version-preview ${verStyle}`}>
                              v{versao}
                            </span>
                          )
                        )}
                      </div>

                      {/* Categoria */}
                      <div className="field">
                        <label>
                          Categoria <span className="required">*</span>
                        </label>
                        <div className="select-wrap">
                          <select
                            value={categoria}
                            className={errors.categoria ? "error" : ""}
                            onChange={(e) => {
                              setCategoria(e.target.value);
                              setErrors((p) => ({ ...p, categoria: "" }));
                            }}
                          >
                            <option value="">Selecione...</option>
                            <option>Marketing Agrícola</option>
                            <option>Produtos e Lançamentos</option>
                            <option>Comunicados Internos</option>
                            <option>Canal de Vendas</option>
                            <option>Eventos</option>
                            <option>Pós-venda</option>
                          </select>
                          <span className="select-arrow">
                            <ChevDown s={13} />
                          </span>
                        </div>
                        {errors.categoria && (
                          <span className="field-error">
                            ⚠ {errors.categoria}
                          </span>
                        )}
                      </div>

                      {/* Tags */}
                      <div className="field full">
                        <label>
                          <TagIcon s={12} /> Tags
                        </label>
                        <div
                          className="tag-input-wrap"
                          onClick={() => tagInputRef.current?.focus()}
                        >
                          {tags.map((t) => (
                            <span key={t} className="tag">
                              {t}
                              <button
                                onClick={() =>
                                  setTags((ts) => ts.filter((x) => x !== t))
                                }
                              >
                                ×
                              </button>
                            </span>
                          ))}
                          <input
                            ref={tagInputRef}
                            className="tag-input"
                            placeholder={
                              tags.length === 0
                                ? "Digite e pressione Enter para adicionar tags…"
                                : ""
                            }
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKey}
                          />
                        </div>
                        <span className="field-hint">
                          Tags ajudam na organização e busca dos templates.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 — Corpo do E-mail */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-header-icon">
                      <TypeIcon s={15} />
                    </div>
                    <div>
                      <h2>Corpo do E-mail</h2>
                      <p>
                        Use o editor abaixo para compor o conteúdo do template
                      </p>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="field">
                      <label>
                        Conteúdo <span className="required">*</span>
                      </label>
                      <div
                        className={`quill-wrapper ${errors.body ? "error" : ""}`}
                      >
                        <div ref={quillRef} />
                        <div className="editor-footer">
                          <span className="word-count">
                            {wordCount}{" "}
                            {wordCount === 1 ? "palavra" : "palavras"}
                          </span>
                          <div className="variable-chips">
                            {VARIABLES.map((v) => (
                              <button
                                key={v}
                                className="var-chip"
                                title={`Inserir ${v}`}
                                onClick={() => insertVariable(v)}
                              >
                                + {v}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      {errors.body && (
                        <span className="field-error">⚠ {errors.body}</span>
                      )}
                      <span className="field-hint">
                        Clique nas variáveis acima para inseri-las no cursor.
                        Elas serão substituídas por dados reais no envio.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                  <div className="actions-left">
                    <button className="btn-ghost">
                      <TrashIcon s={14} /> Descartar
                    </button>
                  </div>
                  <div className="actions-right">
                    <button className="btn-outline">
                      <EyeIcon s={14} /> Pré-visualizar
                    </button>
                    <button className="btn-primary" onClick={handleSave}>
                      <SaveIcon s={15} /> Salvar Template
                    </button>
                  </div>
                </div>
              </div>

              {/* ── PREVIEW COLUMN ── */}
              <div className="preview-column">
                {/* Live preview */}
                <div className="preview-card">
                  <div className="preview-card-header">
                    <span>Pré-visualização</span>
                    <div
                      className="preview-live-dot"
                      title="Atualização ao vivo"
                    />
                  </div>
                  <div className="mock-email-wrap">
                    <div className="mock-window-bar">
                      <div className="mock-dot r" />
                      <div className="mock-dot y" />
                      <div className="mock-dot g" />
                    </div>
                    <div className="mock-email">
                      <div className="mock-topbar">
                        <div className="mock-logo">JD</div>
                        <div className="mock-top-texts">
                          <div className="t1">John Deere</div>
                          <div className="t2">{nome || "Nome do template"}</div>
                        </div>
                      </div>
                      <div className="mock-subject">
                        <strong>Assunto:</strong> {nome || "–"}
                        {versao ? ` · v${versao}` : ""}
                      </div>
                      <div className="mock-body">
                        {wordCount > 0 ? (
                          <div
                            className="mock-body-content"
                            dangerouslySetInnerHTML={{ __html: bodyHtml }}
                            style={{
                              fontSize: 9,
                              lineHeight: 1.6,
                              color: "#374151",
                            }}
                          />
                        ) : (
                          <div className="mock-placeholder-lines">
                            {[90, 75, 82, 60, 88, 50].map((w, i) => (
                              <div
                                key={i}
                                className="mock-line"
                                style={{ width: `${w}%` }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mock-footer-bar">
                        © 2025 John Deere — Uso interno
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="stats-card">
                  <div className="stats-card-header">
                    <span>Detalhes</span>
                  </div>
                  <div className="stats-list">
                    <div className="stat-row">
                      <span className="s-label">Versão</span>
                      <span className="s-val green">
                        {versao ? `v${versao}` : "–"}
                      </span>
                    </div>
                    <div className="stat-row">
                      <span className="s-label">Categoria</span>
                      <span className="s-val">{categoria || "–"}</span>
                    </div>
                    <div className="stat-row">
                      <span className="s-label">Tags</span>
                      <span className="s-val">
                        {tags.length > 0 ? tags.length : "–"}
                      </span>
                    </div>
                    <div className="stat-row">
                      <span className="s-label">Palavras</span>
                      <span className="s-val">{wordCount}</span>
                    </div>
                    <div className="stat-row">
                      <span className="s-label">Variáveis</span>
                      <span className="s-val green">
                        {VARIABLES.filter((v) => bodyHtml.includes(v)).length}{" "}
                        detectadas
                      </span>
                    </div>
                    <div className="stat-row">
                      <span className="s-label">Status</span>
                      <span className="s-val" style={{ color: "#d97706" }}>
                        Rascunho
                      </span>
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
