import { useState } from "react";
import { StylesLoginPage } from "../css/StyleLoginPage";

// SVG icons
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
      <line x1="2" x2="22" y1="2" y2="22"/>
    </svg>
  );

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <style>{<StylesLoginPage />}</style>
      <div className="login-wrapper">
        {/* ── LEFT PANEL ── */}
        <div className="left-panel">
          {/* Decorative blobs */}
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
          <div className="blob blob-4" />

          {/* Logo */}
          <div className="logo-row">
            <div className="logo-badge">JD</div>
            <div className="logo-text">
              <h2>John Deere</h2>
              <span>Mail Manager</span>
            </div>
          </div>

          {/* Hero */}
          <div className="hero-copy">
            <h1>
              Comunicação<br />
              <em>centralizada.</em><br />
              Resultados reais.
            </h1>
            <p>
              Gerencie modelos de e-mail, variáveis e<br />
              envios programados em um só lugar.
            </p>
            <ul className="feature-list">
              <li>Modelos versionados com controle de histórico</li>
              <li>Envio imediato ou agendado com precisão</li>
              <li>Variáveis dinâmicas por destinatário</li>
            </ul>
          </div>

          <div className="left-footer">© 2025 John Deere — Uso interno</div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="right-panel">
          <div className="form-card">
            {/* Tabs */}
            <div className="tab-row">
              <button
                className={`tab-btn ${activeTab === "entrar" ? "active" : ""}`}
                onClick={() => setActiveTab("entrar")}
              >
                Entrar
              </button>
              <button
                className={`tab-btn ${activeTab === "cadastrar" ? "active" : ""}`}
                onClick={() => setActiveTab("cadastrar")}
              >
                Cadastrar
              </button>
            </div>

            {activeTab === "entrar" ? (
              <>
                <h2 className="card-title">Bem-vindo de volta</h2>
                <p className="card-subtitle">Acesse sua conta para gerenciar e-mails</p>

                {/* Email */}
                <div className="field-group">
                  <label className="field-label">E-mail corporativo</label>
                  <div className="input-wrap">
                    <input
                      type="email"
                      className="field-input"
                      placeholder="nome@johndeere.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="input-icon"><MailIcon /></span>
                  </div>
                </div>

                {/* Password */}
                <div className="field-group">
                  <label className="field-label">Senha</label>
                  <div className="input-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="field-input"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="input-icon"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                      aria-label="Mostrar senha"
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                  <div className="forgot-row">
                    <button className="forgot-link">Esqueci minha senha</button>
                  </div>
                </div>

                <button className="submit-btn">Entrar na plataforma</button>

                <p className="bottom-note">
                  Não tem conta?{" "}
                  <a onClick={() => setActiveTab("cadastrar")}>
                    Solicite acesso ao administrador
                  </a>
                </p>
              </>
            ) : (
              <>
                <h2 className="card-title">Criar conta</h2>
                <p className="card-subtitle">Preencha os dados para solicitar acesso</p>

                <div className="field-group">
                  <label className="field-label">Nome completo</label>
                  <div className="input-wrap">
                    <input type="text" className="field-input" placeholder="Seu nome" />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">E-mail corporativo</label>
                  <div className="input-wrap">
                    <input type="email" className="field-input" placeholder="nome@johndeere.com" />
                    <span className="input-icon"><MailIcon /></span>
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">Senha</label>
                  <div className="input-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="field-input"
                      placeholder="Crie uma senha segura"
                    />
                    <button
                      className="input-icon"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>

                <button className="submit-btn">Solicitar acesso</button>

                <p className="bottom-note">
                  Já tem uma conta?{" "}
                  <a onClick={() => setActiveTab("entrar")}>Entrar</a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
