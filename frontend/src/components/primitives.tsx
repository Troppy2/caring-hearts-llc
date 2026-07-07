import { useState, useEffect, useRef } from "react";
import type { ReactNode, CSSProperties } from "react";
import {
  Home,
  Utensils,
  Heart,
  Activity,
  Truck,
  Leaf,
  Clock,
  Users,
  Shield,
  Wifi,
  ImageOff,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Icon map ────────────────────────────────────────────────────
export const ICONS: Record<string, LucideIcon> = {
  Home,
  Utensils,
  Heart,
  Activity,
  Truck,
  Leaf,
  Clock,
  Users,
  Shield,
  Wifi,
};

// ─── Placeholders ────────────────────────────────────────────────
// Content not stated in the client's requirements documents renders as a
// clearly-marked "Untitled" placeholder rather than invented copy.

export function Placeholder({
  label = "Untitled",
  onGreen = false,
}: {
  label?: string;
  onGreen?: boolean;
}) {
  return (
    <span
      className="placeholder"
      title="Placeholder — content to be provided by the client"
      style={{ color: onGreen ? "rgba(255,255,255,0.6)" : undefined }}
    >
      {label}
    </span>
  );
}

// Dashed box standing in for a photo the client still needs to supply.
export function PhotoPlaceholder({
  label = "Untitled photo",
  onGreen = false,
  style = {},
}: {
  label?: string;
  onGreen?: boolean;
  style?: CSSProperties;
}) {
  const fg = onGreen ? "rgba(255,255,255,0.75)" : "var(--color-text-muted)";
  return (
    <div
      role="img"
      aria-label={label}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: "100%",
        height: "100%",
        minHeight: 160,
        backgroundColor: onGreen ? "rgba(255,255,255,0.08)" : "var(--color-primary-tint)",
        border: `2px dashed ${onGreen ? "rgba(255,255,255,0.35)" : "var(--color-border)"}`,
        color: fg,
        ...style,
      }}
    >
      <ImageOff size={34} aria-hidden="true" />
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, letterSpacing: "0.04em" }}>
        {label}
      </span>
    </div>
  );
}

// ─── Scroll reveal (respects prefers-reduced-motion via CSS) ──────
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Card with gentle hover/focus lift (decorative enhancement only —
//     never gates real interaction) ───────────────────────────────
export function LiftCard({
  children,
  style = {},
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useInView();
  const Tag = as as any;

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-6px)"
            : "translateY(0)"
          : "translateY(32px)",
        boxShadow: hovered ? "var(--shadow-lift)" : "var(--shadow-card)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.4s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.3s ease`,
      }}
    >
      {children}
    </Tag>
  );
}

