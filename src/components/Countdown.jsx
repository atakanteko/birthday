import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { content } from "../content";
import "./Countdown.css";

/** URL'de ?test=1 varsa geri sayımı atla */
function isTestMode() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("test") === "1";
}

function getRemaining(targetMs) {
  const diff = Math.max(0, targetMs - Date.now());
  const totalSec = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
    done: diff <= 0,
  };
}

/**
 * Doğum gününe geri sayım.
 * Süre dolunca confetti + done metinleri + buton.
 * İçerik App tarafında kilidi açılana kadar DOM'da yok.
 */
function Countdown({ onStart, onUnlocked }) {
  const targetMs = useMemo(() => new Date(content.birthday).getTime(), []);
  const [testMode] = useState(isTestMode);
  const [time, setTime] = useState(() =>
    testMode ? { days: 0, hours: 0, minutes: 0, seconds: 0, done: true } : getRemaining(targetMs)
  );
  const celebrated = useRef(false);

  // Geri sayım tick
  useEffect(() => {
    if (testMode || time.done) return undefined;

    const id = setInterval(() => {
      setTime(getRemaining(targetMs));
    }, 250);

    return () => clearInterval(id);
  }, [targetMs, testMode, time.done]);

  // Süre dolunca / test: üst bileşene bildir + confetti
  useEffect(() => {
    if (!time.done) return;
    onUnlocked?.();

    if (celebrated.current) return;
    celebrated.current = true;

    const colors = ["#d4a24c", "#6d1a36", "#fbf3e4", "#e8c87a"];
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.55 },
      colors,
    });
    setTimeout(() => {
      confetti({ particleCount: 80, angle: 60, spread: 0.1, colors });
      confetti({ particleCount: 80, angle: 120, spread: 0.9, colors });
    }, 350);
  }, [time.done, onUnlocked]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="countdown section" aria-live="polite">
      <div className="countdown__glow" aria-hidden="true" />

      {!time.done ? (
        <>
          <h1 className="countdown__title">{content.countdown.waiting}</h1>
          <p className="countdown__sub">{content.countdown.waitingSub}</p>

          <div className="countdown__grid" role="timer">
            <TimeUnit value={pad(time.days)} label="Gün" />
            <TimeUnit value={pad(time.hours)} label="Saat" />
            <TimeUnit value={pad(time.minutes)} label="Dk" />
            <TimeUnit value={pad(time.seconds)} label="Sn" />
          </div>
        </>
      ) : (
        <div className="countdown__done">
          <h1 className="countdown__title countdown__title--done">{content.countdown.done}</h1>
          <p className="countdown__sub">{content.countdown.doneSub}</p>
          <button type="button" className="btn-primary countdown__cta" onClick={onStart}>
            {content.countdown.button}
          </button>
        </div>
      )}
    </section>
  );
}

function TimeUnit({ value, label }) {
  return (
    <div className="countdown__unit">
      <span className="countdown__value">{value}</span>
      <span className="countdown__label">{label}</span>
    </div>
  );
}

export default Countdown;
