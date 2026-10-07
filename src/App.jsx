import { useCallback, useRef } from "react";
import Countdown from "./components/Countdown";
import Timeline from "./components/Timeline";
import ReasonCards from "./components/ReasonCards";
import Finale from "./components/Finale";
import BackgroundMusic from "./components/BackgroundMusic";
import "./App.css";

/**
 * Ana sayfa: tüm bölümleri sırayla birleştirir.
 * Müzik geri sayımdan bağımsız, arka planda sürekli çalar.
 */
function App() {
  const journeyRef = useRef(null);

  const handleJourneyStart = useCallback(() => {
    requestAnimationFrame(() => {
      journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <div className="app">
      <BackgroundMusic />

      <Countdown onStart={handleJourneyStart} />

      <div ref={journeyRef} id="journey">
        <Timeline />
        <ReasonCards />
        <Finale />
      </div>
    </div>
  );
}

export default App;
