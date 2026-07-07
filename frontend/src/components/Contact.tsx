import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Heart } from "lucide-react";
import { content, isPlaceholder } from "../content/content";
import { SectionTitle, Placeholder } from "./primitives";

const ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim();

// Basic anti-spam: one submission per minute, tracked in localStorage so a
// page reload can't reset it. (Real abuse protection lives at the form backend.)
const COOLDOWN_MS = 60_000;
const COOLDOWN_KEY = "ch:lastInquiryAt";

/** Seconds remaining before another message may be sent (0 = ready). */
function cooldownRemaining(): number {
  try {
    const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
    const left = Math.ceil((last + COOLDOWN_MS - Date.now()) / 1000);
    return left > 0 ? left : 0;
  } catch {
    return 0;
  }
}

type FormState = { name: string; phone: string; email: string; message: string };
type Status = "idle" | "sending" | "sent" | "error";

const FIELDS = [
  { id: "name", label: "Your Name", type: "text", placeholder: "Jane Smith", required: true },
  { id: "phone", label: "Phone Number (optional)", type: "tel", placeholder: "952-555-0000", required: false },
  { id: "email", label: "Email Address (optional)", type: "email", placeholder: "jane@example.com", required: false },
] as const;

export default function Contact() {
  const { phone, emails, address } = content.business;
  const c = content.contact;

  const [form, setForm] = useState<FormState>({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [cooldown, setCooldown] = useState<number>(() => cooldownRemaining());

  // Tick the cooldown down once a second while it's active.
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown(cooldownRemaining()), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim() && !form.phone.trim())
      e.email = "Please give us an email or phone number so we can reach you.";
    if (!form.message.trim()) e.message = "Please tell us a little about your situation.";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    // Rate limit: block if a message was sent within the last minute.
    if (cooldownRemaining() > 0) {
      setCooldown(cooldownRemaining());
      return;
    }

    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});

    // Count this attempt toward the one-per-minute limit.
    try {
      localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
    } catch {
      /* localStorage unavailable — proceed without persistence */
    }
    setCooldown(Math.ceil(COOLDOWN_MS / 1000));

    // No endpoint configured → succeed locally and steer to phone/email.
    if (!ENDPOINT) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const cardBase: React.CSSProperties = {
    borderRadius: "var(--radius)",
    border: "2px solid var(--color-border)",
    backgroundColor: "var(--color-bg-alt)",
    boxShadow: "var(--shadow-card)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: 17,
    marginBottom: 8,
  };

  const inputStyle = (hasErr: boolean): React.CSSProperties => ({
    width: "100%",
    minHeight: 52,
    padding: "0 1rem",
    fontFamily: "var(--font-body)",
    fontSize: 17,
    color: "var(--color-text)",
    backgroundColor: "var(--color-bg)",
    border: `2px solid ${hasErr ? "var(--color-accent)" : "var(--color-border)"}`,
    borderRadius: "var(--radius-sm)",
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{ backgroundColor: "var(--color-bg)", padding: "var(--space-section) 0" }}
    >
      <div className="container">
        <SectionTitle id="contact-heading">{c.heading}</SectionTitle>
        <p
          style={{
            textAlign: "center",
            fontSize: "var(--fs-lead)",
            color: "var(--color-text-muted)",
            maxWidth: "36rem",
            margin: "0 auto 3rem",
          }}
        >
          {isPlaceholder(c.intro) ? <Placeholder /> : c.intro}
        </p>

        <div className="contact-grid">
          {/* Direct contact */}
          <div>
            <div style={{ borderRadius: "var(--radius)", backgroundColor: "var(--color-primary)", padding: "2rem", marginBottom: "1.5rem" }} className="on-green">
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: "var(--fs-h3)", marginBottom: "1.5rem" }}>
                {c.directHeading}
              </h3>

              <a
                href={`tel:${phone}`}
                aria-label={`Call ${phone}`}
                className="focus-light"
                style={{ display: "flex", alignItems: "center", gap: 12, minHeight: 56, padding: "0.75rem", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, textDecoration: "none", borderRadius: "var(--radius-sm)" }}
              >
                <Phone size={26} aria-hidden="true" />
                {phone}
              </a>

              {emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  aria-label={`Email ${email}`}
                  className="focus-light"
                  style={{ display: "flex", alignItems: "center", gap: 12, minHeight: 48, padding: "0.75rem", color: "var(--color-on-green)", fontSize: 18, textDecoration: "none", borderRadius: "var(--radius-sm)", wordBreak: "break-word" }}
                >
                  <Mail size={22} aria-hidden="true" style={{ flexShrink: 0 }} />
                  {email}
                </a>
              ))}

              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "0.75rem", color: "var(--color-on-green)", fontSize: 18 }}>
                <MapPin size={22} aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>
                  {address.line1}
                  <br />
                  {address.line2}
                </span>
              </div>
            </div>

            <div style={{ ...cardBase, padding: "1.5rem" }}>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--color-primary)", fontSize: 18, marginBottom: 4 }}>
                Visiting Hours
              </p>
              <p style={{ fontSize: 17, color: "var(--color-text)" }}>
                {content.business.visitingHours}. Tours available by appointment.
              </p>
            </div>
          </div>

          {/* Inquiry form */}
          <div>
            {status === "sent" ? (
              <div style={{ ...cardBase, backgroundColor: "var(--color-primary-tint)", border: "2px solid var(--color-primary)", padding: "2.5rem", textAlign: "center" }}>
                <Heart size={48} color="var(--color-accent)" aria-hidden="true" style={{ margin: "0 auto 1rem" }} />
                <h3 style={{ fontWeight: 800, color: "var(--color-primary-dark)", fontSize: "var(--fs-h3)", marginBottom: "0.75rem" }}>
                  Thank you{form.name ? `, ${form.name}` : ""}!
                </h3>
                <p style={{ fontSize: 18, lineHeight: 1.6 }}>
                  We'll be in touch very soon. In the meantime, feel free to call us at{" "}
                  <a href={`tel:${phone}`} style={{ fontWeight: 700, color: "var(--color-accent)" }}>
                    {phone}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ ...cardBase, padding: "2rem" }} aria-label="Inquiry form">
                <h3 style={{ fontWeight: 800, color: "var(--color-primary-dark)", fontSize: "var(--fs-h3)", marginBottom: "1.5rem" }}>
                  {c.formHeading}
                </h3>

                {FIELDS.map((f) => (
                  <div key={f.id} style={{ marginBottom: "1.25rem" }}>
                    <label htmlFor={f.id} style={labelStyle}>
                      {f.label}
                      {f.required && <span style={{ color: "var(--color-accent)", marginLeft: 4 }} aria-hidden="true">*</span>}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.id]}
                      required={f.required}
                      aria-required={f.required}
                      aria-invalid={!!errors[f.id]}
                      aria-describedby={errors[f.id] ? `${f.id}-error` : undefined}
                      onChange={(e) => setForm((s) => ({ ...s, [f.id]: e.target.value }))}
                      style={inputStyle(!!errors[f.id])}
                    />
                    {errors[f.id] && (
                      <p id={`${f.id}-error`} role="alert" style={{ color: "var(--color-accent)", fontSize: 16, marginTop: 4 }}>
                        {errors[f.id]}
                      </p>
                    )}
                  </div>
                ))}

                <div style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="message" style={labelStyle}>
                    Tell us about your situation
                    <span style={{ color: "var(--color-accent)", marginLeft: 4 }} aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="We're looking for care for my mother, who…"
                    value={form.message}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                    style={{ ...inputStyle(!!errors.message), minHeight: 120, padding: "0.75rem 1rem", resize: "vertical" }}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" style={{ color: "var(--color-accent)", fontSize: 16, marginTop: 4 }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p role="alert" style={{ color: "var(--color-accent)", fontSize: 16, marginBottom: "1rem" }}>
                    Something went wrong sending your message. Please call us at{" "}
                    <a href={`tel:${phone}`} style={{ fontWeight: 700, color: "var(--color-accent)" }}>{phone}</a> instead.
                  </p>
                )}

                {cooldown > 0 && (
                  <p aria-live="polite" style={{ color: "var(--color-text-muted)", fontSize: 16, marginBottom: "0.75rem", textAlign: "center" }}>
                    Thanks — you can send another message in {cooldown}s.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending" || cooldown > 0}
                  style={{
                    width: "100%",
                    minHeight: 56,
                    backgroundColor: status === "sending" || cooldown > 0 ? "var(--color-border)" : "var(--color-primary)",
                    color: "#fff",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 20,
                    border: "none",
                    borderRadius: "var(--radius-sm)",
                    cursor: status === "sending" ? "wait" : cooldown > 0 ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 16px rgba(46,125,50,0.3)",
                  }}
                >
                  {status === "sending"
                    ? "Sending…"
                    : cooldown > 0
                      ? `Please wait ${cooldown}s`
                      : "Send My Inquiry"}
                </button>

                <p style={{ textAlign: "center", marginTop: "1rem", fontSize: 16, color: "var(--color-text-muted)" }}>
                  Or call us directly:{" "}
                  <a href={`tel:${phone}`} style={{ fontWeight: 700, color: "var(--color-accent)" }}>
                    {phone}
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