// ─── Cradle divider ──────────────────────────────────────────────
// Signature motif: a soft cupped-hands "cradle" curve between color
// bands — echoing the logo's hands-holding-heart and the wavy banners in
// the client's brochure (system design §4). A warm gold ribbon traces the
// curve so the seams between sections carry the second brand hue.
export function CradleDivider({
  topColor,
  bottomColor,
  flip = false,
  ribbon = "var(--color-gold)",
}: {
  topColor: string;
  bottomColor: string;
  flip?: boolean;
  /** Highlight line hugging the curve; set to "none" to omit. */
  ribbon?: string;
}) {
  const curve = "M0,18 C 380,18 470,70 720,70 C 970,70 1060,18 1440,18";
  return (
    <div style={{ backgroundColor: topColor, lineHeight: 0 }} aria-hidden="true">
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        style={{
          display: "block",
          width: "100%",
          height: 72,
          transform: flip ? "scaleY(-1)" : undefined,
        }}
      >
        {/* the lower band, cupped toward the center */}
        <path d={`${curve} L1440,90 L0,90 Z`} fill={bottomColor} />
        {/* gold ribbon tracing the seam */}
        {ribbon !== "none" && (
          <path
            d={curve}
            fill="none"
            stroke={ribbon}
            strokeWidth="5"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
}

// ─── Section eyebrow ─────────────────────────────────────────────
// Small gold (or cream, on green) kicker above a section title. Adds the
// second brand hue and a bit of structure without numbered-list clutter.
export function Eyebrow({
  children,
  onGreen = false,
  align = "center",
}: {
  children: ReactNode;
  onGreen?: boolean;
  align?: "center" | "left";
}) {
  return (
    <p
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: align === "center" ? "center" : "flex-start",
        gap: 10,
        margin: "0 0 0.6rem",
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: 14,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: onGreen ? "var(--color-gold-tint)" : "var(--color-gold-text)",
      }}
    >
      <span aria-hidden="true" style={{ width: 22, height: 2, background: "currentColor", borderRadius: 2 }} />
      {children}
    </p>
  );
}

// ─── Icon-chip accents ───────────────────────────────────────────
// Rotating hue family so lists read lively but stay cohesive. On light
// sections: solid brand-color chip + white icon. On green sections: warm
// cream chip + colored icon (keeps icon/background contrast either way).
const CHIP_ON_LIGHT = [
  "var(--color-primary)",
  "var(--color-terracotta)",
  "var(--color-accent)",
  "var(--color-gold-dark)",
];
const ICON_ON_CREAM = [
  "var(--color-primary-dark)",
  "var(--color-terracotta)",
  "var(--color-accent)",
  "var(--color-gold-text)",
];

export function chipTheme(i: number, onGreen = false) {
  return onGreen
    ? { bg: "var(--color-gold-tint)", icon: ICON_ON_CREAM[i % ICON_ON_CREAM.length] }
    : { bg: CHIP_ON_LIGHT[i % CHIP_ON_LIGHT.length], icon: "#ffffff" };
}

// ─── Heart logo mark ─────────────────────────────────────────────
// The client's real logo (two hands cradling a heart), trimmed to a
// transparent background so it sits directly on any brand color.
export function HeartLogoMark({ size = 150 }: { size?: number }) {
  return (
    <img
      src="/logo-mark.png"
      width={size}
      height={Math.round((size * 293) / 372)}
      alt="Caring Heart logo — two hands cradling a heart"
      style={{ display: "block", height: "auto" }}
    />
  );
}

// ─── Generic content section wrapper (reused across the page) ─────
export function Section({
  id,
  bg,
  labelledBy,
  children,
  narrow = false,
  className = "",
  style = {},
}: {
  id?: string;
  bg: "cream" | "white" | "green" | "green-dark" | "blush" | "gold";
  labelledBy?: string;
  children: ReactNode;
  narrow?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const bgMap: Record<string, string> = {
    cream: "var(--color-bg)",
    white: "var(--color-bg-alt)",
    green: "var(--color-primary)",
    "green-dark": "var(--color-primary-dark)",
    blush: "var(--color-bg-blush)",
    gold: "var(--color-gold-tint)",
  };
  const onGreen = bg === "green" || bg === "green-dark";
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={onGreen ? "on-green " + className : className}
      style={{
        backgroundColor: bgMap[bg],
        padding: "var(--space-section) 0",
        ...style,
      }}
    >
      <div className={"container" + (narrow ? " container-narrow" : "")}>
        {children}
      </div>
    </section>
  );
}

// ─── Section heading ─────────────────────────────────────────────
export function SectionTitle({
  id,
  children,
  onGreen = false,
  align = "center",
}: {
  id: string;
  children: ReactNode;
  onGreen?: boolean;
  align?: "center" | "left";
}) {
  return (
    <h2
      id={id}
      style={{
        fontWeight: 800,
        fontSize: "var(--fs-h2)",
        color: onGreen ? "#ffffff" : "var(--color-primary-dark)",
        textAlign: align,
        marginBottom: "0.75rem",
      }}
    >
      {children}
    </h2>
  );
}

export function SectionIntro({
  children,
  onGreen = false,
}: {
  children: ReactNode;
  onGreen?: boolean;
}) {
  return (
    <p
      style={{
        textAlign: "center",
        fontSize: "var(--fs-lead)",
        color: onGreen ? "var(--color-on-green)" : "var(--color-text-muted)",
        maxWidth: "38rem",
        margin: "0 auto 3rem",
        lineHeight: 1.55,
      }}
    >
      {children}
    </p>
  );
}
