const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green-dark: #1a4a1a;
    --green-mid:  #2d6a2d;
    --green-btn:  #3a7d3a;
    --green-light:#eef4ee;
    --yellow:     #f5c518;
    --white:      #ffffff;
    --text:       #1a1a1a;
    --muted:      #6b7280;
    --border:     #e5e7eb;
    --row-hover:  #f9fafb;
    --sidebar-w:  52px;
    --topbar-h:   52px;
  }

  html, body, #root { height: 100%; font-family: 'Inter', sans-serif; background: var(--green-light); }

  .app { display: flex; height: 100vh; overflow: hidden; }


  /* ── MAIN ── */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

  /* ── TOPBAR ── */
  .topbar {
    height: var(--topbar-h); background: var(--green-dark);
    display: flex; align-items: center; padding: 0 24px; flex-shrink: 0;
  }
  .topbar-brand { display: flex; flex-direction: column; margin-right: 40px; }
  .topbar-brand .brand-name {
    font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 700; color: #fff; line-height: 1.2;
  }
  .topbar-brand .brand-sub {
    font-size: 9px; font-weight: 600; letter-spacing: 1.2px;
    color: rgba(255,255,255,0.5); text-transform: uppercase;
  }
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
  .topbar-user .user-info { text-align: right; }
  .topbar-user .user-name { font-size: 12px; font-weight: 600; color: #fff; }
  .topbar-user .user-role { font-size: 10.5px; color: rgba(255,255,255,0.55); }
  .user-avatar {
    width: 32px; height: 32px; background: var(--yellow); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-size: 11px; font-weight: 700; color: #1a1a1a;
  }

  /* ── CONTENT ── */
  .content { flex: 1; overflow-y: auto; padding: 24px 28px 28px; display: flex; flex-direction: column; gap: 18px; }

  /* ── PAGE HEADER ── */
  .page-header { display: flex; align-items: flex-start; justify-content: space-between; }
  .page-header h1 {
    font-family: 'Sora', sans-serif; font-size: 21px; font-weight: 800; color: var(--text); line-height: 1.2;
  }
  .page-header .page-sub { font-size: 12.5px; color: var(--muted); margin-top: 3px; }
  .header-actions { display: flex; gap: 10px; align-items: center; }

  .btn-secondary {
    display: flex; align-items: center; gap: 6px;
    background: var(--white); color: var(--text);
    border: 1.5px solid var(--border); border-radius: 9px;
    padding: 9px 18px; font-size: 13px; font-weight: 500;
    font-family: 'Inter', sans-serif; cursor: pointer; transition: border-color .18s;
  }
  .btn-secondary:hover { border-color: var(--green-btn); color: var(--green-btn); }

  .btn-primary {
    display: flex; align-items: center; gap: 6px;
    background: var(--green-btn); color: #fff;
    border: none; border-radius: 9px; padding: 9px 18px;
    font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 600;
    cursor: pointer; transition: background .18s;
  }
  .btn-primary:hover { background: #2f6b2f; }

  /* ── TOOLBAR ── */
  .toolbar { display: flex; align-items: center; gap: 10px; }

  .search-wrap { position: relative; flex: 0 0 260px; }
  .search-wrap input {
    width: 100%; height: 38px; padding: 0 14px 0 36px;
    border: 1.5px solid var(--border); border-radius: 9px;
    background: var(--white); font-size: 13px; color: var(--text);
    font-family: 'Inter', sans-serif; outline: none; transition: border-color .2s;
  }
  .search-wrap input:focus { border-color: var(--green-btn); }
  .search-wrap input::placeholder { color: #b0b7c0; }
  .search-icon {
    position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
    color: #9ca3af; pointer-events: none;
  }

  .filter-btn {
    height: 38px; padding: 0 14px; display: flex; align-items: center; gap: 5px;
    border: 1.5px solid var(--border); border-radius: 9px; background: var(--white);
    font-size: 13px; color: var(--text); cursor: pointer; font-family: 'Inter', sans-serif;
    transition: border-color .18s;
  }
  .filter-btn:hover { border-color: var(--green-btn); }

  .toolbar-spacer { flex: 1; }

  .view-toggle { display: flex; gap: 2px; }
  .view-btn {
    width: 36px; height: 36px; border-radius: 8px; border: 1.5px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    background: var(--white); color: var(--muted); cursor: pointer; transition: all .18s;
  }
  .view-btn.active { background: var(--green-light); border-color: var(--green-btn); color: var(--green-btn); }

  /* ── TABLE ── */
  .table-wrap {
    background: var(--white); border-radius: 14px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
    display: flex; flex-direction: column; max-height: 600px; overflow: hidden;
  }

  table { width: 100%; border-collapse: collapse; font-size: 13px; overflow:auto}

  .table-wrap table {
    display: flex;
    flex-direction: column;
  }

  .table-wrap thead {
    flex-shrink: 0;
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  .table-wrap tbody {
    display: block;
    overflow-y: auto;
    flex: 1;
  }

  .table-wrap tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  thead tr { background: var(--green-btn); }
  thead th {
    padding: 11px 14px; text-align: left;
    font-size: 10.5px; font-weight: 600; letter-spacing: 0.7px;
    text-transform: uppercase; color: rgba(255,255,255,0.9);
    white-space: nowrap;
  }

  .table-wrap tbody tr { border-bottom: 1px solid var(--border); transition: background .15s; }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: var(--row-hover); }
  tbody tr.sub-row { background: #f9fafb; }
  tbody tr.sub-row:hover { background: #f3f4f6; }

  tbody td { padding: 11px 14px; vertical-align: middle; }

  /* model name cell */
  .model-cell { display: flex; align-items: center; gap: 10px; }
  .model-thumb {
    width: 34px; height: 34px; border-radius: 8px;
    background: var(--green-light); display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .model-thumb.sub {
    width: 28px; height: 28px; background: #f0f0f0; border-radius: 6px; font-size: 12px;
  }
  .model-name-text { font-weight: 600; color: var(--text); font-size: 13px; }
  .model-file { font-size: 11px; color: var(--muted); margin-top: 1px; }

  .expand-btn {
    background: none; border: none; cursor: pointer; color: var(--muted);
    display: flex; align-items: center; padding: 2px;
    transition: color .15s;
  }
  .expand-btn:hover { color: var(--text); }
  .expand-btn.open { color: var(--green-btn); }

  /* version tags */
  .version-tags { display: flex; gap: 5px; flex-wrap: wrap; }
  .vtag {
    padding: 2px 8px; border-radius: 20px; font-size: 10.5px; font-weight: 600;
    font-family: 'Inter', sans-serif; cursor: pointer;
  }
  .vtag.grey   { background: #f3f4f6; color: var(--muted); }
  .vtag.green  { background: #dcfce7; color: #166534; }
  .vtag.yellow { background: #fef9c3; color: #854d0e; }
  .vtag.blue   { background: #dbeafe; color: #1e40af; }

  .current-badge {
    font-size: 13px; font-weight: 600; color: var(--text);
  }

  /* status badge */
  .status-badge {
    display: inline-block; padding: 3px 10px; border-radius: 20px;
    font-size: 11.5px; font-weight: 600;
  }
  .status-badge.ativa   { background: #dcfce7; color: #166534; }
  .status-badge.inativa { background: #f3f4f6; color: var(--muted); }

  /* actions cell */
  .actions-cell { display: flex; align-items: center; gap: 10px; }
  .act-link {
    font-size: 12.5px; font-weight: 500; cursor: pointer;
    background: none; border: none; font-family: 'Inter', sans-serif;
    transition: color .15s; padding: 0;
  }
  .act-link.green { color: var(--green-btn); }
  .act-link.green:hover { text-decoration: underline; }
  .act-link.grey  { color: var(--muted); }
  .act-link.grey:hover  { color: var(--text); }
  .act-more {
    width: 24px; height: 24px; border-radius: 6px; border: none;
    background: transparent; cursor: pointer; display: flex; align-items: center;
    justify-content: center; color: var(--muted); transition: background .15s;
  }
  .act-more:hover { background: var(--border); color: var(--text); }

  /* sub-row details */
  .sub-date { font-size: 12px; color: var(--muted); }
  .sub-desc { font-size: 11px; color: #9ca3af; margin-top: 1px; }

  /* ── PAGINATION ── */
  .table-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px; border-top: 1px solid var(--border);
    font-size: 12.5px; color: var(--muted);
  }
  .pagination { display: flex; gap: 4px; align-items: center; }
  .page-btn {
    width: 30px; height: 30px; border-radius: 7px; border: 1.5px solid var(--border);
    background: var(--white); font-size: 12.5px; color: var(--muted);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all .18s; font-family: 'Inter', sans-serif;
  }
  .page-btn:hover { border-color: var(--green-btn); color: var(--green-btn); }
  .page-btn.active { background: var(--green-btn); border-color: var(--green-btn); color: #fff; font-weight: 600; }

  /* ── DROP ZONE ── */
  .dropzone {
    border: 2px dashed var(--border); border-radius: 14px;
    padding: 36px 20px; text-align: center;
    background: var(--white); cursor: pointer; transition: border-color .2s, background .2s;
  }
  .dropzone:hover { border-color: var(--green-btn); background: #f4faf4; }
  .dropzone-icon { color: #c7cfd8; margin-bottom: 10px; }
  .dropzone-text { font-size: 13px; color: var(--muted); }
  .dropzone-text a { color: var(--green-btn); font-weight: 600; text-decoration: none; cursor: pointer; }
  .dropzone-sub { font-size: 11.5px; color: #b0b7c0; margin-top: 4px; }

  /* ───────────────────────────── */
/* 📱 TABLET (até 1024px) */
/* ───────────────────────────── */
@media (max-width: 1024px) {

  .content {
    padding: 20px;
  }

  .page-header h1 {
    font-size: 19px;
  }

  .search-wrap {
    flex: 0 0 200px;
  }

  .table-wrap {
    max-height: none;
  }
}


/* ───────────────────────────── */
/* 📱 MOBILE (até 768px) */
/* ───────────────────────────── */
@media (max-width: 768px) {

  /* CONTENT */
  .content {
    padding: 16px;
    gap: 14px;
  }

  /* HEADER */
  .page-header {
    flex-direction: column;
    gap: 10px;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .btn-primary,
  .btn-secondary {
    flex: 1;
    justify-content: center;
  }

  /* TOOLBAR */
  .toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .search-wrap {
    width: 100%;
    flex: none;
  }

  .filter-btn {
    width: 100%;
    justify-content: center;
  }

  .toolbar-spacer {
    display: none;
  }

  .view-toggle {
    justify-content: center;
  }

  /* TABLE */
  .table-wrap {
    overflow-x: auto;
  }

  table {
    min-width: 700px; /* força scroll horizontal */
  }

  .table-footer {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }

  /* MODEL CELL */
  .model-name-text {
    font-size: 12px;
  }

  .model-file {
    font-size: 10px;
  }

  /* ACTIONS */
  .actions-cell {
    gap: 6px;
  }

  .act-link {
    font-size: 11.5px;
  }

  /* DROPZONE */
  .dropzone {
    padding: 24px 16px;
  }

  .dropzone-text {
    font-size: 12.5px;
  }
}


/* ───────────────────────────── */
/* 📱 SMALL MOBILE (até 480px) */
/* ───────────────────────────── */
@media (max-width: 480px) {

  .page-header h1 {
    font-size: 17px;
  }

  .page-header .page-sub {
    font-size: 11.5px;
  }

  .btn-primary,
  .btn-secondary {
    font-size: 12px;
    padding: 8px 12px;
  }

  .search-wrap input {
    height: 36px;
    font-size: 12px;
  }

  .filter-btn {
    height: 36px;
    font-size: 12px;
  }

  .view-btn {
    width: 34px;
    height: 34px;
  }

  .table-footer {
    font-size: 11.5px;
  }
}

`;

export function StylesModelosPage() {
  return <style>{styles}</style>;
}
