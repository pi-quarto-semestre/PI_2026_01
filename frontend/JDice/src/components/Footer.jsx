const styles = `

/* ── FOOTER ── */
  .footer {
    padding: 14px 32px;
    font-size: 11.5px;
    color: var(--muted);
    background: var(--green-light);
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }

`


function Footer() {
  return (
    <>
    <style>{styles}</style>
    <footer className="footer">
      John Deere Mail Manager — Plataforma de uso interno © 2025
    </footer>
    
    </>
  );
}
export default Footer;
