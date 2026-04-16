import { useState } from "react";

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
  
  /* ───────────────────────────── */
/* 📱 TABLET (até 1024px) */
/* ───────────────────────────── */
@media (max-width: 1024px) {

  .stepper {
    padding: 10px 12px;
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
    overflow-x: auto;
    padding: 10px;
    gap: 8px;
  }

  .stepper::-webkit-scrollbar {
    display: none;
  }

  .step {
    flex: none;
    min-width: 140px; /* garante leitura */
  }

  .step-line {
    display: none; /* remove linhas (polui no mobile) */
  }

  .step-label {
    flex-direction: column;
  }

  .step-label .s-name {
    font-size: 11px;
  }

  .step-label .s-sub {
    display: none; /* simplifica */
  }
}


/* ───────────────────────────── */
/* 📱 SMALL MOBILE (até 480px) */
/* ───────────────────────────── */
@media (max-width: 480px) {

  .step {
    min-width: 120px;
  }

  .step-circle {
    width: 22px;
    height: 22px;
    font-size: 10px;
  }

  .step-label .s-name {
    font-size: 10.5px;
  }
}
  
  `;

const STEPS = [
  { num: 1, name: "Modelo", sub: "Selecione o modelo" },
  { num: 2, name: "Variáveis", sub: "Personalize o conteúdo" },
  { num: 3, name: "Destinatários", sub: "Defina os alvos" },
  { num: 4, name: "Envio", sub: "Agende ou envie" },
];

export function Stepper(props) {
  const [currentStep, setCurrentStep] = useState(props.numeroPasso);

  const stepState = (n) => {
    if (n < currentStep) return "done";
    if (n === currentStep) return "active";
    return "idle";
  };

  return (
    <>
      <style>
        {style}
      </style>

      <div className="stepper">
        {STEPS.map((step, idx) => (
          <div
            key={step.num}
            style={{ display: "flex", alignItems: "center", flex: 1 }}
          >
            <div
              className={`step ${stepState(step.num)}`}
              style={{ cursor: "pointer" }}
              onClick={() => setCurrentStep(step.num)}
            >
              <div className={`step-circle ${stepState(step.num)}`}>
                {stepState(step.num) === "done" ? "✓" : step.num}
              </div>
              <div className="step-label">
                <span className="s-name">{step.name}</span>
                <span className="s-sub">{step.sub}</span>
              </div>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`step-line ${stepState(step.num) === "done" ? "done" : ""}`}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
