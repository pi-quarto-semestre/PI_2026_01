import { useState, useRef, useEffect } from "react";
import HeaderNav from "../components/HeaderNav";
import Sidebar from "../components/Sidebar";
import { HEADER_NAV_ITEMS } from "../components/HeaderNav";
import { StylesNovoTemplatePage } from "../css/StyleNovoTemplatePage";
import Footer from "../components/Footer";
import { Stepper } from "../components/Stepper";
import { StyleDestinatariosPage } from "../css/StyleDestinatariosPage";

/* ─────────────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────────────── */
const MOCK_LISTS = [
  { id: "ls", label: "Lista Sul", count: 847, type: "list" },
  { id: "lc", label: "Lista Centro", count: 234, type: "list" },
  { id: "ln", label: "Lista Norte", count: 512, type: "list" },
  { id: "lsd", label: "Lista Sudeste", count: 1200, type: "list" },
];
const MOCK_EMAILS = [
  "marketing@johndeere.com.br",
  "vendas@johndeere.com.br",
  "comunicados@johndeere.com.br",
];
const TIMEZONES = [
  "Brasília (UTC-3)",
  "Manaus (UTC-4)",
  "Acre (UTC-5)",
  "Fernando de Noronha (UTC-2)",
];

/* ─────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────── */
const SvgIcon = ({ children, s = 16 }) => (
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
    {children}
  </svg>
);
const GridIcon = ({ s = 16 }) => (
  <SvgIcon s={s}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </SvgIcon>
);
const ListIcon = ({ s = 16 }) => (
  <SvgIcon s={s}>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </SvgIcon>
);
const SendIcon = ({ s = 16 }) => (
  <SvgIcon s={s}>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </SvgIcon>
);
const BarIcon = ({ s = 16 }) => (
  <SvgIcon s={s}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </SvgIcon>
);
const GearIcon = ({ s = 16 }) => (
  <SvgIcon s={s}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </SvgIcon>
);
const ChevL = ({ s = 13 }) => (
  <SvgIcon s={s}>
    <polyline points="15 18 9 12 15 6" />
  </SvgIcon>
);
const ChevD = ({ s = 12 }) => (
  <SvgIcon s={s}>
    <polyline points="6 9 12 15 18 9" />
  </SvgIcon>
);

const formatVariableToken = (variable) => `{${variable}}`;

/* ─────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────── */

