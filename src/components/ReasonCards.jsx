import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "../content";
import "./ReasonCards.css";

/**
 * "Seni seviyorum çünkü..." — 3D çevirmeli kartlar.
 * Mobil: 2 sütun · Masaüstü: 3–4 sütun
 */
function ReasonCards() {
  return (
    <section className="reasons section">
      <h2 className="section-title">{content.reasonsTitle}</h2>
      <p className="section-hint">{content.reasonsHint}</p>

      <div className="reasons__grid">
        {content.reasons.map((reason, index) => (
          <ReasonCard key={index} reason={reason} number={index + 1} />
        ))}
      </div>
    </section>
  );
}

function ReasonCard({ reason, number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.button
      type="button"
      className={`reason-card ${flipped ? "is-flipped" : ""}`}
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: (number % 4) * 0.05 }}
    >
      <div className="reason-card__inner">
        {/* Ön yüz */}
        <div className="reason-card__face reason-card__face--front">
          <span className="reason-card__heart" aria-hidden="true">
            ♥
          </span>
          <span className="reason-card__num">{number}</span>
        </div>
        {/* Arka yüz */}
        <div className="reason-card__face reason-card__face--back">
          <p>{reason}</p>
        </div>
      </div>
    </motion.button>
  );
}

export default ReasonCards;
