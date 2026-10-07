import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "../content";
import Skyline from "./Skyline";
import "./Timeline.css";

/**
 * Dikey İstanbul hikâyesi zaman çizelgesi.
 * Scroll ile soldan/sağdan dönüşümlü belirir; mobilde tek sütun.
 */
function Timeline() {
  return (
    <section className="timeline section">
      <Skyline />

      <h2 className="section-title">{content.timelineTitle}</h2>

      <ol className="timeline__list">
        {content.timeline.map((item, index) => (
          <TimelineItem key={item.title} item={item} index={index} />
        ))}
      </ol>
    </section>
  );
}

function TimelineItem({ item, index }) {
  const fromLeft = index % 2 === 0;

  return (
    <motion.li
      className={`timeline__item ${fromLeft ? "is-left" : "is-right"}`}
      initial={{ opacity: 0, x: fromLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="timeline__dot" aria-hidden="true" />
      <TimelineImage src={item.image} alt={item.title} />
      <div className="timeline__body">
        <h3 className="timeline__heading">{item.title}</h3>
        <p className="timeline__text">{item.text}</p>
      </div>
    </motion.li>
  );
}

/** Fotoğraf yoksa bordo-altın gradient yer tutucu */
function TimelineImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="timeline__img timeline__img--placeholder" role="img" aria-label={alt}>
        <span>♥</span>
      </div>
    );
  }

  return (
    <img
      className="timeline__img"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default Timeline;
