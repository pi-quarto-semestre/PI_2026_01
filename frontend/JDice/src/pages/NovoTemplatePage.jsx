import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import HeaderNav from "../components/HeaderNav";
import { getRoute } from "../components/navRoutes";
import { HEADER_NAV_ITEMS } from "../components/HeaderNav";
import { api } from "../../services/api";
import Footer from "../components/Footer";

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

  /* ── SIDEBAR ── */
  .sidebar {
    width: 52px; background: var(--green-dark);
    display: flex; flex-direction: column; align-items: center;
    padding: 12px 0 16px; gap: 4px; flex-shrink: 0; z-index: 10;
  }
  .sidebar-logo {
    width: 32px; height: 32px; background: var(--yellow); border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-weight: 800; font-size: 12px; color: #1a1a1a;
    margin-bottom: 18px;
  }
  .sidebar-icon {
    width: 36px; height: 36px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.45); cursor: pointer;
    border: none; background: transparent; transition: all .18s;
  }
  .sidebar-icon:hover { background: rgba(255,255,255,0.1); color: #fff; }
  .sidebar-icon.active { background: rgba(255,255,255,0.12); color: var(--yellow); }
  .sidebar-spacer { flex: 1; }

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

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const Ico = ({ d, s = 16 }) => (
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
    <path d={d} />
  </svg>
);
const GridIcon = ({ s = 16 }) => (
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
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);
const ListIcon = ({ s = 16 }) => (
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
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);
const SendIcon = ({ s = 16 }) => (
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
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const BarIcon = ({ s = 16 }) => (
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
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);
const GearIcon = ({ s = 16 }) => (
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
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
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
  "${nome_contato}",
  "${regiao}",
  "${produto}",
  "${data}",
  "${empresa}",
  "${hora}",
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
          <html>
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
      <style>{styles}</style>

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
