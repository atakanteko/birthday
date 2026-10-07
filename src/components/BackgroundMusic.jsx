import { useEffect, useRef } from "react";
import { bindAudioElement, ensureMusicPlaying, musicSrc } from "../music";
import "./BackgroundMusic.css";

/**
 * Görünmez arka plan müziği — buton / “dokun” katmanı yok.
 * Mümkünse hemen çalar; tarayıcı engellerse sessizce ilk etkileşimde ses açılır.
 */
function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return undefined;

    bindAudioElement(el);
    ensureMusicPlaying();

    // Periyodik yeniden dene (bazı tarayıcılarda geç yükleme)
    const retry = window.setInterval(() => {
      ensureMusicPlaying();
    }, 2000);

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        ensureMusicPlaying();
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearInterval(retry);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      id="bg-music"
      src={musicSrc}
      loop
      preload="auto"
      playsInline
      autoPlay
    />
  );
}

export default BackgroundMusic;
