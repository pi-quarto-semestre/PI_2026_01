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
    --step-done:   #3a7d3a;
    --step-active: #3a7d3a;
    --step-idle:   #d1d5db;
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
    color: rgba(255,255,255,0.65); cursor: pointer;
    border-bottom: 2px solid transparent; transition: color .16s;
    background: none; border-top: none; border-left: none; border-right: none;
    font-family: 'Inter', sans-serif;
  }
  .nav-link:hover { color: #fff; }
  .nav-link.active { color: #fff; border-bottom-color: var(--yellow); }
  .topbar-user { display: flex; align-items: center; gap: 10px; margin-left: auto; }
  .user-info { text-align: right; }
  .user-name { font-size: 12px; font-weight: 600; color: #fff; }
  .user-role { font-size: 10.5px; color: rgba(255,255,255,0.55); }
  .user-avatar {
    width: 32px; height: 32px; background: var(--yellow); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-size: 11px; font-weight: 700; color: #1a1a1a;
  }

  /* ── CONTENT ── */
  .content {
    flex: 1; overflow-y: auto; padding: 22px 24px 28px;
    display: flex; flex-direction: column; gap: 16px;
  }

  /* ── PAGE HEADER ── */
  .page-header h1 {
    font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 800; color: var(--text);
  }
  .page-sub { font-size: 12.5px; color: var(--muted); margin-top: 3px; }

  /* ── STEPPER ── */
  .stepper {
    display: flex; align-items: center; gap: 0;
    background: var(--white); border-radius: 10px;
    padding: 12px 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }
  .step { display: flex; align-items: center; gap: 8px; flex: 1; }
  .step-circle {
    width: 26px; height: 26px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11.5px; font-weight: 700; flex-shrink: 0;
    font-family: 'Sora', sans-serif; border: 2px solid transparent;
  }
  .step-circle.done   { background: var(--step-done); color: #fff; border-color: var(--step-done); }
  .step-circle.active { background: var(--step-active); color: #fff; border-color: var(--step-active); }
  .step-circle.idle   { background: #fff; color: var(--muted); border-color: var(--step-idle); }

  .step-label { display: flex; flex-direction: column; }
  .step-label .s-name {
    font-size: 12px; font-weight: 600;
    color: var(--text);
  }
  .step-label .s-sub { font-size: 10.5px; color: var(--muted); }
  .step.idle .step-label .s-name { color: var(--muted); }

  .step-line {
    flex: 1; height: 2px; background: var(--step-idle); margin: 0 10px;
    position: relative; max-width: 60px;
  }
  .step-line.done { background: var(--step-done); }
  .step-line::before {
    content: ''; position: absolute; top: 50%; left: 0; right: 0;
    border-top: 2px dashed #c9d9c9; transform: translateY(-50%);
  }
  .step-line.done::before { border-top-color: var(--step-done); border-top-style: solid; }

  /* ── BODY LAYOUT ── */
  .body-layout { display: flex; gap: 16px; flex: 1; min-height: 0; }

  /* ── FORM PANEL ── */
  .form-panel { flex: 1; display: flex; flex-direction: column; gap: 14px; min-width: 0; }

  /* ── SECTION CARD ── */
  .section-card {
    background: var(--white); border-radius: 12px;
    padding: 20px 22px; box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }

  .section-num {
    display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
  }
  .section-num .num-badge {
    width: 24px; height: 24px; border-radius: 50%;
    background: var(--green-btn); color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-size: 11px; font-weight: 700;
  }
  .section-num h2 {
    font-family: 'Sora', sans-serif; font-size: 14.5px; font-weight: 700; color: var(--text);
  }
  .section-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }

  /* Field */
  .field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
  .field:last-child { margin-bottom: 0; }
  .field label { font-size: 12px; font-weight: 500; color: var(--text); }

  .select-wrap { position: relative; }
  .select-wrap select {
    width: 100%; height: 40px; padding: 0 36px 0 12px;
    border: 1.5px solid var(--border); border-radius: 9px;
    background: #fafafa; font-size: 13px; color: var(--text);
    font-family: 'Inter', sans-serif; outline: none; appearance: none;
    cursor: pointer; transition: border-color .2s;
  }
  .select-wrap select:focus { border-color: var(--green-btn); background: #fff; }
  .select-arrow {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    color: var(--muted); pointer-events: none;
  }

  .field input[type="text"] {
    height: 40px; padding: 0 12px;
    border: 1.5px solid var(--border); border-radius: 9px;
    background: #fafafa; font-size: 13px; color: var(--text);
    font-family: 'Inter', sans-serif; outline: none; transition: border-color .2s;
  }
  .field input[type="text"]:focus { border-color: var(--green-btn); background: #fff; }
  .field input::placeholder { color: #b0b7c0; }

  /* version info row */
  .version-row { display: flex; align-items: center; gap: 10px; }
  .version-row .select-wrap { flex: 1; }
  .version-link {
    font-size: 12.5px; color: var(--green-btn); font-weight: 500;
    cursor: pointer; white-space: nowrap; background: none; border: none;
    font-family: 'Inter', sans-serif;
  }
  .version-link:hover { text-decoration: underline; }

  /* model preview card */
  .model-preview-card {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px; border: 1.5px solid var(--border);
    border-radius: 10px; background: #fafafa; margin-top: 10px;
  }
  .model-thumb {
    width: 36px; height: 36px; background: var(--green-light);
    border-radius: 9px; display: flex; align-items: center;
    justify-content: center; font-size: 17px; flex-shrink: 0;
  }
  .model-info { flex: 1; }
  .model-info .m-name { font-size: 13px; font-weight: 600; color: var(--text); }
  .model-info .m-meta { font-size: 11.5px; color: var(--muted); margin-top: 2px; }
  .model-info .m-vars { font-size: 11px; color: var(--muted); margin-top: 1px; }
  .btn-preview {
    font-size: 12.5px; color: var(--green-btn); font-weight: 500;
    cursor: pointer; background: none; border: none; font-family: 'Inter', sans-serif;
    white-space: nowrap;
  }
  .btn-preview:hover { text-decoration: underline; }

  /* variables grid */
  .vars-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .vars-grid .field { margin-bottom: 0; }

  /* nav buttons */
  .form-nav {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 4px;
  }
  .btn-back {
    display: flex; align-items: center; gap: 6px;
    background: var(--white); color: var(--text);
    border: 1.5px solid var(--border); border-radius: 9px;
    padding: 9px 20px; font-size: 13px; font-weight: 500;
    font-family: 'Inter', sans-serif; cursor: pointer; transition: border-color .18s;
  }
  .btn-back:hover { border-color: var(--green-btn); color: var(--green-btn); }

  .btn-next {
    display: flex; align-items: center; gap: 7px;
    background: var(--green-btn); color: #fff;
    border: none; border-radius: 9px; padding: 10px 22px;
    font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: background .18s;
  }
  .btn-next:hover { background: #2f6b2f; }

  /* ── PREVIEW PANEL ── */
  .preview-panel {
    width: 240px; flex-shrink: 0;
    display: flex; flex-direction: column; gap: 0;
  }

  .preview-card {
    background: var(--white); border-radius: 12px;
    overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    display: flex; flex-direction: column;
  }

  .preview-card-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 11px 14px; border-bottom: 1px solid var(--border);
  }
  .preview-card-header span {
    font-family: 'Sora', sans-serif; font-size: 12px; font-weight: 700; color: var(--text);
  }
  .preview-close {
    width: 22px; height: 22px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    background: #f3f4f6; border: none; cursor: pointer; color: var(--muted);
    transition: background .15s;
  }
  .preview-close:hover { background: var(--border); }

  /* email mock */
  .email-mock { padding: 12px; display: flex; flex-direction: column; gap: 0; }

  .mock-window-bar {
    display: flex; gap: 5px; margin-bottom: 10px;
  }
  .mock-dot {
    width: 8px; height: 8px; border-radius: 50%;
  }
  .mock-dot.red { background: #ef4444; }
  .mock-dot.yellow { background: #f5c518; }
  .mock-dot.green { background: #22c55e; }

  .mock-email {
    border: 1px solid var(--border); border-radius: 8px; overflow: hidden;
    font-size: 10px;
  }

  .mock-top-bar {
    background: var(--green-dark); padding: 6px 10px;
    display: flex; align-items: center; gap: 7px;
  }
  .mock-logo-badge {
    width: 20px; height: 20px; background: var(--yellow); border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-weight: 800; font-size: 8px; color: #1a1a1a;
  }
  .mock-top-text .t1 { font-size: 9px; font-weight: 700; color: #fff; line-height: 1.2; }
  .mock-top-text .t2 { font-size: 8px; color: rgba(255,255,255,0.6); }

  .mock-hero {
    background: var(--green-light); padding: 16px 12px 12px;
    text-align: center; display: flex; flex-direction: column; align-items: center; gap: 6px;
  }
  .mock-hero-emoji { font-size: 22px; }
  .mock-hero-title {
    font-family: 'Sora', sans-serif; font-size: 10px; font-weight: 700;
    color: var(--green-dark); line-height: 1.3; text-align: center;
  }

  .mock-body { padding: 10px 12px; background: #fff; }
  .mock-greeting { font-size: 9.5px; color: var(--text); margin-bottom: 6px; }
  .mock-lines { display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; }
  .mock-line {
    height: 5px; background: #e5e7eb; border-radius: 3px;
  }

  .mock-cta {
    background: var(--yellow); border-radius: 5px;
    padding: 7px 10px; text-align: center;
    font-size: 9px; font-weight: 700; color: #1a1a1a;
    font-family: 'Sora', sans-serif; margin-bottom: 10px;
  }

  .mock-footer {
    padding: 8px 12px; background: #f9fafb; border-top: 1px solid var(--border);
    font-size: 8px; color: var(--muted); line-height: 1.5;
  }

`;


export function StylesEnviarPages() {
  return <style>{styles}</style>;
}