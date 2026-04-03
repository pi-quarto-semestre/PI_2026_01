import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --jd-green-dark: #1a4a1a;
    --jd-green-mid: #2d6a2d;
    --jd-green-btn: #3a7d3a;
    --jd-green-active: #2f6b2f;
    --jd-yellow: #f5c518;
    --jd-bg-right: #eef4ee;
    --jd-white: #ffffff;
    --jd-text-dark: #1a1a1a;
    --jd-text-muted: #6b7280;
    --jd-border: #d1d5db;
    --jd-input-bg: #f9fafb;
    --jd-link: #1a7f3c;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  .login-wrapper {
    display: flex;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
    overflow: hidden;
  }

  /* ─── LEFT PANEL ─────────────────────────────────────── */
  .left-panel {
    position: relative;
    width: 38%;
    min-width: 340px;
    background: linear-gradient(160deg, #1b4d1b 0%, #2a6e2a 55%, #1e5c1e 100%);
    display: flex;
    flex-direction: column;
    padding: 40px 44px 36px;
    overflow: hidden;
  }

  /* Decorative blobs */
  .blob {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    pointer-events: none;
  }
  .blob-1 { width: 260px; height: 260px; top: 60px; left: -80px; }
  .blob-2 { width: 200px; height: 200px; top: 200px; left: 60px; opacity: 0.5; }
  .blob-3 { width: 320px; height: 320px; bottom: -60px; right: -100px; }
  .blob-4 { width: 150px; height: 150px; bottom: 100px; left: -40px; opacity: 0.3; }

  /* Logo */
  .logo-row {
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 2;
  }

  .logo-badge {
    width: 48px;
    height: 48px;
    background: var(--jd-yellow);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Sora', sans-serif;
    font-weight: 800;
    font-size: 16px;
    color: #1a1a1a;
    letter-spacing: -0.5px;
    flex-shrink: 0;
  }

  .logo-text h2 {
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
  }

  .logo-text span {
    font-size: 12px;
    font-weight: 400;
    color: rgba(255,255,255,0.65);
  }

  /* Hero copy */
  .hero-copy {
    position: relative;
    z-index: 2;
    margin-top: auto;
    padding-bottom: 8px;
  }

  .hero-copy h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(28px, 3.2vw, 38px);
    font-weight: 800;
    color: #fff;
    line-height: 1.18;
    margin-bottom: 18px;
  }

  .hero-copy h1 em {
    font-style: normal;
    color: var(--jd-yellow);
  }

  .hero-copy p {
    font-size: 13.5px;
    color: rgba(255,255,255,0.72);
    line-height: 1.6;
    margin-bottom: 28px;
    max-width: 280px;
  }

  .feature-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .feature-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: rgba(255,255,255,0.85);
  }

  .feature-list li::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--jd-yellow);
    flex-shrink: 0;
  }

  /* Footer */
  .left-footer {
    position: relative;
    z-index: 2;
    margin-top: 40px;
    font-size: 11.5px;
    color: rgba(255,255,255,0.4);
  }

  /* ─── RIGHT PANEL ─────────────────────────────────────── */
  .right-panel {
    flex: 1;
    background: var(--jd-bg-right);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
  }

  .form-card {
    background: var(--jd-white);
    border-radius: 20px;
    padding: 40px 44px 44px;
    width: 100%;
    max-width: 520px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.07);
    animation: fadeUp 0.45s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Tabs */
  .tab-row {
    display: flex;
    background: #f0f0f0;
    border-radius: 10px;
    padding: 4px;
    margin-bottom: 36px;
    width: fit-content;
  }

  .tab-btn {
    padding: 9px 32px;
    border: none;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.22s ease;
    background: transparent;
    color: var(--jd-text-muted);
  }

  .tab-btn.active {
    background: var(--jd-green-btn);
    color: #fff;
    box-shadow: 0 2px 8px rgba(42,110,42,0.25);
  }

  /* Card title */
  .card-title {
    font-family: 'Sora', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--jd-text-dark);
    margin-bottom: 6px;
  }

  .card-subtitle {
    font-size: 13.5px;
    color: var(--jd-text-muted);
    margin-bottom: 30px;
  }

  /* Form fields */
  .field-group {
    margin-bottom: 18px;
  }

  .field-label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: var(--jd-text-dark);
    margin-bottom: 7px;
  }

  .input-wrap {
    position: relative;
  }

  .field-input {
    width: 100%;
    height: 50px;
    padding: 0 46px 0 16px;
    border: 1.5px solid var(--jd-border);
    border-radius: 10px;
    background: var(--jd-input-bg);
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: var(--jd-text-dark);
    outline: none;
    transition: border-color 0.2s;
  }

  .field-input::placeholder {
    color: #b0b7c0;
  }

  .field-input:focus {
    border-color: var(--jd-green-btn);
    background: #fff;
  }

  .input-icon {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
  }

  .forgot-row {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
  }

  .forgot-link {
    font-size: 12.5px;
    color: var(--jd-link);
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
  }

  .forgot-link:hover { text-decoration: underline; }

  /* Submit btn */
  .submit-btn {
    width: 100%;
    height: 52px;
    margin-top: 26px;
    background: var(--jd-green-btn);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'Sora', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: 0.2px;
    transition: background 0.2s, transform 0.1s;
  }

  .submit-btn:hover { background: var(--jd-green-active); }
  .submit-btn:active { transform: scale(0.99); }

  /* Bottom note */
  .bottom-note {
    margin-top: 36px;
    text-align: center;
    font-size: 13px;
    color: var(--jd-text-muted);
  }

  .bottom-note a {
    color: var(--jd-text-dark);
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
  }

  .bottom-note a:hover { text-decoration: underline; }

  /* Responsive */
  @media (max-width: 768px) {
    .login-wrapper { flex-direction: column; }
    .left-panel { width: 100%; min-width: unset; padding: 32px 28px; }
    .hero-copy { margin-top: 36px; }
    .form-card { padding: 32px 24px; }
  }
`;

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
      <style>{styles}</style>
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
