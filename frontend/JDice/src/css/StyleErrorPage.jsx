const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green-dark:  #1a4a1a;
    --green-btn:   #3a7d3a;
    --green-light: #eef4ee;
    --yellow:      #f5c518;
    --white:       #ffffff;
    --text:        #1a1a1a;
    --muted:       #6b7280;
    --border:      #e5e7eb;
  }

  html, body, #root { height: 100%; font-family: 'Inter', sans-serif; background: var(--green-light); }

  .app { display: flex; height: 100vh; overflow: hidden; }


  /* ── MAIN ── */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

  /* ── TOPBAR ── */
  .topbar {
    height: 52px; background: var(--green-dark);
    display: flex; align-items: center; padding: 0 24px; flex-shrink: 0;
  }
  .topbar-brand { display: flex; flex-direction: column; margin-right: 40px; }
  .brand-name { font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 700; color: #fff; line-height: 1.2; }
  .brand-sub  { font-size: 9px; font-weight: 600; letter-spacing: 1.2px; color: rgba(255,255,255,0.5); text-transform: uppercase; }
  .topbar-nav { display: flex; align-items: center; gap: 4px; flex: 1; }
  .nav-link {
    padding: 6px 16px; font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,0.55); cursor: pointer;
    border-bottom: 2px solid transparent;
    background: none; border-top: none; border-left: none; border-right: none;
    font-family: 'Inter', sans-serif; transition: color .16s;
  }
  .nav-link:hover { color: #fff; }
  .topbar-user { display: flex; align-items: center; gap: 10px; margin-left: auto; }
  .user-name { font-size: 12px; font-weight: 600; color: #fff; }
  .user-role { font-size: 10.5px; color: rgba(255,255,255,0.55); text-align: right; }
  .user-avatar {
    width: 32px; height: 32px; background: var(--yellow); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-size: 11px; font-weight: 700; color: #1a1a1a;
  }

  /* ── 404 CONTENT ── */
  .error-content {
    flex: 1; display: flex; align-items: center; justify-content: center;
    padding: 40px 24px; position: relative; overflow: hidden;
  }

  /* Decorative background circles */
  .bg-circle {
    position: absolute; border-radius: 50%;
    background: rgba(58,125,58,0.07); pointer-events: none;
  }
  .bg-circle-1 { width: 480px; height: 480px; top: -140px; right: -100px; }
  .bg-circle-2 { width: 300px; height: 300px; bottom: -80px; left: -60px; }
  .bg-circle-3 { width: 160px; height: 160px; bottom: 80px; right: 180px; background: rgba(245,197,24,0.08); }

  .error-card {
    position: relative; z-index: 2;
    background: var(--white); border-radius: 20px;
    padding: 56px 64px 52px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.08);
    display: flex; flex-direction: column; align-items: center;
    text-align: center; max-width: 520px; width: 100%;
    animation: fadeUp .45s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── 404 illustration ── */
  .illustration { position: relative; margin-bottom: 36px; width: 180px; height: 140px; }

  .num-404 {
    font-family: 'Sora', sans-serif;
    font-size: 100px; font-weight: 800;
    line-height: 1; letter-spacing: -6px;
    color: var(--green-light);
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    white-space: nowrap; user-select: none;
  }

  .tractor-wrap {
    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center;
    animation: tractor-bounce 2.4s ease-in-out infinite;
  }

  @keyframes tractor-bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50%       { transform: translateX(-50%) translateY(-6px); }
  }

  .tractor-icon { font-size: 52px; filter: drop-shadow(0 6px 10px rgba(0,0,0,0.12)); }

  .dirt-line {
    width: 120px; height: 5px; background: linear-gradient(90deg, transparent, #c9d9c9 20%, #c9d9c9 80%, transparent);
    border-radius: 3px; margin-top: 4px;
    position: relative; overflow: hidden;
  }
  .dirt-line::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
    animation: shine 2s linear infinite;
  }
  @keyframes shine {
    from { transform: translateX(-100%); }
    to   { transform: translateX(100%); }
  }

  /* ── copy ── */
  .error-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: #fff7ed; border: 1px solid #fed7aa;
    color: #c2410c; border-radius: 20px;
    padding: 4px 12px; font-size: 11.5px; font-weight: 600;
    margin-bottom: 16px;
  }

  .error-title {
    font-family: 'Sora', sans-serif;
    font-size: 22px; font-weight: 800; color: var(--text);
    margin-bottom: 10px; line-height: 1.25;
  }

  .error-desc {
    font-size: 14px; color: var(--muted); line-height: 1.65;
    margin-bottom: 32px; max-width: 360px;
  }

  .error-path {
    display: inline-flex; align-items: center; gap: 8px;
    background: #f9fafb; border: 1px solid var(--border);
    border-radius: 8px; padding: 8px 14px;
    font-size: 12.5px; color: var(--muted);
    font-family: 'Inter', sans-serif;
    margin-bottom: 32px;
  }
  .error-path code {
    font-family: 'Courier New', monospace;
    color: #dc2626; font-size: 12px;
  }

  /* ── actions ── */
  .error-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }

  .btn-primary {
    display: flex; align-items: center; gap: 7px;
    background: var(--green-btn); color: #fff;
    border: none; border-radius: 10px; padding: 11px 22px;
    font-family: 'Sora', sans-serif; font-size: 13.5px; font-weight: 600;
    cursor: pointer; transition: background .18s, transform .1s;
  }
  .btn-primary:hover { background: #2f6b2f; }
  .btn-primary:active { transform: scale(0.98); }

  .btn-secondary {
    display: flex; align-items: center; gap: 7px;
    background: var(--white); color: var(--text);
    border: 1.5px solid var(--border); border-radius: 10px; padding: 11px 22px;
    font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 500;
    cursor: pointer; transition: border-color .18s, color .18s;
  }
  .btn-secondary:hover { border-color: var(--green-btn); color: var(--green-btn); }

  /* ── quick links ── */
  .quick-links {
    margin-top: 28px; padding-top: 24px;
    border-top: 1px solid var(--border);
    width: 100%;
  }
  .quick-links-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.7px;
    text-transform: uppercase; color: #9ca3af; margin-bottom: 12px;
  }
  .quick-links-row { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }

  .quick-link-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 7px 14px; border-radius: 8px;
    border: 1px solid var(--border); background: #fafafa;
    font-size: 12.5px; color: var(--muted); cursor: pointer;
    font-family: 'Inter', sans-serif; transition: all .18s;
  }
  .quick-link-btn:hover {
    background: var(--green-light);
    border-color: var(--green-btn);
    color: var(--green-btn);
  }
  .quick-link-btn .ql-icon { font-size: 14px; }

  /* ── FOOTER ── */
  .footer {
    padding: 11px 24px; font-size: 11.5px; color: var(--muted);
    background: var(--green-light); border-top: 1px solid var(--border); flex-shrink: 0;
  }
`;


export function StylesErrorPage() {
  return <style>{styles}</style>;
}