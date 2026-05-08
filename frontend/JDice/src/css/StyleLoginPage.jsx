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

  .status-message {
    margin-top: 4px;
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 13px;
    line-height: 1.5;
  }

  .status-message.error {
    background: #fff4f4;
    border: 1px solid #f6caca;
    color: #a12626;
  }

  .status-message.success {
    background: #eef9f0;
    border: 1px solid #bfe0c5;
    color: #1f6b32;
  }

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
  .submit-btn:disabled {
    background: #8ca98c;
    cursor: wait;
    transform: none;
  }

  /* Bottom note */
  .bottom-note {
    margin-top: 36px;
    text-align: center;
    font-size: 13px;
    color: var(--jd-text-muted);
  }

  .bottom-note button {
    color: var(--jd-text-dark);
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: none;
    font-size: inherit;
    font-family: inherit;
  }

  .bottom-note button:hover { text-decoration: underline; }

  /* Responsive */
  @media (max-width: 768px) {
    .login-wrapper { flex-direction: column; }
    .left-panel { width: 100%; min-width: unset; padding: 32px 28px; }
    .hero-copy { margin-top: 36px; }
    .form-card { padding: 32px 24px; }
  }
`;



export function StylesLoginPage() {
  return <style>{styles}</style>;
}
