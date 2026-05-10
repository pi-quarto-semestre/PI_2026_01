const spinnerStyles = `
  @keyframes jdice-loading-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .jdice-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    color: #4b5563;
  }

  .jdice-loading.inline {
    display: inline-flex;
    width: auto;
    justify-content: flex-start;
  }

  .jdice-loading.stack {
    flex-direction: column;
    text-align: center;
  }

  .jdice-loading-spinner {
    display: inline-block;
    border-radius: 999px;
    animation: jdice-loading-spin 0.85s linear infinite;
    flex-shrink: 0;
  }

  .jdice-loading-label {
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
  }
`;

export default function LoadingSpinner({
  label = "Carregando...",
  size = 24,
  inline = false,
  light = false,
  minHeight = 0,
  stack = false,
}) {
  const spinnerColor = light ? "#ffffff" : "#3a7d3a";
  const trackColor = light ? "rgba(255, 255, 255, 0.28)" : "#dbe7db";
  const textColor = light ? "#ffffff" : "#6b7280";
  const borderWidth = Math.max(3, Math.round(size / 7));

  return (
    <>
      <style>{spinnerStyles}</style>
      <div
        className={`jdice-loading ${inline ? "inline" : ""} ${
          stack ? "stack" : ""
        }`.trim()}
        style={{
          minHeight: inline ? 0 : minHeight,
          color: textColor,
        }}
        role="status"
        aria-live="polite"
      >
        <span
          className="jdice-loading-spinner"
          style={{
            width: size,
            height: size,
            border: `${borderWidth}px solid ${trackColor}`,
            borderTopColor: spinnerColor,
          }}
          aria-hidden="true"
        />
        {label ? (
          <span className="jdice-loading-label" style={{ color: textColor }}>
            {label}
          </span>
        ) : null}
      </div>
    </>
  );
}
