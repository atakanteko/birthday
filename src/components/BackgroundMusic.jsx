import { useEffect } from "react";
import { content } from "../content";

/**
 * Modül seviyesinde tek Audio — StrictMode/HMR yüzünden
 * üst üste binmeyi (çift çalma / “karışma”) önler.
 */
let sharedAudio = null;
let unlockBound = false;

function getSharedAudio() {
  if (!sharedAudio) {
    sharedAudio = new Audio(content.music.file);
    sharedAudio.loop = true;
    sharedAudio.preload = "auto";
    sharedAudio.volume = 1;
  }
  return sharedAudio;
}

function tryPlay() {
  const audio = getSharedAudio();
  audio.loop = true;
  if (!audio.paused) return Promise.resolve(true);
  return audio.play().then(() => true).catch(() => false);
}

function bindUnlockOnce() {
  if (unlockBound) return;
  unlockBound = true;

  const events = ["pointerdown", "keydown"];

  const unlock = () => {
    tryPlay().then((ok) => {
      if (ok) {
        events.forEach((e) => document.removeEventListener(e, unlock));
      }
    });
  };

  events.forEach((e) =>
    document.addEventListener(e, unlock, { passive: true })
  );
}

/**
 * Görünmez arka plan müziği — buton yok, tek kaynak, sürekli loop.
 */
function BackgroundMusic() {
  useEffect(() => {
    const audio = getSharedAudio();

    // Hemen dene; engellenirse ilk etkileşimde başlat
    tryPlay().then((ok) => {
      if (!ok) bindUnlockOnce();
    });

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        tryPlay();
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    // StrictMode cleanup'ta pause ETME — ikinci mount'ta sessizlik / çift instance olur
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      // audio'yu bilerek bırakıyoruz (singleton)
      void audio;
    };
  }, []);

  return null;
}

export default BackgroundMusic;
