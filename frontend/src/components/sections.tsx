import { Phone, Mail, MapPin, Heart, Shield } from "lucide-react";
import { content, isPlaceholder } from "../content/content";
import type { Service, Facility, DayItem, CommunityCard } from "../content/content";
import {
  Section,
  SectionTitle,
  SectionIntro,
  Eyebrow,
  Reveal,
  LiftCard,
  CradleDivider,
  ICONS,
  chipTheme,
  Placeholder,
  PhotoPlaceholder,
} from "./primitives";

// Renders a section intro, or a placeholder marker when copy isn't supplied.
function Intro({ text, onGreen = false }: { text: string | null; onGreen?: boolean }) {
  return <SectionIntro onGreen={onGreen}>{isPlaceholder(text) ? <Placeholder onGreen={onGreen} /> : text}</SectionIntro>;
}

// ─── Mission ──────────────────────────────────────────────────────
export function Mission() {
  const m = content.mission;
  return (
    <Section id="about" bg="cream" labelledBy="mission-heading" narrow>
      <Reveal>
        <Eyebrow>About Us</Eyebrow>
        <SectionTitle id="mission-heading">Our Mission</SectionTitle>
        <p style={{ textAlign: "center", fontSize: 20, lineHeight: 1.65, maxWidth: "44rem", margin: "0 auto 3rem" }}>
          {m.statement}
        </p>
      </Reveal>

      <Reveal>
        <div
          style={{
            borderRadius: "var(--radius)",
            padding: "2rem",
            backgroundColor: "var(--color-primary-tint)",
            border: "2px solid var(--color-border)",
          }}
        >
          <h3 style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: "var(--fs-h3)", marginBottom: "1rem" }}>
            {m.differentiatorsHeading}
          </h3>
          <p style={{ fontSize: 18, lineHeight: 1.65 }}>{m.differentiatorsBody}</p>
        </div>
      </Reveal>
    </Section>
  );
}

// ─── Services ─────────────────────────────────────────────────────
export function Services() {
  const s = content.services;
  return (
    <>
      <CradleDivider topColor="var(--color-bg)" bottomColor="var(--color-primary)" />
      <Section id="services" bg="green" labelledBy="services-heading">
        <Eyebrow onGreen>What We Offer</Eyebrow>
        <SectionTitle id="services-heading" onGreen>
          {s.heading}
        </SectionTitle>
        <Intro text={s.intro} onGreen />

        <div className="cards-grid">
          {(s.items as Service[]).map((item, i) => {
            const Icon = ICONS[item.icon] ?? ICONS.Home;
            return (
              <LiftCard
                key={item.label}
                delay={i * 50}
                style={{
                  borderRadius: "var(--radius)",
                  padding: "1.5rem",
                  backgroundColor: "rgba(255,255,255,0.13)",
                  border: "1px solid rgba(255,255,255,0.22)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 44,
                      height: 44,
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: chipTheme(i, true).bg,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} color={chipTheme(i, true).icon} aria-hidden={true} />
                  </span>
                  <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 19 }}>{item.label}</h3>
                </div>
                <p style={{ color: "var(--color-on-green)", fontSize: 17, lineHeight: 1.55 }}>
                  {isPlaceholder(item.desc) ? <Placeholder onGreen /> : item.desc}
                </p>
              </LiftCard>
            );
          })}
        </div>
      </Section>
      <CradleDivider topColor="var(--color-primary)" bottomColor="var(--color-bg)" />
    </>
  );
}

// ─── Facilities ───────────────────────────────────────────────────
export function Facilities() {
  const f = content.facilities;
  return (
    <Section bg="blush" labelledBy="facilities-heading">
      <Eyebrow>Home Features</Eyebrow>
      <SectionTitle id="facilities-heading">{f.heading}</SectionTitle>
      <Intro text={f.intro} />

      <div className="cards-grid">
        {(f.items as Facility[]).map((item, i) => {
          const Icon = ICONS[item.icon] ?? ICONS.Home;
          return (
            <LiftCard
              key={item.label}
              delay={i * 50}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                borderRadius: "var(--radius)",
                padding: "1.5rem",
                backgroundColor: "var(--color-bg-alt)",
                border: "2px solid var(--color-border)",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 48,
                  height: 48,
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: chipTheme(i).bg,
                  flexShrink: 0,
                }}
              >
                <Icon size={24} color={chipTheme(i).icon} aria-hidden={true} />
              </span>
              <div>
                <h3 style={{ fontWeight: 700, color: "var(--color-primary-dark)", fontSize: 19, marginBottom: 4 }}>
                  {item.label}
                </h3>
                <p style={{ fontSize: 17, lineHeight: 1.55 }}>
                  {isPlaceholder(item.desc) ? <Placeholder /> : item.desc}
                </p>
              </div>
            </LiftCard>
          );
        })}
      </div>
    </Section>
  );
}