/* RecipientInput */
function RecipientInput({
  label,
  required,
  placeholder,
  chips,
  onAdd,
  onRemove,
  suggestions = [],
  error,
}) {
  const [val, setVal] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = suggestions.filter(
    (s) =>
      !chips.find((c) => c.id === s.id) &&
      s.label.toLowerCase().includes(val.toLowerCase()),
  );
  const showDrop = open && val.length >= 0 && filtered.length > 0;

  function commit(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    // Check if it's a list suggestion match
    const match = suggestions.find(
      (s) => s.label.toLowerCase() === trimmed.toLowerCase(),
    );
    if (match) {
      onAdd(match);
    } else if (trimmed.includes("@")) {
      onAdd({ id: trimmed, label: trimmed, type: "email" });
    }
    setVal("");
    setOpen(false);
  }

  function handleKey(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit(val);
    }
    if (e.key === "Backspace" && !val && chips.length)
      onRemove(chips[chips.length - 1].id);
  }

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="field" ref={ref}>
      <label>
        {label} {required && <span className="req">*</span>}
      </label>
      <div className={`ac-wrap`}>
        <div
          className={`tag-field ${error ? "err" : ""}`}
          onClick={() => {
            setOpen(true);
            ref.current?.querySelector(".tag-input-raw")?.focus();
          }}
        >
          {chips.map((c) => (
            <span
              key={c.id}
              className={`chip ${c.type === "list" ? "list" : "email"}`}
            >
              {c.type === "list" && <span className="chip-icon">📋</span>}
              {c.label}
              {c.count ? ` (${c.count.toLocaleString()})` : ""}
              <button
                className="chip-rm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(c.id);
                }}
              >
                ×
              </button>
            </span>
          ))}
          <input
            className="tag-input-raw"
            placeholder={chips.length === 0 ? placeholder : ""}
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              setOpen(true);
            }}
            onKeyDown={handleKey}
            onFocus={() => setOpen(true)}
          />
        </div>
        {showDrop && (
          <div className="ac-drop">
            {filtered.map((s) => (
              <div
                key={s.id}
                className="ac-item"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onAdd(s);
                  setVal("");
                  setOpen(false);
                }}
              >
                <span className="chip-icon">
                  {s.type === "list" ? "📋" : "✉️"}
                </span>
                <span className="ai-label">{s.label}</span>
                {s.count && (
                  <span className="ai-sub">
                    {s.count.toLocaleString()} contatos
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <span className="field-err">⚠ {error}</span>}
    </div>
  );
}

/* ScheduleSection */
function ScheduleSection({
  mode,
  onMode,
  date,
  onDate,
  time,
  onTime,
  tz,
  onTz,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="sched-options">
        {/* Enviar agora */}
        <div
          className={`sched-opt ${mode === "now" ? "sel" : ""}`}
          onClick={() => onMode("now")}
        >
          <div className="radio">
            {mode === "now" && <div className="radio-dot" />}
          </div>
          <div>
            <div className="opt-title">Enviar agora</div>
            <div className="opt-sub">
              Envio imediato após confirmação
              <br />
              Processamento estimado ~2 min
            </div>
          </div>
        </div>
        {/* Agendar */}
        <div
          className={`sched-opt ${mode === "sched" ? "sel" : ""}`}
          onClick={() => onMode("sched")}
        >
          <div className="radio">
            {mode === "sched" && <div className="radio-dot" />}
          </div>
          <div>
            <div className="opt-title">Agendar envio</div>
            <div className="opt-sub">Defina data e hora específicas</div>
          </div>
        </div>
      </div>

      {mode === "sched" && (
        <div className="sched-fields">
          <div className="field">
            <label>Data de envio</label>
            <input
              type="date"
              value={date}
              onChange={(e) => onDate(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Horário</label>
            <input
              type="time"
              value={time}
              onChange={(e) => onTime(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Fuso horário</label>
            <div className="sel-wrap">
              <select value={tz} onChange={(e) => onTz(e.target.value)}>
                {TIMEZONES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <span className="sel-arr">
                <ChevD />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* SummaryCard */
function SummaryCard({
  to,
  cc,
  sender,
  mode,
  date,
  time,
  templateName,
  templateVersion,
  templateVariables,
}) {
  const total = to.reduce((s, c) => s + (c.count || 1), 0);
  const ccText = cc.map((c) => c.label).join(", ");
  const scheduled = mode === "sched" && date && time;
  const templateEntries = Object.entries(templateVariables || {});

  function fmtDate(d, t) {
    if (!d) return null;
    const [y, m, day] = d.split("-");
    return `${day}/${m}/${y} às ${t || "00:00"}`;
  }

  // eslint-disable-next-line react-hooks/purity
  const [renderTime] = useState(Date.now());

  function hoursUntil(d, t) {
    if (!d || !t) return null;
    const target = new Date(`${d}T${t}:00`);
    const diff = target - renderTime;
    if (diff <= 0) return null;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    return `Envio agendado em ${h}h ${m}min`;
  }

  const eta = scheduled ? hoursUntil(date, time) : null;

  return (
    <>
      <style>
        <StyleDestinatariosPage />
      </style>

      <div className="summary-card">
        <div className="sum-header">Resumo do Envio</div>

        <div className="sum-body">
          {/* Modelo */}
          <div className="sum-block">
            <span className="sum-block-label">Modelo</span>
            <span className="sum-block-title">
              {templateName || "Nenhum modelo selecionado"}
            </span>
            <span className="sum-block-sub">
              {templateVersion
                ? `Versão ${templateVersion}`
                : "Versão não selecionada"}
            </span>
          </div>

          <hr className="sum-divider" />

          {/* Variáveis */}
          <div className="sum-block">
            <span className="sum-block-label">Variáveis</span>
            {templateEntries.length > 0 ? (
              templateEntries.map(([key, value]) => (
                <div key={key} className="sum-var">
                  <code>{formatVariableToken(key)}</code>
                  <span className="arrow">→</span>
                  <span className="val">{value || "Não preenchido"}</span>
                </div>
              ))
            ) : (
              <span className="sum-block-sub">
                Nenhuma variável carregada para este modelo
              </span>
            )}
          </div>

          <hr className="sum-divider" />

          {/* Destinatários */}
          <div className="sum-block">
            <span className="sum-block-label">Destinatários</span>
            {to.length > 0 ? (
              <>
                <span className="sum-block-sub">
                  Para:{" "}
                  {to
                    .map(
                      (c) =>
                        `${c.label}${c.count ? ` (${c.count.toLocaleString()})` : ""}`,
                    )
                    .join(" + ")}
                </span>
                <span className="sum-block-sub highlight">
                  Total: {total.toLocaleString()} e-mails
                </span>
              </>
            ) : (
              <span className="sum-block-sub">
                Nenhum destinatário adicionado
              </span>
            )}
            {cc.length > 0 && (
              <span className="sum-block-sub">CC: {ccText}</span>
            )}
            <span className="sum-block-sub">Remetente: {sender}</span>
          </div>

          <hr className="sum-divider" />

          {/* Agendamento */}
          <div className="sum-block">
            <span className="sum-block-label">Agendamento</span>
            {scheduled ? (
              <>
                <span className="sum-block-sub highlight">
                  {fmtDate(date, time)} (Brasília)
                </span>
                {eta && <span className="sum-block-sub">{eta}</span>}
              </>
            ) : mode === "now" ? (
              <span className="sum-block-sub highlight">Envio imediato</span>
            ) : (
              <span className="sum-block-sub">Não definido</span>
            )}
          </div>

          {/* Estimativa */}
          <div className="sum-delivery">
            <span className="sd-label">Estimativa de entrega</span>
            <span className="sd-main">Taxa de abertura esperada: ~68%</span>
            <span className="sd-sub">~735 aberturas estimadas</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────── */

export default function DestinatariosPage({
  templateName = "",
  templateVersion = "",
  templateVariables = {},
}) {
  // Destinatários state
  const [toChips, setToChips] = useState([]);
  const [ccChips, setCcChips] = useState([]);
  const [ccoChips, setCcoChips] = useState([]);
  const [showCco, setShowCco] = useState(false);
  const [sender, setSender] = useState(MOCK_EMAILS[0]);
  const [replyTo, setReplyTo] = useState("");

  // Schedule state
  const [schedMode, setSchedMode] = useState("now");
  const [sendDate, setSendDate] = useState("2025-04-03");
  const [sendTime, setSendTime] = useState("08:00");
  const [tz, setTz] = useState(TIMEZONES[0]);

  // Validation errors
  const [errors, setErrors] = useState({});

  // Toast
  const [toast, setToast] = useState({ show: false, msg: "" });

  function showToast(msg) {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 3400);
  }

  function validate() {
    const e = {};
    if (toChips.length === 0) e.to = "Adicione ao menos um destinatário.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleConfirm() {
    if (!validate()) return;
    showToast("✅ Envio confirmado com sucesso!");
  }

  function handleDraft() {
    showToast("💾 Rascunho salvo!");
  }

  return (
    <>
      <style>{<StylesNovoTemplatePage />}</style>

      {/* Toast */}
      <div className={`toast ${toast.show ? "show" : ""}`}>{toast.msg}</div>

      {/* Body */}
      <div className="body-row">
        {/* ── FORM COLUMN ── */}
        <div className="form-col">
          {/* ── Section 3: Destinatários ── */}
          <div className="sec-card">
            <div className="sec-card-body">
              <div className="sec-num">
                <div className="num">3</div>
                <h2>Destinatários</h2>
              </div>

              {/* Para */}
              <RecipientInput
                label="Para"
                required
                placeholder="+ adicionar lista ou e-mail..."
                chips={toChips}
                onAdd={(c) =>
                  setToChips((p) =>
                    p.find((x) => x.id === c.id) ? p : [...p, c],
                  )
                }
                onRemove={(id) =>
                  setToChips((p) => p.filter((c) => c.id !== id))
                }
                suggestions={MOCK_LISTS}
                error={errors.to}
              />

              {/* CC */}
              <RecipientInput
                label="Cópia (CC)"
                placeholder="+ adicionar cópia..."
                chips={ccChips}
                onAdd={(c) =>
                  setCcChips((p) =>
                    p.find((x) => x.id === c.id) ? p : [...p, c],
                  )
                }
                onRemove={(id) =>
                  setCcChips((p) => p.filter((c) => c.id !== id))
                }
                suggestions={[]}
              />

              {/* CCO */}
              {showCco ? (
                <RecipientInput
                  label="Cópia Oculta (CCO)"
                  placeholder="+ adicionar cópia oculta..."
                  chips={ccoChips}
                  onAdd={(c) =>
                    setCcoChips((p) =>
                      p.find((x) => x.id === c.id) ? p : [...p, c],
                    )
                  }
                  onRemove={(id) =>
                    setCcoChips((p) => p.filter((c) => c.id !== id))
                  }
                  suggestions={[]}
                />
              ) : (
                <button
                  style={{
                    alignSelf: "flex-start",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    color: "#6b7280",
                    fontFamily: "Inter, sans-serif",
                    padding: "2px 0",
                  }}
                  onClick={() => setShowCco(true)}
                >
                  + Adicionar cópia oculta (CCO)
                </button>
              )}

              {/* Remetente + Responder para */}
              <div className="fields-2col">
                <div className="field">
                  <label>Remetente</label>
                  <div className="sel-wrap">
                    <select
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                    >
                      {MOCK_EMAILS.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                    <span className="sel-arr">
                      <ChevD />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label>Responder para</label>
                  <input
                    className="std-input"
                    placeholder="Mesmo que remetente"
                    value={replyTo}
                    onChange={(e) => setReplyTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Section 4: Agendamento ── */}
          <div className="sec-card">
            <div className="sec-card-body">
              <div className="sec-num">
                <div className="num">4</div>
                <h2>Agendamento</h2>
              </div>

              <ScheduleSection
                mode={schedMode}
                onMode={setSchedMode}
                date={sendDate}
                onDate={setSendDate}
                time={sendTime}
                onTime={setSendTime}
                tz={tz}
                onTz={setTz}
              />
            </div>
          </div>
        </div>

        {/* ── ASIDE: Summary ── */}
        <div className="aside-col">
          <SummaryCard
            to={toChips}
            cc={ccChips}
            sender={sender}
            mode={schedMode}
            date={sendDate}
            time={sendTime}
            templateName={templateName}
            templateVersion={templateVersion}
            templateVariables={templateVariables}
            tz={tz}
            onDraft={handleDraft}
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </>
  );
}
