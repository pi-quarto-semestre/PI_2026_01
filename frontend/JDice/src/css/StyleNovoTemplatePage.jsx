/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green-dark:  #1a4a1a;
    --green-btn:   #3a7d3a;
    --green-light: #eef4ee;
    --green-hover: #2f6b2f;
    --yellow:      #f5c518;
    --white:       #ffffff;
    --text:        #1a1a1a;
    --muted:       #6b7280;
    --border:      #e5e7eb;
    --input-bg:    #fafafa;
    --danger:      #dc2626;
    --danger-soft: #fef2f2;
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
  .user-name { font-size: 12px; font-weight: 600; color: #fff; }
  .user-role { font-size: 10.5px; color: rgba(255,255,255,0.55); text-align: right; }
  .user-avatar {
    width: 32px; height: 32px; background: var(--yellow); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-size: 11px; font-weight: 700; color: #1a1a1a;
  }

  /* ── CONTENT ── */
  .content { flex: 1; overflow-y: auto; padding: 24px 28px 36px; display: flex; flex-direction: column; gap: 20px; }

  /* ── PAGE HEADER ── */
  .page-header { display: flex; align-items: flex-start; justify-content: space-between; }
  .page-header-left h1 {
    font-family: 'Sora', sans-serif; font-size: 21px; font-weight: 800; color: var(--text); line-height: 1.2;
  }
  .breadcrumb {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; color: var(--muted); margin-bottom: 4px;
  }
  .breadcrumb span { cursor: pointer; transition: color .15s; }
  .breadcrumb span:hover { color: var(--green-btn); }
  .breadcrumb .sep { color: var(--border); }
  .breadcrumb .current { color: var(--muted); cursor: default; }

  /* ── LAYOUT: form + preview side by side ── */
  .body-layout { display: flex; gap: 20px; align-items: flex-start; }

  /* ── FORM COLUMN ── */
  .form-column { flex: 1; display: flex; flex-direction: column; gap: 16px; min-width: 0; }

  /* ── CARD ── */
  .card {
    background: var(--white); border-radius: 14px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
    overflow: hidden;
    animation: fadeUp .35s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .card:nth-child(2) { animation-delay: .06s; }
  .card:nth-child(3) { animation-delay: .12s; }

  .card-header {
    display: flex; align-items: center; gap: 10px;
    padding: 16px 22px; border-bottom: 1px solid var(--border);
  }
  .card-header-icon {
    width: 30px; height: 30px; border-radius: 8px;
    background: var(--green-light); display: flex; align-items: center; justify-content: center;
    color: var(--green-btn); flex-shrink: 0;
  }
  .card-header h2 {
    font-family: 'Sora', sans-serif; font-size: 13.5px; font-weight: 700; color: var(--text);
  }
  .card-header p { font-size: 11.5px; color: var(--muted); margin-top: 1px; }
  .card-body { padding: 20px 22px; }

  /* ── FIELDS ── */
  .fields-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .field { display: flex; flex-direction: column; gap: 6px; }
  .field.full { grid-column: 1 / -1; }

  .field label {
    font-size: 12.5px; font-weight: 600; color: var(--text);
    display: flex; align-items: center; gap: 5px;
  }
  .required { color: var(--danger); font-size: 11px; }

  .field input[type="text"],
  .field input[type="number"],
  .field select {
    height: 42px; padding: 0 14px;
    border: 1.5px solid var(--border); border-radius: 9px;
    background: var(--input-bg); font-size: 13.5px; color: var(--text);
    font-family: 'Inter', sans-serif; outline: none; transition: border-color .2s, background .2s;
    appearance: none; -webkit-appearance: none;
  }
  .field input:focus,
  .field select:focus { border-color: var(--green-btn); background: #fff; box-shadow: 0 0 0 3px rgba(58,125,58,0.08); }
  .field input::placeholder { color: #b5bcc4; }
  .field input.error,
  .field select.error { border-color: var(--danger); background: var(--danger-soft); }

  .field-hint { font-size: 11px; color: var(--muted); }
  .field-error { font-size: 11px; color: var(--danger); display: flex; align-items: center; gap: 4px; }

  .select-wrap { position: relative; }
  .select-wrap select { width: 100%; padding-right: 36px; cursor: pointer; }
  .select-arrow { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--muted); pointer-events: none; }

  .char-count { font-size: 11px; text-align: right; margin-top: 2px; }
  .char-count.warn { color: #d97706; }
  .char-count.ok   { color: var(--muted); }

  /* ── TAG INPUT ── */
  .tag-input-wrap {
    min-height: 42px; padding: 5px 10px;
    border: 1.5px solid var(--border); border-radius: 9px;
    background: var(--input-bg); display: flex; flex-wrap: wrap; gap: 6px;
    cursor: text; transition: border-color .2s, background .2s;
  }
  .tag-input-wrap:focus-within { border-color: var(--green-btn); background: #fff; box-shadow: 0 0 0 3px rgba(58,125,58,0.08); }
  .tag {
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--green-light); border: 1px solid #c6ddc6;
    border-radius: 6px; padding: 2px 8px;
    font-size: 12px; color: var(--green-btn); font-weight: 500;
  }
  .tag button {
    background: none; border: none; cursor: pointer;
    color: var(--green-btn); font-size: 13px; line-height: 1; padding: 0;
    opacity: .6; transition: opacity .15s;
  }
  .tag button:hover { opacity: 1; }
  .tag-input {
    border: none; outline: none; background: transparent;
    font-size: 13px; font-family: 'Inter', sans-serif;
    color: var(--text); flex: 1; min-width: 80px;
  }
  .tag-input::placeholder { color: #b5bcc4; }

  /* ── VERSION BADGE PREVIEW ── */
  .version-preview {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;
    margin-top: 6px; transition: all .2s;
  }
  .version-preview.green  { background: #dcfce7; color: #166534; }
  .version-preview.yellow { background: #fef9c3; color: #854d0e; }
  .version-preview.blue   { background: #dbeafe; color: #1e40af; }

  /* ── QUILL OVERRIDES ── */
  .quill-wrapper {
    border: 1.5px solid var(--border); border-radius: 9px;
    overflow: hidden; transition: border-color .2s;
    background: #fff;
  }
  .quill-wrapper:focus-within {
    border-color: var(--green-btn);
    box-shadow: 0 0 0 3px rgba(58,125,58,0.08);
  }
  .quill-wrapper.error { border-color: var(--danger); }

  .quill-wrapper .ql-toolbar {
    border: none !important;
    border-bottom: 1px solid var(--border) !important;
    padding: 8px 12px !important;
    background: #f9fafb;
    font-family: 'Inter', sans-serif !important;
  }
  .quill-wrapper .ql-toolbar .ql-stroke { stroke: var(--muted) !important; }
  .quill-wrapper .ql-toolbar .ql-fill   { fill:   var(--muted) !important; }
  .quill-wrapper .ql-toolbar button:hover .ql-stroke,
  .quill-wrapper .ql-toolbar .ql-active .ql-stroke { stroke: var(--green-btn) !important; }
  .quill-wrapper .ql-toolbar button:hover .ql-fill,
  .quill-wrapper .ql-toolbar .ql-active .ql-fill   { fill: var(--green-btn) !important; }
  .quill-wrapper .ql-toolbar .ql-picker-label:hover,
  .quill-wrapper .ql-toolbar .ql-picker-label.ql-active { color: var(--green-btn) !important; }
  .quill-wrapper .ql-toolbar .ql-picker-label:hover .ql-stroke { stroke: var(--green-btn) !important; }

  .quill-wrapper .ql-container {
    border: none !important;
    font-family: 'Inter', sans-serif !important;
    font-size: 14px !important;
  }
  .quill-wrapper .ql-editor {
    min-height: 260px;
    max-height: 340px;
    padding: 14px 16px !important;
    color: var(--text);
    line-height: 1.7;
  }
  .quill-wrapper .ql-editor.ql-blank::before {
    color: #b5bcc4 !important;
    font-style: normal !important;
    font-size: 13.5px;
  }
  .quill-wrapper .ql-editor a { color: var(--green-btn); }

  /* word count bar */
  .editor-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 7px 14px; border-top: 1px solid var(--border);
    background: #f9fafb;
  }
  .word-count { font-size: 11px; color: var(--muted); }
  .variable-chips { display: flex; gap: 6px; flex-wrap: wrap; }
  .var-chip {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 2px 8px; border-radius: 5px;
    background: #fffbe6; border: 1px solid #f5e08a;
    font-size: 10.5px; font-weight: 600; color: #92400e;
    cursor: pointer; transition: background .15s;
    font-family: 'Courier New', monospace;
  }
  .var-chip:hover { background: #fef3c7; }

  /* ── PREVIEW COLUMN ── */
  .preview-column {
    width: 230px; flex-shrink: 0; position: sticky; top: 0;
    display: flex; flex-direction: column; gap: 12px;
    animation: fadeUp .4s ease .18s both;
  }

  .preview-card {
    background: var(--white); border-radius: 14px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06); overflow: hidden;
  }
  .preview-card-header {
    padding: 12px 16px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .preview-card-header span {
    font-family: 'Sora', sans-serif; font-size: 12px; font-weight: 700; color: var(--text);
  }
  .preview-live-dot {
    width: 7px; height: 7px; border-radius: 50%; background: #22c55e;
    box-shadow: 0 0 0 2px #dcfce7;
    animation: pulse-dot 2s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 0 2px #dcfce7; }
    50%       { box-shadow: 0 0 0 4px #bbf7d0; }
  }

  .mock-email-wrap { padding: 12px; }
  .mock-window-bar { display: flex; gap: 5px; margin-bottom: 10px; }
  .mock-dot { width: 8px; height: 8px; border-radius: 50%; }
  .mock-dot.r { background: #ef4444; }
  .mock-dot.y { background: #f5c518; }
  .mock-dot.g { background: #22c55e; }

  .mock-email {
    border: 1px solid var(--border); border-radius: 8px;
    overflow: hidden; font-size: 10px;
  }
  .mock-topbar {
    background: var(--green-dark); padding: 6px 10px;
    display: flex; align-items: center; gap: 7px;
  }
  .mock-logo {
    width: 18px; height: 18px; background: var(--yellow); border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-weight: 800; font-size: 7px; color: #1a1a1a;
  }
  .mock-top-texts .t1 { font-size: 8.5px; font-weight: 700; color: #fff; }
  .mock-top-texts .t2 { font-size: 7.5px; color: rgba(255,255,255,0.55); }

  .mock-subject {
    padding: 7px 10px; background: #f9fafb; border-bottom: 1px solid var(--border);
    font-size: 9px; color: var(--muted);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .mock-subject strong { color: var(--text); }

  .mock-body { padding: 10px; background: #fff; }
  .mock-body-content {
    font-size: 9px; color: var(--text); line-height: 1.6;
    max-height: 90px; overflow: hidden;
  }
  .mock-placeholder-lines { display: flex; flex-direction: column; gap: 5px; }
  .mock-line { height: 5px; background: #e5e7eb; border-radius: 3px; }

  .mock-footer-bar {
    padding: 7px 10px; background: #f9fafb; border-top: 1px solid var(--border);
    font-size: 8px; color: var(--muted); text-align: center;
  }

  /* stats panel */
  .stats-card { background: var(--white); border-radius: 14px; box-shadow: 0 1px 6px rgba(0,0,0,0.06); }
  .stats-card-header { padding: 12px 16px; border-bottom: 1px solid var(--border); }
  .stats-card-header span { font-family: 'Sora', sans-serif; font-size: 12px; font-weight: 700; color: var(--text); }
  .stats-list { padding: 10px 16px; display: flex; flex-direction: column; gap: 8px; }
  .stat-row { display: flex; justify-content: space-between; align-items: center; }
  .stat-row .s-label { font-size: 11.5px; color: var(--muted); }
  .stat-row .s-val   { font-size: 12px; font-weight: 600; color: var(--text); }
  .stat-row .s-val.green { color: var(--green-btn); }

  /* ── FORM ACTIONS ── */
  .form-actions {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 22px; background: var(--white);
    border-radius: 14px; box-shadow: 0 1px 6px rgba(0,0,0,0.06);
    animation: fadeUp .4s ease .22s both;
  }
  .actions-left { display: flex; gap: 10px; }
  .actions-right { display: flex; gap: 10px; }

  .btn-ghost {
    display: flex; align-items: center; gap: 6px;
    background: transparent; color: var(--muted);
    border: none; font-size: 13px; font-weight: 500;
    font-family: 'Inter', sans-serif; cursor: pointer; padding: 10px 4px;
    transition: color .18s;
  }
  .btn-ghost:hover { color: var(--danger); }

  .btn-outline {
    display: flex; align-items: center; gap: 6px;
    background: var(--white); color: var(--text);
    border: 1.5px solid var(--border); border-radius: 9px; padding: 10px 20px;
    font-size: 13px; font-weight: 500; font-family: 'Inter', sans-serif;
    cursor: pointer; transition: all .18s;
  }
  .btn-outline:hover { border-color: var(--green-btn); color: var(--green-btn); }

  .btn-primary {
    display: flex; align-items: center; gap: 7px;
    background: var(--green-btn); color: #fff;
    border: none; border-radius: 9px; padding: 10px 22px;
    font-family: 'Sora', sans-serif; font-size: 13.5px; font-weight: 600;
    cursor: pointer; transition: background .18s, transform .1s;
  }
  .btn-primary:hover { background: var(--green-hover); }
  .btn-primary:active { transform: scale(0.98); }
  .btn-primary:disabled { background: #9cbb9c; cursor: not-allowed; transform: none; }

  /* ── FOOTER ── */
  .footer {
    padding: 11px 24px; font-size: 11.5px; color: var(--muted);
    background: var(--green-light); border-top: 1px solid var(--border); flex-shrink: 0;
  }

  /* ── TOAST ── */
  .toast {
    position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%) translateY(60px);
    background: var(--green-dark); color: #fff;
    padding: 12px 22px; border-radius: 10px;
    display: flex; align-items: center; gap: 10px;
    font-size: 13.5px; font-weight: 500; font-family: 'Inter', sans-serif;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    transition: transform .3s cubic-bezier(.34,1.56,.64,1), opacity .3s;
    opacity: 0; z-index: 999; pointer-events: none;
  }
  .toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }
  .toast-icon { font-size: 16px; }
`;



export function StylesNovoTemplatePage() {
  return <style>{styles}</style>;
}