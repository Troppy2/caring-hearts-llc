import { Phone } from "lucide-react";
import { content, isPlaceholder } from "../content/content";
import { HeartLogoMark, CradleDivider, PhotoPlaceholder, Placeholder } from "./primitives";

export default function Hero() {
  const { phone, established } = content.business;
  const { headline, kicker, photo, photoCaption, ctaNote } = content.hero;

  return (
    <section
      id="hero"
      aria-label="Welcome to Caring Heart Assisted Living"
      className="on-green"
      style={{
        /* warm green gradient + a soft gold glow, richer than a flat field */
        background:
          "radial-gradient(120% 80% at 50% 0%, #3a9440 0%, var(--color-primary) 42%, var(--color-primary-dark) 100%)",
        paddingTop: 64,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "3.5rem 1.25rem 1rem",
        }}
      >
        {/* Real logo mark on a soft cream halo so the brown hands read on green */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem 1.75rem",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 50% 46%, rgba(250,243,231,0.96) 0%, rgba(250,243,231,0.9) 55%, rgba(250,243,231,0) 72%)",
          }}
        >
          <HeartLogoMark size={188} />
        </div>

        <h1
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: "var(--fs-display)",
            letterSpacing: "-0.01em",
            maxWidth: "44rem",
            marginTop: "1.5rem",
          }}
        >
          {headline}
        </h1>
        <p
          style={{
            display: "inline-block",
            marginTop: "0.85rem",
            padding: "0.45rem 1.15rem",
            borderRadius: 999,
            background: "var(--color-gold)",
            color: "#3a2606",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {kicker}
        </p>

        {/* Hero photo (placeholder until the client supplies the real home photo) */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "42rem",
            height: 340,
            marginTop: "2rem",
            borderRadius: "var(--radius)",
            overflow: "hidden",
            boxShadow: "0 16px 48px rgba(0,0,0,0.32)",
          }}
        >
          {isPlaceholder(photo) ? (
            <PhotoPlaceholder label="Untitled — home photo" onGreen />
          ) : (
            <>
              <img
                src={photo as unknown as string}
                alt="The Caring Heart home"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                loading="eager"
              />
              {!isPlaceholder(photoCaption) && (
                <>
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to bottom, transparent 45%, rgba(27,94,32,0.6))",
                    }}
                  />
                  <p
                    style={{
                      position: "absolute",
                      inset: "auto 0 1.25rem 0",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 20,
                      textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                    }}
                  >
                    &ldquo;{photoCaption}&rdquo;
                  </p>
                </>
              )}
            </>
          )}
        </div>

        {/* Primary CTA — visible above the fold */}
        <a
          href={`tel:${phone}`}
          aria-label={`Call us now at ${phone}`}
          className="focus-light"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: "2.5rem",
            minHeight: 64,
            padding: "0 2.25rem",
            backgroundColor: "var(--color-accent)",
            color: "#fff",
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: 24,
            textDecoration: "none",
            borderRadius: 18,
            boxShadow: "0 6px 24px rgba(198,40,40,0.45)",
            transition: "transform 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Phone size={28} aria-hidden="true" />
          Call Now: {phone}
        </a>
        <p style={{ color: "var(--color-on-green-dim)", marginTop: "0.75rem", fontSize: 16 }}>
          {isPlaceholder(ctaNote) ? <Placeholder onGreen /> : ctaNote}{" "}
          <span style={{ opacity: 0.85 }}>Established {established}.</span>
        </p>
      </div>

      <CradleDivider topColor="var(--color-primary)" bottomColor="var(--color-bg)" />
    </section>
  );
}
