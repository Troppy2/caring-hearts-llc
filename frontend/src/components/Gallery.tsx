import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { content, isPlaceholder } from "../content/content";
import { CradleDivider, SectionTitle, PhotoPlaceholder } from "./primitives";
import type { GalleryPhoto } from "../content/content";

export default function Gallery() {
  const { heading, photos } = content.gallery as { heading: string; photos: GalleryPhoto[] };
  const [current, setCurrent] = useState(0);
  const total = photos.length;

  const go = (i: number) => setCurrent((i + total) % total);

  const arrowStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    backgroundColor: "var(--color-accent)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
    cursor: "pointer",
  };

  return (
    <>
      <CradleDivider topColor="var(--color-bg)" bottomColor="var(--color-primary-dark)" />
      <section
        id="gallery"
        aria-labelledby="gallery-heading"
        className="on-green"
        style={{ backgroundColor: "var(--color-primary-dark)", padding: "var(--space-section) 0" }}
      >
        <div className="container container-narrow">
          <div style={{ marginBottom: "2.5rem" }}>
            <SectionTitle id="gallery-heading" onGreen>
              {heading}
            </SectionTitle>
          </div>

          <div style={{ position: "relative" }} aria-live="polite">
            <div
              style={{
                width: "100%",
                height: "clamp(240px, 45vw, 460px)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                backgroundColor: "var(--color-primary)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
              }}
            >
              {isPlaceholder(photos[current].url) ? (
                <PhotoPlaceholder label={`Untitled photo ${current + 1} of ${total}`} onGreen />
              ) : (
                <img
                  key={current}
                  src={photos[current].url as string}
                  alt={photos[current].alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", animation: "fadeIn 0.35s ease" }}
                  loading="lazy"
                />
              )}
            </div>

            <button
              onClick={() => go(current - 1)}
              aria-label="Previous photo"
              className="focus-light"
              style={{ ...arrowStyle, left: -12 }}
            >
              <ChevronLeft size={28} aria-hidden="true" />
            </button>
            <button
              onClick={() => go(current + 1)}
              aria-label="Next photo"
              className="focus-light"
              style={{ ...arrowStyle, right: -12 }}
            >
              <ChevronRight size={28} aria-hidden="true" />
            </button>
          </div>

          <p
            style={{
              textAlign: "center",
              color: "var(--color-on-green-dim)",
              marginTop: "1rem",
              fontSize: 17,
              minHeight: 28,
            }}
          >
            {photos[current].alt}
          </p>

          {/* Dots */}
          <div
            style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: "0.75rem" }}
            role="group"
            aria-label="Gallery navigation"
          >
            {photos.map((p, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to photo ${i + 1} of ${total}: ${p.alt}`}
                aria-current={i === current}
                className="focus-light"
                style={{
                  width: i === current ? 28 : 12,
                  height: 12,
                  border: "none",
                  borderRadius: 6,
                  backgroundColor: i === current ? "var(--color-accent)" : "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  transition: "width 0.25s ease, background-color 0.25s ease",
                }}
              />
            ))}
          </div>

          {/* Thumbnails */}
          <div style={{ display: "flex", gap: 12, marginTop: "1.5rem", overflowX: "auto", paddingBottom: 8 }}>
            {photos.map((p, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`View photo ${i + 1}: ${p.alt}`}
                aria-pressed={i === current}
                className="focus-light"
                style={{
                  flexShrink: 0,
                  width: 96,
                  height: 68,
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                  padding: 0,
                  cursor: "pointer",
                  opacity: i === current ? 1 : 0.55,
                  border: i === current ? "3px solid var(--color-accent)" : "3px solid transparent",
                  background: "none",
                }}
              >
                {isPlaceholder(p.url) ? (
                  <PhotoPlaceholder label="" onGreen style={{ minHeight: 0, gap: 0 }} />
                ) : (
                  <img src={p.url as string} alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
      <CradleDivider topColor="var(--color-primary-dark)" bottomColor="var(--color-bg)" />
    </>
  );
}
