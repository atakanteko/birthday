import { content } from "./content";

/** Tek ses kaynağı — çift çalmayı önler */
let audioEl = null;
let readyPromise = null;
let unlockBound = false;

export function bindAudioElement(el) {
  if (!el || audioEl === el) return;
  audioEl = el;
  audioEl.loop = true;
  audioEl.preload = "auto";
  audioEl.setAttribute("playsinline", "true");

  readyPromise = new Promise((resolve) => {
    if (audioEl.readyState >= 2) {
      resolve();
      return;
    }
    const done = () => {
      audioEl.removeEventListener("canplay", done);
      audioEl.removeEventListener("loadeddata", done);
      resolve();
    };
    audioEl.addEventListener("canplay", done);
    audioEl.addEventListener("loadeddata", done);
    try {
      audioEl.load();
    } catch {
      resolve();
    }
  });
}

/**
 * Müziği sürekli çal.
 * 1) Sesli autoplay dene
 * 2) Olmazsa sessiz başlat (çoğu tarayıcı izin verir), ilk hareketle ses aç
 * Overlay / buton yok.
 */
export async function ensureMusicPlaying() {
  if (!audioEl) return false;

  audioEl.loop = true;
  if (readyPromise) await readyPromise;

  // Zaten sesli çalıyorsa tamam
  if (!audioEl.paused && !audioEl.muted) return true;

  // Sessiz çalıyorsa: unmute dinleyicisi yeterli
  if (!audioEl.paused && audioEl.muted) {
    bindSilentUnmute();
    return true;
  }

  // 1) Sesli dene
  try {
    audioEl.muted = false;
    await audioEl.play();
    return true;
  } catch {
    // 2) Sessiz autoplay — ilk hareketle ses açılır (uyarı yok)
    try {
      audioEl.muted = true;
      await audioEl.play();
      bindSilentUnmute();
      return true;
    } catch {
      bindSilentUnmute();
      return false;
    }
  }
}

/** Görünür uyarı yok — herhangi bir dokunuş/tuş sesi açar */
function bindSilentUnmute() {
  if (unlockBound) return;
  unlockBound = true;

  const events = ["pointerdown", "touchstart", "keydown", "click"];

  const unlock = async () => {
    if (!audioEl) return;
    audioEl.muted = false;
    audioEl.loop = true;
    try {
      if (audioEl.paused) await audioEl.play();
      events.forEach((e) => document.removeEventListener(e, unlock));
    } catch {
      // tekrar dene (dinleyiciler kalsın)
    }
  };

  events.forEach((e) =>
    document.addEventListener(e, unlock, { passive: true, capture: true })
  );
}

export const musicSrc = content.music.file;
