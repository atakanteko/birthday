import { useCallback, useEffect, useRef, useState } from "react";
import Countdown from "./components/Countdown";
import Timeline from "./components/Timeline";
import ReasonCards from "./components/ReasonCards";
import Finale from "./components/Finale";
import BackgroundMusic from "./components/BackgroundMusic";
import { content } from "./content";
import "./App.css";

function isTestMode() {
  return new URLSearchParams(window.location.search).get("test") === "1";
}

function isBirthdayReached() {
  return Date.now() >= new Date(content.birthday).getTime();
}

/**
 * Ana sayfa: içerik yalnızca süre dolunca (veya ?test=1) açılır.
 */
function App() {
  const journeyRef = useRef(null);
  const [unlocked, setUnlocked] = useState(() => isTestMode() || isBirthdayReached());

  // Bekleme sırasında aşağı kaydırmayı engelle
  useEffect(() => {
    document.body.classList.toggle("is-locked", !unlocked);
    return () => document.body.classList.remove("is-locked");
  }, [unlocked]);

  const handleUnlocked = useCallback(() => {
    setUnlocked(true);
  }, []);

  const handleJourneyStart = useCallback(() => {
    setUnlocked(true);
    requestAnimationFrame(() => {
      journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <div className={`app ${unlocked ? "app--unlocked" : "app--locked"}`}>
      <BackgroundMusic />

      <Countdown onStart={handleJourneyStart} onUnlocked={handleUnlocked} />

      {unlocked && (
        <div ref={journeyRef} id="journey">
          <Timeline />
          <ReasonCards />
          <Finale />
        </div>
      )}
    </div>
  );
}

export default App;
