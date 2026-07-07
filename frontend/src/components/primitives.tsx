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
// bands — echoing the logo's hands-holding-heart, per system design §4.
// `cup` = bands dip toward the center (holding); flip for the mirror.
export function CradleDivider({
  topColor,
  bottomColor,
  flip = false,
}: {
  topColor: string;
  bottomColor: string;
  flip?: boolean;
}) {
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
        {/* A single smooth cup: high at the edges, dipping gently at center */}
        <path
          d="M0,18 C 380,18 470,70 720,70 C 970,70 1060,18 1440,18 L1440,90 L0,90 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}

// ─── Heart logo mark ─────────────────────────────────────────────
// Two cupped hands cradling a heart, faithful to the client's logo.
// Rendered on a soft cream disc so the brown hands read on the green hero.
export function HeartLogoMark({ size = 150 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 200 190"
      width={size}
      height={(size * 190) / 200}
      role="img"
      aria-label="Caring Heart logo — two hands cradling a heart"
    >
      {/* soft cream disc backdrop */}
      <circle cx="100" cy="88" r="88" fill="#faf3e7" />
      {/* heart */}
      <path
        d="M100 118 C58 88 34 66 34 43 C34 25 47 13 64 13 C78 13 90 22 100 35 C110 22 122 13 136 13 C153 13 166 25 166 43 C166 66 142 88 100 118 Z"
        fill="#e02424"
      />
      {/* left hand */}
      <path
        d="M96 168 C70 168 44 156 30 132 C22 118 20 104 24 96 C28 89 36 90 40 98 C46 110 56 120 70 126 C58 112 50 100 48 88 C47 80 55 77 60 84 C68 96 80 110 96 118 Z"
        fill="#8a5a2b"
        stroke="#5c3a17"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* right hand (mirror) */}
      <path
        d="M104 168 C130 168 156 156 170 132 C178 118 180 104 176 96 C172 89 164 90 160 98 C154 110 144 120 130 126 C142 112 150 100 152 88 C153 80 145 77 140 84 C132 96 120 110 104 118 Z"
        fill="#8a5a2b"
        stroke="#5c3a17"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
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
  bg: "cream" | "white" | "green" | "green-dark";
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