// ─── Meet the Founder ─────────────────────────────────────────────
export function Owner() {
  const o = content.owner;
  return (
    <Section bg="gold" labelledBy="owner-heading" narrow>
      <div style={{ marginBottom: "2.5rem" }}>
        <Eyebrow>Leadership</Eyebrow>
        <SectionTitle id="owner-heading">{o.heading}</SectionTitle>
      </div>

      <LiftCard
        className="owner-card"
        style={{
          borderRadius: "var(--radius)",
          overflow: "hidden",
          backgroundColor: "var(--color-bg-alt)",
          border: "2px solid var(--color-border)",
        }}
      >
        <div style={{ flexShrink: 0, width: "100%", maxWidth: 280, minHeight: 300 }}>
          {isPlaceholder(o.photo) ? (
            <PhotoPlaceholder label="Untitled — founder photo" style={{ minHeight: 300 }} />
          ) : (
            <img
              src={o.photo as unknown as string}
              alt={o.photoAlt}
              style={{ width: "100%", height: "100%", minHeight: 300, maxHeight: 400, objectFit: "cover" }}
              loading="lazy"
            />
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "2rem" }}>
          <blockquote
            style={{
              fontSize: 20,
              lineHeight: 1.65,
              fontStyle: "italic",
              borderLeft: "4px solid var(--color-accent)",
              paddingLeft: 20,
              margin: "0 0 1.5rem",
            }}
          >
            &ldquo;{o.quote}&rdquo;
          </blockquote>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--color-primary)", fontSize: 22 }}>
            {o.name}
          </p>
          <p style={{ color: "var(--color-text-muted)", fontSize: 17 }}>{o.title}</p>
        </div>
      </LiftCard>
    </Section>
  );
}

// ─── Staff & Safety ───────────────────────────────────────────────
export function StaffSafety() {
  const s = content.staffSafety;
  return (
    <>
      <CradleDivider topColor="var(--color-bg)" bottomColor="var(--color-primary)" />
      <Section bg="green" labelledBy="safety-heading" narrow>
        <Eyebrow onGreen>Care & Safety</Eyebrow>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <Shield size={32} color="#fff" aria-hidden="true" />
          <SectionTitle id="safety-heading" onGreen>
            {s.heading}
          </SectionTitle>
        </div>
        <Intro text={s.intro} onGreen />

        <ul className="cards-grid">
          {s.items.map((item, i) => (
            <LiftCard
              key={i}
              as="li"
              delay={i * 50}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                borderRadius: "var(--radius-sm)",
                padding: "1rem",
                backgroundColor: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Shield size={20} color="var(--color-on-green-dim)" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ color: "#fff", fontSize: 17, lineHeight: 1.55 }}>{item}</span>
            </LiftCard>
          ))}
        </ul>
      </Section>
      <CradleDivider topColor="var(--color-primary)" bottomColor="var(--color-bg)" />
    </>
  );
}

// ─── A Day in the Life ────────────────────────────────────────────
export function DayInLife() {
  const d = content.dayInLife;
  return (
    <Section bg="gold" labelledBy="day-heading" narrow>
      <Eyebrow>Everyday Life</Eyebrow>
      <SectionTitle id="day-heading">{d.heading}</SectionTitle>
      <Intro text={d.intro} />

      <div className="cards-grid">
        {(d.items as DayItem[]).map((item, i) => {
          const Icon = ICONS[item.icon] ?? ICONS.Heart;
          return (
            <LiftCard
              key={item.label}
              delay={i * 60}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                borderRadius: "var(--radius)",
                padding: "1.25rem 1.5rem",
                backgroundColor: "var(--color-bg-alt)",
                border: "2px solid var(--color-border)",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  backgroundColor: chipTheme(i).bg,
                  flexShrink: 0,
                }}
              >
                <Icon size={22} color={chipTheme(i).icon} aria-hidden={true} />
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{item.label}</span>
            </LiftCard>
          );
        })}
      </div>
    </Section>
  );
}

// ─── Community & Culture ──────────────────────────────────────────
export function Community() {
  const co = content.community;
  return (
    <>
      <CradleDivider topColor="var(--color-bg)" bottomColor="var(--color-primary-dark)" />
      <Section bg="green-dark" labelledBy="community-heading">
        <Eyebrow onGreen>Life Together</Eyebrow>
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionTitle id="community-heading" onGreen>
            {co.heading}
          </SectionTitle>
        </div>
        <div className="community-grid">
          {(co.cards as CommunityCard[]).map((card, i) => (
            <LiftCard
              key={card.title}
              delay={i * 70}
              style={{
                borderRadius: "var(--radius)",
                padding: "1.5rem",
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 20, marginBottom: 12 }}>{card.title}</h3>
              <p style={{ color: "var(--color-on-green)", fontSize: 17, lineHeight: 1.6 }}>{card.body}</p>
            </LiftCard>
          ))}
        </div>
      </Section>
      <CradleDivider topColor="var(--color-primary-dark)" bottomColor="var(--color-bg)" />
    </>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
export function Footer() {
  const { name, shortName, phone, emails, address, established } = content.business;
  const linkStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minHeight: 44,
    color: "var(--color-on-green-dim)",
    fontSize: 17,
    textDecoration: "none",
  };
  return (
    <footer className="on-green" style={{ backgroundColor: "var(--color-primary-dark)", padding: "2.5rem 0 2rem" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: "1rem" }}>
          <Heart size={22} color="var(--color-accent-soft)" fill="var(--color-accent-soft)" aria-hidden="true" />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#fff", fontSize: 20 }}>{shortName}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1rem 2rem", marginBottom: "1rem" }}>
          <a href={`tel:${phone}`} style={linkStyle} aria-label={`Call ${phone}`}>
            <Phone size={18} aria-hidden="true" /> {phone}
          </a>
          {emails.map((email) => (
            <a key={email} href={`mailto:${email}`} style={linkStyle} aria-label={`Email ${email}`}>
              <Mail size={18} aria-hidden="true" /> {email}
            </a>
          ))}
          <span style={{ ...linkStyle, cursor: "default" }}>
            <MapPin size={18} aria-hidden="true" /> {address.line1}, {address.line2}
          </span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15 }}>
          © {new Date().getFullYear()} {name}. Established {established}. Licensed &amp; Insured.
        </p>
      </div>
    </footer>
  );
}
