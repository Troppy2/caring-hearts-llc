import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { content } from "../content/content";

const LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { phone, shortName } = content.business;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className="on-green"
      style={{
        position: "fixed",
        insetInline: 0,
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? "var(--color-primary-dark)" : "var(--color-primary)",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.2)" : "none",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        fontFamily: "var(--font-display)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 64,
        }}
      >
        <a
          href="#hero"
          onClick={() => setOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#fff",
            fontWeight: 800,
            fontSize: 20,
            textDecoration: "none",
            minHeight: 44,
          }}
        >
          <img src="/logo-mark.png" alt="" aria-hidden="true" style={{ width: 26, height: 26, display: "block" }} />
          <span>{shortName}</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-desktop" style={{ alignItems: "center", gap: 4, margin: 0 }}>
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  minHeight: 44,
                  padding: "0 1rem",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 17,
                  textDecoration: "none",
                  borderRadius: 10,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`tel:${phone}`}
              aria-label={`Call us at ${phone}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginLeft: 8,
                minHeight: 44,
                padding: "0 1rem",
                backgroundColor: "var(--color-accent)",
                color: "#fff",
                fontWeight: 800,
                fontSize: 16,
                textDecoration: "none",
                borderRadius: 10,
              }}
            >
              <Phone size={16} aria-hidden="true" />
              {phone}
            </a>
          </li>
        </ul>

        {/* Mobile menu button — labeled, never icon-only */}
        <button
          className="nav-menu-btn"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          style={{
            alignItems: "center",
            gap: 8,
            minHeight: 44,
            minWidth: 44,
            padding: "0 0.75rem",
            background: "transparent",
            border: "none",
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            borderRadius: 10,
            cursor: "pointer",
            fontFamily: "var(--font-display)",
          }}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          <span>Menu</span>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-menu"
          style={{
            backgroundColor: "var(--color-primary-dark)",
            borderTop: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <ul style={{ display: "flex", flexDirection: "column", margin: 0 }}>
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    minHeight: 52,
                    padding: "0 1.5rem",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 18,
                    textDecoration: "none",
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`tel:${phone}`}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  minHeight: 52,
                  padding: "0 1.5rem",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 18,
                  textDecoration: "none",
                }}
              >
                <Phone size={18} aria-hidden="true" />
                {phone}
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
