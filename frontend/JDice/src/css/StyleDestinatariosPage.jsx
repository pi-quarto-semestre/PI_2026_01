export function StyleDestinatariosPage(){
    const style = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gd:   #1a4a1a;
    --gbtn: #3a7d3a;
    --ghov: #2f6b2f;
    --gl:   #eef4ee;
    --yel:  #f5c518;
    --wh:   #ffffff;
    --tx:   #111827;
    --mu:   #6b7280;
    --bdr:  #e5e7eb;
    --ibg:  #f9fafb;
    --err:  #dc2626;
    --blue: #2563eb;
    --ora:  #f97316;
  }

  html, body, #root { height: 100%; font-family: 'Inter', sans-serif; background: var(--gl); color: var(--tx); }

  /* scrollbar */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

  .app { display: flex; height: 100vh; overflow: hidden; }


  /* ── MAIN ── */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }



  /* ── SCROLL AREA ── */
  .scroll-area { flex: 1; overflow-y: auto; padding: 22px 22px 36px; display: flex; flex-direction: column; gap: 16px; }

  /* ── PAGE HEADER ── */
  .pg-header h1 { font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 800; color: var(--tx); }
  .pg-header .pg-sub { font-size: 12px; color: var(--mu); margin-top: 3px; }


  /* ── BODY ROW ── */
  .body-row { display: flex; gap: 18px; align-items: flex-start; }
  .form-col  { flex: 1; display: flex; flex-direction: column; gap: 14px; min-width: 0; }
  .aside-col { width: 248px; flex-shrink: 0; display: flex; flex-direction: column; gap: 12px; position: sticky; top: 0; }

  /* ── SECTION CARD ── */
  .sec-card { background: var(--wh); border-radius: 14px; box-shadow: 0 1px 5px rgba(0,0,0,0.06); overflow: hidden; }
  .sec-card-body { padding: 20px 22px; display: flex; flex-direction: column; gap: 15px; }

  .sec-num {
    display: flex; align-items: center; gap: 2px;
    padding: 3px 0 13px; border-bottom: 1px solid var(--bdr); margin-bottom: 2px;
  }
  .sec-num .num {
    width: 22px; height: 22px; border-radius: 50%;
    background: var(--gbtn); color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif; font-size: 10.5px; font-weight: 700;
    margin-right: 8px; flex-shrink: 0;
  }
  .sec-num h2 { font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 700; color: var(--tx); }

  /* ── FIELD ── */
  .field { display: flex; flex-direction: column; gap: 5px; }
  .field label { font-size: 12.5px; font-weight: 600; color: var(--tx); display: flex; align-items: center; gap: 5px; }
  .req { color: var(--err); font-size: 11px; }
  .field-hint { font-size: 11px; color: var(--mu); }
  .field-err  { font-size: 11px; color: var(--err); }

  /* two-col */
  .fields-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  /* ── TAG INPUT ── */
  .tag-field {
    min-height: 44px; padding: 6px 10px;
    border: 1.5px solid var(--bdr); border-radius: 10px;
    background: var(--ibg); display: flex; flex-wrap: wrap; gap: 6px;
    cursor: text; transition: border-color .2s, background .2s, box-shadow .2s;
  }
  .tag-field:focus-within {
    border-color: var(--gbtn); background: #fff;
    box-shadow: 0 0 0 3px rgba(58,125,58,0.1);
  }
  .tag-field.err { border-color: var(--err); }
  .chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 7px;
    font-size: 12px; font-weight: 500; white-space: nowrap;
  }
  .chip.list { background: var(--gl); border: 1px solid #c5d9c5; color: var(--gbtn); }
  .chip.email { background: #eff6ff; border: 1px solid #bfdbfe; color: var(--blue); }
  .chip-rm {
    background: none; border: none; cursor: pointer; padding: 0;
    font-size: 14px; line-height: 1; opacity: .55; transition: opacity .15s;
    color: inherit;
  }
  .chip-rm:hover { opacity: 1; }
  .chip-icon { font-size: 12px; }
  .tag-input-raw {
    border: none; outline: none; background: transparent;
    font-size: 13px; font-family: 'Inter', sans-serif; color: var(--tx);
    flex: 1; min-width: 140px;
  }
  .tag-input-raw::placeholder { color: #b0b7c0; }

  /* autocomplete dropdown */
  .ac-wrap { position: relative; }
  .ac-drop {
    position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 50;
    background: var(--wh); border: 1.5px solid var(--bdr); border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1); overflow: hidden;
  }
  .ac-item {
    padding: 9px 14px; cursor: pointer; font-size: 13px; display: flex; align-items: center; gap: 8px;
    transition: background .12s;
  }
  .ac-item:hover { background: var(--gl); }
  .ac-item .ai-label { font-weight: 500; }
  .ac-item .ai-sub   { font-size: 11px; color: var(--mu); margin-left: auto; }

  /* ── SELECT ── */
  .sel-wrap { position: relative; }
  .sel-wrap select {
    width: 100%; height: 42px; padding: 0 36px 0 12px;
    border: 1.5px solid var(--bdr); border-radius: 10px;
    background: var(--ibg); font-size: 13.5px; color: var(--tx);
    font-family: 'Inter', sans-serif; outline: none; appearance: none;
    cursor: pointer; transition: border-color .2s, background .2s, box-shadow .2s;
  }
  .sel-wrap select:focus {
    border-color: var(--gbtn); background: #fff;
    box-shadow: 0 0 0 3px rgba(58,125,58,0.1);
  }
  .sel-arr { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: var(--mu); pointer-events: none; }

  /* ── INPUT ── */
  .std-input {
    height: 42px; padding: 0 12px;
    border: 1.5px solid var(--bdr); border-radius: 10px;
    background: var(--ibg); font-size: 13.5px; color: var(--tx);
    font-family: 'Inter', sans-serif; outline: none;
    transition: border-color .2s, background .2s, box-shadow .2s;
    width: 100%;
  }
  .std-input:focus {
    border-color: var(--gbtn); background: #fff;
    box-shadow: 0 0 0 3px rgba(58,125,58,0.1);
  }
  .std-input:disabled { background: #f3f4f6; color: var(--mu); cursor: not-allowed; }
  .std-input::placeholder { color: #b0b7c0; }

  /* date/time input */
  input[type="date"], input[type="time"] {
    height: 42px; padding: 0 12px;
    border: 1.5px solid var(--bdr); border-radius: 10px;
    background: var(--ibg); font-size: 13.5px; color: var(--tx);
    font-family: 'Inter', sans-serif; outline: none; width: 100%;
    transition: border-color .2s, background .2s, box-shadow .2s;
  }
  input[type="date"]:focus, input[type="time"]:focus {
    border-color: var(--gbtn); background: #fff;
    box-shadow: 0 0 0 3px rgba(58,125,58,0.1);
  }

  /* ── SCHEDULE OPTIONS ── */
  .sched-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .sched-opt {
    border: 1.5px solid var(--bdr); border-radius: 12px; padding: 14px 16px;
    cursor: pointer; display: flex; align-items: flex-start; gap: 11px;
    transition: border-color .2s, background .2s; background: var(--ibg);
  }
  .sched-opt.sel { border-color: var(--gbtn); background: #f0f7f0; }
  .sched-opt .radio {
    width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0;
    border: 2px solid var(--bdr); margin-top: 2px;
    display: flex; align-items: center; justify-content: center;
    transition: border-color .2s;
  }
  .sched-opt.sel .radio { border-color: var(--gbtn); }
  .radio-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gbtn); }
  .sched-opt .opt-title { font-size: 13px; font-weight: 600; color: var(--tx); }
  .sched-opt .opt-sub   { font-size: 11px; color: var(--mu); margin-top: 2px; }

  .sched-fields { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-top: 4px; }

  /* ── FORM NAV ── */
  .form-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 22px; background: var(--wh); border-radius: 14px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.06);
  }
  .btn-back {
    display: flex; align-items: center; gap: 6px;
    background: none; border: 1.5px solid var(--bdr); border-radius: 9px;
    padding: 9px 18px; font-size: 13px; font-weight: 500; font-family: 'Inter', sans-serif;
    color: var(--tx); cursor: pointer; transition: all .18s;
  }
  .btn-back:hover { border-color: var(--gbtn); color: var(--gbtn); }

  /* ── SUMMARY CARD ── */
  .summary-card {
    background: var(--gd); border-radius: 14px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15); overflow: hidden;
    
  }
  .sum-header {
    padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.1);
    font-family: 'Sora', sans-serif; font-size: 12.5px; font-weight: 700; color: #fff;
  }
  .sum-body { padding: 14px 18px; display: flex; flex-direction: column; gap: 14px;=}
  .sum-block { display: flex; flex-direction: column; gap: 4px; }
  .sum-block-label {
    font-size: 9.5px; font-weight: 700; letter-spacing: 0.8px;
    text-transform: uppercase; color: rgba(255,255,255,0.45);
  }
  .sum-block-title { font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 700; color: #fff; }
  .sum-block-sub   { font-size: 11px; color: rgba(255,255,255,0.6); line-height: 1.5; }
  .sum-block-sub.highlight { color: var(--yel); font-weight: 600; }
  .sum-var {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; color: rgba(255,255,255,0.75); margin: 2px 0;
  }
  .sum-var code {
    font-family: 'Courier New', monospace; font-size: 10px;
    background: rgba(255,255,255,0.1); padding: 1px 5px; border-radius: 4px; color: #fff;
  }
  .sum-var .arrow { color: var(--yel); font-size: 11px; }
  .sum-var .val   { color: var(--yel); font-weight: 600; }

  .sum-divider { border: none; border-top: 1px solid rgba(255,255,255,0.1); }

  .sum-delivery {
    background: rgba(255,255,255,0.07); border-radius: 10px;
    padding: 11px 14px; display: flex; flex-direction: column; gap: 3px;
  }
  .sum-delivery .sd-label { font-size: 10px; font-weight: 600; letter-spacing: 0.5px; color: rgba(255,255,255,0.5); text-transform: uppercase; }
  .sum-delivery .sd-main  { font-size: 12px; font-weight: 600; color: #fff; }
  .sum-delivery .sd-sub   { font-size: 10.5px; color: rgba(255,255,255,0.55); }

  .sum-actions { padding: 14px 18px; display: flex; flex-direction: column; gap: 8px; border-top: 1px solid rgba(255,255,255,0.1); }
  .btn-draft {
    width: 100%; padding: 10px; border-radius: 9px;
    border: 1.5px solid rgba(255,255,255,0.25); background: transparent;
    color: #fff; font-size: 13px; font-weight: 500; font-family: 'Inter', sans-serif;
    cursor: pointer; transition: background .18s;
  }
  .btn-draft:hover { background: rgba(255,255,255,0.08); }
  .btn-confirm {
    width: 20%; padding: 11px; border-radius: 9px;
    border: none; background: var(--yel);
    color: #1a1a1a; font-family: 'Sora', sans-serif; font-size: 13.5px; font-weight: 700;
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px;
    transition: background .18s, transform .1s;
  }
  .btn-confirm:hover { background: #e6b800; }
  .btn-confirm:active { transform: scale(0.98); }
  .sum-fine-print { font-size: 10px; color: rgba(255,255,255,0.35); text-align: center; }

  /* ── TOAST ── */
  .toast {
    position: fixed; bottom: 28px; left: 50%;
    transform: translateX(-50%) translateY(60px);
    background: #111827; color: #fff;
    padding: 12px 22px; border-radius: 12px;
    display: flex; align-items: center; gap: 10px;
    font-size: 13.5px; font-family: 'Inter', sans-serif; font-weight: 500;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    transition: transform .35s cubic-bezier(.34,1.4,.64,1), opacity .3s;
    opacity: 0; z-index: 9999; pointer-events: none; white-space: nowrap;
  }
  .toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }


  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .body-row { flex-direction: column; }
    .aside-col { width: 100%; position: static; }
    .sched-fields { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 770px){
    .btn-confirm {width:100%}
  }

  @media (max-width: 640px) {
    .sched-options { grid-template-columns: 1fr; }
    .fields-2col { grid-template-columns: 1fr; }
    .sched-fields { grid-template-columns: 1fr; }
    .sidebar { display: none; }
    
  }
`;

return(
    <style>{style}</style>
)
}