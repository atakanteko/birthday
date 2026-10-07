import { useMemo } from "react";
import { motion } from "framer-motion";
import { content } from "../content";
import "./Finale.css";

/**
 * Final bölüm: başlık, kelime kelime mesaj, gül animasyonu, düşen kalpler.
 */
function Finale() {
  const words = useMemo(
    () => content.finale.message.split(" ").filter(Boolean),
    []
  );

  return (
    <section className="finale section">
      <FallingHearts />

      <motion.h2
        className="finale__title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {content.finale.title}
      </motion.h2>

      <RoseBloom />

      <p className="finale__message" aria-label={content.finale.message}>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="finale__word"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.04, 2.5) }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </p>

      <motion.p
        className="finale__signature"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {content.finale.signature}
      </motion.p>
    </section>
  );
}

/** Yavaşça açılan gül SVG */
function RoseBloom() {
  return (
    <div className="rose" aria-hidden="true">
      <svg viewBox="0 0 120 140" className="rose__svg">
        <path
          d="M60 70 C58 95 62 115 60 130"
          fill="none"
          stroke="#3d6b3a"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M60 100 C48 95 42 88 38 82"
          fill="none"
          stroke="#3d6b3a"
          strokeWidth="2"
        />
        <ellipse cx="34" cy="80" rx="10" ry="5" fill="#4a7c46" transform="rotate(-30 34 80)" />

        <g className="rose__petal rose__petal--outer">
          <ellipse cx="60" cy="48" rx="28" ry="22" fill="#6d1a36" />
          <ellipse cx="42" cy="52" rx="18" ry="20" fill="#7a2040" />
          <ellipse cx="78" cy="52" rx="18" ry="20" fill="#5a152c" />
        </g>

        <g className="rose__petal rose__petal--mid">
          <ellipse cx="60" cy="46" rx="18" ry="16" fill="#8b2a4a" />
          <ellipse cx="50" cy="48" rx="12" ry="14" fill="#9c3558" />
          <ellipse cx="70" cy="48" rx="12" ry="14" fill="#7a2040" />
        </g>

        <g className="rose__petal rose__petal--center">
          <ellipse cx="60" cy="46" rx="8" ry="8" fill="#d4a24c" opacity="0.85" />
          <ellipse cx="60" cy="46" rx="4" ry="4" fill="#fbf3e4" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}

/** Etrafta düşen kalpler */
function FallingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: `${8 + i * 11}%`,
        delay: i * 0.7,
        duration: 6 + (i % 3),
        size: 0.7 + (i % 3) * 0.2,
      })),
    []
  );

  return (
    <div className="falling-hearts" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="falling-hearts__item"
          style={{
            left: h.left,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}rem`,
          }}
        >
          {h.id % 2 === 0 ? "♥" : "❀"}
        </span>
      ))}
    </div>
  );
}

export default Finale;
