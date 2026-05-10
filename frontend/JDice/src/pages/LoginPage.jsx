import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { hasActiveSession, saveAuthSession } from "../../services/auth";
import { StylesLoginPage } from "../css/StyleLoginPage";
import LoadingSpinner from "../components/LoadingSpinner";

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
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/dashboard";
  const [activeTab, setActiveTab] = useState("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginStatus, setLoginStatus] = useState({ type: "", text: "" });
  const [registerStatus, setRegisterStatus] = useState({ type: "", text: "" });

  useEffect(() => {
    if (hasActiveSession()) {
      navigate(redirectTo, { replace: true });
    }
  }, [navigate, redirectTo]);

  const clearLoginStatus = () => setLoginStatus({ type: "", text: "" });
  const clearRegisterStatus = () => setRegisterStatus({ type: "", text: "" });

  const getRequestErrorMessage = (error, fallbackMessage) => {
    if (!error.response) {
      return "Nao foi possivel conectar ao servidor. Verifique se o backend esta ativo.";
    }

    if (error.response.status === 400) {
      return fallbackMessage;
    }

    if (error.response.status === 401 || error.response.status === 403) {
      return "Login ou senha invalidos.";
    }

    return error.response.data?.message || "Ocorreu um erro inesperado.";
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    clearRegisterStatus();

    if (!email.trim() || !password.trim()) {
      setLoginStatus({
        type: "error",
        text: "Preencha o e-mail corporativo e a senha para entrar.",
      });
      return;
    }

    setIsLoggingIn(true);
    clearLoginStatus();

    try {
      const normalizedLogin = email.trim();
      const response = await api.post("/auth/login", {
        login: normalizedLogin,
        password,
      });

      saveAuthSession(response.data?.token, normalizedLogin);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setLoginStatus({
        type: "error",
        text: getRequestErrorMessage(error, "Nao foi possivel concluir o login."),
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    clearLoginStatus();

    if (!registerEmail.trim() || !registerPassword.trim()) {
      setRegisterStatus({
        type: "error",
        text: "Preencha o e-mail corporativo e a senha para solicitar acesso.",
      });
      return;
    }

    setIsRegistering(true);
    clearRegisterStatus();

    try {
      const normalizedLogin = registerEmail.trim();

      await api.post("/auth/register", {
        login: normalizedLogin,
        password: registerPassword,
        role: "USER",
      });

      setEmail(normalizedLogin);
      setPassword("");
      setRegisterEmail("");
      setRegisterPassword("");
      setActiveTab("entrar");
      setLoginStatus({
        type: "success",
        text: "Conta criada com sucesso. Entre para acessar a plataforma.",
      });
    } catch (error) {
      setRegisterStatus({
        type: "error",
        text: getRequestErrorMessage(
          error,
          "Ja existe uma conta cadastrada para este e-mail.",
        ),
      });
    } finally {
      setIsRegistering(false);
    }
  };

  const renderStatus = (status) => {
    if (!status.text) {
      return null;
    }

    return <p className={`status-message ${status.type}`}>{status.text}</p>;
  };

  return (
    <>
      <StylesLoginPage />
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
                type="button"
              >
                Entrar
              </button>
              <button
                className={`tab-btn ${activeTab === "cadastrar" ? "active" : ""}`}
                onClick={() => setActiveTab("cadastrar")}
                type="button"
              >
                Cadastrar
              </button>
            </div>

            {activeTab === "entrar" ? (
              <form className="auth-form" onSubmit={handleLoginSubmit}>
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearLoginStatus();
                      }}
                      autoComplete="username"
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
                      onChange={(e) => {
                        setPassword(e.target.value);
                        clearLoginStatus();
                      }}
                      autoComplete="current-password"
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
                    <button className="forgot-link" type="button">Esqueci minha senha</button>
                  </div>
                </div>

                {renderStatus(loginStatus)}

                  <button className="submit-btn" disabled={isLoggingIn} type="submit">
                    {isLoggingIn ? (
                      <LoadingSpinner label="Entrando..." size={16} inline light />
                    ) : (
                      "Entrar na plataforma"
                    )}
                  </button>

                <p className="bottom-note">
                  Não tem conta?{" "}
                  <button type="button" onClick={() => setActiveTab("cadastrar")}>
                    Solicite acesso ao administrador
                  </button>
                </p>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleRegisterSubmit}>
                <h2 className="card-title">Criar conta</h2>
                <p className="card-subtitle">Use seu e-mail corporativo para solicitar acesso</p>

                <div className="field-group">
                  <label className="field-label">E-mail corporativo</label>
                  <div className="input-wrap">
                    <input
                      type="email"
                      className="field-input"
                      placeholder="nome@johndeere.com"
                      value={registerEmail}
                      onChange={(e) => {
                        setRegisterEmail(e.target.value);
                        clearRegisterStatus();
                      }}
                      autoComplete="username"
                    />
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
                      value={registerPassword}
                      onChange={(e) => {
                        setRegisterPassword(e.target.value);
                        clearRegisterStatus();
                      }}
                      autoComplete="new-password"
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

                {renderStatus(registerStatus)}

                <button className="submit-btn" disabled={isRegistering} type="submit">
                  {isRegistering ? (
                    <LoadingSpinner label="Enviando..." size={16} inline light />
                  ) : (
                    "Solicitar acesso"
                  )}
                </button>

                <p className="bottom-note">
                  Já tem uma conta?{" "}
                  <button type="button" onClick={() => setActiveTab("entrar")}>
                    Entrar
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
