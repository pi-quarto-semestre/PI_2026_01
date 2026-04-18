const style = `

/* ── STEPPER ── */

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



  .stepper {
    display: flex; align-items: center; gap: 0;
    width: 100%;
    min-width: 0;
    background: var(--white); border-radius: 10px;
    padding: 12px 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }
  .step-item {
    display: flex;
    align-items: center;
    flex: 1 1 0;
    min-width: 0;
  }
  .step { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; }
  .step-circle {
    width: 26px; height: 26px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11.5px; font-weight: 700; flex-shrink: 0;
    font-family: 'Sora', sans-serif; border: 2px solid transparent;
  }
  .step-circle.done   { background: var(--step-done); color: #fff; border-color: var(--step-done); }
  .step-circle.active { background: var(--step-active); color: #fff; border-color: var(--step-active); }
  .step-circle.idle   { background: #fff; color: var(--muted); border-color: var(--step-idle); }

  .step-label { display: flex; flex-direction: column; min-width: 0; }
  .step-label .s-name {
    font-size: 12px; font-weight: 600;
    color: var(--text);
    line-height: 1.2;
    overflow-wrap: anywhere;
  }
  .step-label .s-sub {
    font-size: 10.5px; color: var(--muted);
    line-height: 1.25;
    overflow-wrap: anywhere;
  }
  .step.done .step-label .s-name { color: var(--step-done); }
  .step.active .step-label .s-name { color: var(--step-active); }
  .step.idle .step-label .s-name { color: var(--muted); }


  .step-line {
    flex: 1; height: 2px; background: var(--step-idle); margin: 0 10px;
    position: relative; max-width: 60px; min-width: 24px;
  }
  .step-line.done { background: var(--step-done); }
  .step-line::before {
    content: ''; position: absolute; top: 50%; left: 0; right: 0;
    border-top: 2px dashed #c9d9c9; transform: translateY(-50%);
  }
  .step-line.done::before { border-top-color: var(--step-done); border-top-style: solid; }
  
  /* ───────────────────────────── */
/* 📱 TABLET (até 1024px) */
/* ───────────────────────────── */
@media (max-width: 1024px) {

  .stepper {
    padding: 10px 12px;
  }

  .step-item {
    min-width: 0;
  }

  .step {
    gap: 6px;
  }

  .step-circle {
    width: 24px;
    height: 24px;
    font-size: 11px;
  }

  .step-label .s-name {
    font-size: 11.5px;
  }

  .step-label .s-sub {
    font-size: 10px;
  }

  .step-line {
    max-width: 40px;
    margin: 0 6px;
  }
}


/* ───────────────────────────── */
/* 📱 MOBILE (até 768px) */
/* ───────────────────────────── */
@media (max-width: 768px) {

  .stepper {
    flex-wrap: wrap;
    align-items: stretch;
    gap: 10px;
    background: transparent;
    box-shadow: none;
    padding: 0;
    overflow: visible;
  }

  .step-item {
    flex: 1 1 calc(50% - 5px);
    align-items: stretch;
    min-width: 0;
  }

  .step {
    gap: 10px;
    align-items: center;
    min-height: 72px;
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--white);
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }

  .step.done {
    border-color: rgba(58, 125, 58, 0.3);
    background: #f2faf2;
  }

  .step.active {
    border-color: var(--step-active);
    background: #eef6ee;
  }

  .step-circle {
    margin-top: 2px;
  }

  .step-line {
    display: none;
  }

  .step-label .s-name {
    font-size: 11px;
  }

  .step-label .s-sub {
    font-size: 10px;
  }
}

@media (max-width: 560px) {

  .step-item {
    flex-basis: 100%;
  }

  .step {
    min-height: 0;
  }
}


/* ───────────────────────────── */
/* 📱 SMALL MOBILE (até 480px) */
/* ───────────────────────────── */
@media (max-width: 480px) {

  .step-circle {
    width: 22px;
    height: 22px;
    font-size: 10px;
  }

  .step {
    padding: 10px;
    gap: 8px;
  }

  .step-label .s-name {
    font-size: 10.5px;
  }

  .step-label .s-sub {
    font-size: 9.5px;
  }
}
  
  `;

const STEPS = [
  { num: 1, name: "Modelo", sub: "Selecione o modelo" },
  { num: 2, name: "Variáveis", sub: "Personalize o conteúdo" },
  { num: 3, name: "Destinatários", sub: "Defina os alvos" },
  { num: 4, name: "Envio", sub: "Agende ou envie" },
];

export function Stepper({ numeroPasso = 1, completedSteps }) {
  const hasControlledProgress = Array.isArray(completedSteps);
  const completedSet = new Set(completedSteps || []);
  const firstIncompleteStep = STEPS.find(
    (step) => !completedSet.has(step.num),
  )?.num;
  const activeStep = hasControlledProgress
    ? firstIncompleteStep ?? null
    : numeroPasso;

  const stepState = (n) => {
    if (hasControlledProgress) {
      if (completedSet.has(n)) return "done";
      if (n === activeStep) return "active";
      return "idle";
    }

    if (n < numeroPasso) return "done";
    if (n === numeroPasso) return "active";
    return "idle";
  };

  return (
    <>
      <style>
        {style}
      </style>

      <div className="stepper">
        {STEPS.map((step, idx) => {
          const state = stepState(step.num);

          return (
            <div
              key={step.num}
              className="step-item"
            >
              <div
                className={`step ${state}`}
                style={{ cursor: "default" }}
              >
                <div className={`step-circle ${state}`}>
                  {state === "done" ? "✓" : step.num}
                </div>
                <div className="step-label">
                  <span className="s-name">{step.name}</span>
                  <span className="s-sub">{step.sub}</span>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`step-line ${state === "done" ? "done" : ""}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
