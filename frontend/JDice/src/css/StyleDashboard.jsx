const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green-dark: #1a4a1a;
    --green-mid: #2d6a2d;
    --green-btn: #3a7d3a;
    --green-light: #eef4ee;
    --yellow: #f5c518;
    --yellow-soft: #fffbe6;
    --blue-tag: #2563eb;
    --orange: #f97316;
    --white: #ffffff;
    --text: #1a1a1a;
    --muted: #6b7280;
    --border: #e5e7eb;
    --sidebar-w: 52px;
    --topbar-h: 52px;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    font-family: 'Inter', sans-serif;
    background: var(--green-light);
  }
  body { overflow-x: hidden; }

  /* ── LAYOUT ── */
  .app {
    display: flex;
    height: 100vh;
    height: 100svh;
    min-height: 100vh;
    min-height: 100svh;
    overflow: hidden;
  }

  /* ── MAIN ── */
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
  }

  /* ── TOPBAR ── */
  .topbar {
    height: var(--topbar-h);
    background: var(--green-dark);
    display: flex; align-items: center;
    padding: 0 24px;
    gap: 0;
    flex-shrink: 0;
  }

  .topbar-brand {
    display: flex; flex-direction: column;
    margin-right: 40px;
  }
  .topbar-brand .brand-name {
    font-family: 'Sora', sans-serif;
    font-size: 13px; font-weight: 700;
    color: #fff; line-height: 1.2;
  }
  .topbar-brand .brand-sub {
    font-size: 9px; font-weight: 600;
    letter-spacing: 1.2px;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
  }

  .topbar-nav { display: flex; align-items: center; gap: 4px; flex: 1; }

  .nav-link {
    padding: 6px 16px;
    font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,0.65);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: color 0.16s;
    background: none; border-top: none; border-left: none; border-right: none;
    font-family: 'Inter', sans-serif;
  }
  .nav-link:hover { color: #fff; }
  .nav-link.active {
    color: #fff;
    border-bottom-color: var(--yellow);
  }

  .topbar-user {
    display: flex; align-items: center; gap: 10px;
    margin-left: auto;
  }
  .topbar-user .user-info { text-align: right; }
  .topbar-user .user-name {
    font-size: 12px; font-weight: 600; color: #fff;
  }
  .topbar-user .user-role {
    font-size: 10.5px; color: rgba(255,255,255,0.55);
  }
  .user-avatar {
    width: 32px; height: 32px;
    background: var(--yellow);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif;
    font-size: 11px; font-weight: 700; color: #1a1a1a;
    flex-shrink: 0;
  }

  /* ── CONTENT ── */
  .content {
    flex: 1;
    min-width: 0;
    overflow-y: auto;
    padding: 28px 32px 32px;
  }

  /* ── PAGE HEADER ── */
  .page-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .page-header h1 {
    font-family: 'Sora', sans-serif;
    font-size: 22px; font-weight: 800; color: var(--text);
    line-height: 1.2;
  }
  .page-header .page-date {
    font-size: 12.5px; color: var(--muted); margin-top: 3px;
  }

  .btn-primary {
    display: flex; align-items: center; gap: 7px;
    justify-content: center;
    background: var(--green-btn);
    color: #fff;
    border: none; border-radius: 9px;
    padding: 10px 20px;
    font-family: 'Sora', sans-serif;
    font-size: 13px; font-weight: 600;
    cursor: pointer;
    transition: background 0.18s;
    flex-shrink: 0;
  }
  .btn-primary:hover { background: #2f6b2f; }

  /* ── STAT CARDS ── */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px;
    margin-bottom: 28px;
  }

  .stat-card {
    background: var(--white);
    border-radius: 14px;
    padding: 18px 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  }
  .stat-card.green {
    background: var(--green-btn);
  }

  .stat-label {
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .stat-card.green .stat-label { color: rgba(255,255,255,0.75); }

  .stat-value {
    font-family: 'Sora', sans-serif;
    font-size: 32px; font-weight: 800;
    color: var(--text); line-height: 1;
    margin-bottom: 6px;
  }
  .stat-card.green .stat-value { color: #fff; }

  .stat-sub {
    font-size: 11.5px; color: var(--green-btn); font-weight: 500;
  }
  .stat-card.green .stat-sub { color: var(--yellow); }

  .stat-icon {
    position: absolute; top: 16px; right: 16px;
    color: #d1d5db; opacity: 0.7;
  }
  .stat-card.green .stat-icon { color: rgba(255,255,255,0.3); opacity: 1; }

  /* ── SECTION HEADER ── */
  .section-header {
    display: flex; align-items: baseline; justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 6px;
  }
  .section-header h2 {
    font-family: 'Sora', sans-serif;
    font-size: 15px; font-weight: 700; color: var(--text);
  }
  .section-header .see-all {
    font-size: 12.5px; color: var(--green-btn); font-weight: 500;
    cursor: pointer; background: none; border: none;
    font-family: 'Inter', sans-serif;
  }
  .section-header .see-all:hover { text-decoration: underline; }
  .section-sub {
    font-size: 12px; color: var(--muted); margin-bottom: 16px;
  }

  /* ── MODEL CARDS ── */
  .model-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 14px;
    margin-bottom: 28px;
  }

  .model-card {
    background: var(--white);
    border-radius: 14px;
    padding: 18px 20px 16px;
    border-top: 3px solid transparent;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
    display: flex; flex-direction: column;
    gap: 0;
  }
  .model-card.green-top  { border-top-color: var(--green-btn); }
  .model-card.yellow-top { border-top-color: var(--yellow); }
  .model-card.blue-top   { border-top-color: var(--blue-tag); }

  .model-card-header {
    display: flex; align-items: flex-start; gap: 12px;
    margin-bottom: 14px;
  }

  .model-icon-wrap {
    width: 40px; height: 40px;
    background: var(--green-light);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-size: 20px;
  }

  .model-meta { flex: 1; }
  .model-name {
    font-family: 'Sora', sans-serif;
    font-size: 13.5px; font-weight: 700; color: var(--text);
    display: flex; align-items: center; gap: 7px; flex-wrap: wrap;
  }
  .version-tag {
    font-size: 10px; font-weight: 600;
    padding: 2px 7px; border-radius: 20px;
    font-family: 'Inter', sans-serif;
  }
  .version-tag.green { background: #dcfce7; color: #166534; }
  .version-tag.yellow { background: #fef9c3; color: #854d0e; }
  .version-tag.blue   { background: #dbeafe; color: #1e40af; }

  .model-category {
    font-size: 11.5px; color: var(--muted); margin-top: 2px;
  }

  .model-card-divider {
    border: none; border-top: 1px solid var(--border);
    margin: 10px 0 12px;
  }

  .model-info-row {
    display: flex; flex-direction: column; gap: 3px;
    margin-bottom: 14px;
  }
  .model-info-row span {
    font-size: 11.5px; color: var(--muted);
  }
  .model-info-row span strong { color: var(--text); font-weight: 500; }

  .model-card-actions {
    display: flex;
    gap: 10px;
    margin-top: auto;
    flex-wrap: wrap;
  }

  .btn-use {
    flex: 1;
    min-width: 120px;
    background: var(--green-btn);
    color: #fff;
    border: none; border-radius: 8px;
    padding: 8px 0;
    font-size: 12.5px; font-weight: 600;
    font-family: 'Inter', sans-serif;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.18s;
  }
  .btn-use:hover { background: #2f6b2f; }

  .btn-view {
    flex: 1;
    min-width: 120px;
    background: transparent;
    color: var(--text);
    border: 1.5px solid var(--border);
    border-radius: 8px;
    padding: 8px 0;
    font-size: 12.5px; font-weight: 500;
    font-family: 'Inter', sans-serif;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.18s;
  }
  .btn-view:hover { border-color: var(--green-btn); color: var(--green-btn); }

  /* ── SCHEDULED TABLE ── */
  .table-card {
    background: var(--white);
    border-radius: 14px;
    overflow-x: auto;
    overflow-y: hidden;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06);
  }

  table {
    width: 100%;
    min-width: 760px;
    border-collapse: collapse;
    font-size: 13px;
  }

  thead tr {
    background: #f9fafb;
    border-bottom: 1px solid var(--border);
  }

  thead th {
    padding: 11px 16px;
    text-align: left;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--muted);
  }

  tbody tr {
    border-bottom: 1px solid var(--border);
    transition: background 0.15s;
  }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: #f9fafb; }

  tbody td { padding: 13px 16px; vertical-align: middle; }
  .cell-muted { color: #4b5563; font-size: 13px; }

  .row-indicator {
    display: flex; align-items: flex-start; gap: 8px;
  }
  .dot {
    width: 7px; height: 7px; border-radius: 50%;
    margin-top: 5px; flex-shrink: 0;
  }
  .dot.green { background: var(--green-btn); }
  .dot.yellow { background: var(--yellow); }
  .dot.blue   { background: var(--blue-tag); }

  .row-name { font-weight: 600; color: var(--text); font-size: 13px; }
  .row-sub  { font-size: 11px; color: var(--muted); margin-top: 1px; }

  .badge-agendado {
    display: inline-block;
    background: #fff7ed;
    color: var(--orange);
    border: 1px solid #fed7aa;
    border-radius: 20px;
    padding: 3px 10px;
    font-size: 11.5px; font-weight: 600;
  }

  .actions-cell { display: flex; gap: 14px; flex-wrap: wrap; }

  .act-edit {
    font-size: 12.5px; color: var(--green-btn); font-weight: 500;
    cursor: pointer; background: none; border: none;
    font-family: 'Inter', sans-serif;
  }
  .act-edit:hover { text-decoration: underline; }

  .act-cancel {
    font-size: 12.5px; color: #dc2626; font-weight: 500;
    cursor: pointer; background: none; border: none;
    font-family: 'Inter', sans-serif;
  }
  .act-cancel:hover { text-decoration: underline; }

  @media (max-width: 1200px) {
    .content {
      padding: 24px;
    }

    .stat-value {
      font-size: 28px;
    }
  }

  @media (max-width: 1024px) {
    .content {
      padding: 22px 20px 24px;
    }

    .page-header h1 {
      font-size: 20px;
    }

    .page-header .page-date,
    .section-sub {
      font-size: 12px;
    }

    .stat-card,
    .model-card {
      padding: 16px 18px;
    }

    .table-card {
      border-radius: 12px;
    }
  }

  @media (max-width: 768px) {
    .app {
      height: auto;
      min-height: 100vh;
      min-height: 100svh;
      overflow: visible;
    }

    .main {
      min-height: 100vh;
      min-height: 100svh;
    }

    .content {
      padding: 18px 16px 96px;
    }

    .page-header {
      align-items: stretch;
      margin-bottom: 20px;
    }

    .page-header > div,
    .btn-primary {
      width: 100%;
    }

    .btn-primary {
      min-height: 44px;
    }

    .section-header {
      align-items: flex-start;
      margin-bottom: 8px;
    }

    .section-header .see-all {
      padding: 0;
    }

    .stat-grid,
    .model-grid {
      gap: 12px;
      margin-bottom: 24px;
    }

    .stat-card {
      min-height: 132px;
    }

    .stat-value {
      font-size: 26px;
    }

    .model-name {
      font-size: 13px;
    }

    .model-card-actions {
      gap: 8px;
    }

    .btn-use,
    .btn-view {
      min-height: 42px;
    }

    table {
      min-width: 680px;
    }

    thead th,
    tbody td {
      padding-left: 14px;
      padding-right: 14px;
    }
  }

  @media (max-width: 560px) {
    .content {
      padding: 16px 14px 92px;
    }

    .page-header h1 {
      font-size: 18px;
    }

    .topbar-user .user-info {
      display: none;
    }

    .stat-grid,
    .model-grid {
      grid-template-columns: 1fr;
    }

    .stat-card {
      min-height: auto;
    }

    .stat-card,
    .model-card {
      padding: 15px 16px;
      border-radius: 12px;
    }

    .stat-icon {
      top: 14px;
      right: 14px;
      transform: scale(0.9);
      transform-origin: top right;
    }

    .model-card-header {
      gap: 10px;
      margin-bottom: 12px;
    }

    .model-icon-wrap {
      width: 36px;
      height: 36px;
      font-size: 18px;
    }

    .model-card-actions {
      flex-direction: column;
    }

    .btn-use,
    .btn-view {
      width: 100%;
      min-width: 0;
    }

    .table-card {
      background: transparent;
      box-shadow: none;
      overflow: visible;
    }

    table,
    tbody,
    tr,
    td {
      display: block;
      width: 100%;
    }

    thead {
      display: none;
    }

    table {
      min-width: 0;
      border-collapse: separate;
    }

    tbody {
      display: grid;
      gap: 12px;
    }

    tbody tr {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 14px;
      box-shadow: 0 1px 6px rgba(0,0,0,0.06);
    }

    tbody td {
      padding: 0;
      border: none;
    }

    tbody td + td {
      margin-top: 12px;
    }

    tbody td::before {
      content: attr(data-label);
      display: block;
      margin-bottom: 4px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.7px;
      text-transform: uppercase;
      color: var(--muted);
    }

    tbody td:first-child::before {
      margin-bottom: 8px;
    }

    .row-indicator {
      gap: 10px;
    }

    .row-name {
      font-size: 12.5px;
    }

    .row-sub,
    .cell-muted {
      font-size: 11.5px;
    }

    .actions-cell {
      gap: 12px;
    }
  }

`;

export function StyleDashboard() {
  return <style>{styles}</style>;
}
