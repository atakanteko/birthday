import "./Skyline.css";

/**
 * İnce İstanbul silueti + yavaş uçan martılar.
 * Performans için saf CSS/SVG animasyonu (GPU-dostu transform).
 */
function Skyline() {
  return (
    <div className="skyline" aria-hidden="true">
      <svg
        className="skyline__svg"
        viewBox="0 0 400 120"
        preserveAspectRatio="xMidYMax meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Camii kubbe + minareler (sol) */}
        <g fill="currentColor" opacity="0.55">
          <rect x="28" y="48" width="5" height="52" />
          <polygon points="30.5,38 25,48 36,48" />
          <ellipse cx="52" cy="72" rx="22" ry="14" />
          <rect x="36" y="72" width="32" height="28" />
          <rect x="72" y="42" width="5" height="58" />
          <polygon points="74.5,32 69,42 80,42" />
        </g>

        {/* Galata Kulesi (orta-sol) */}
        <g fill="currentColor" opacity="0.7">
          <rect x="140" y="35" width="18" height="65" rx="1" />
          <rect x="136" y="28" width="26" height="10" rx="1" />
          <polygon points="149,8 138,28 160,28" />
          <rect x="146" y="18" width="6" height="10" />
          <circle cx="149" cy="14" r="3" />
        </g>

        {/* Orta binalar */}
        <g fill="currentColor" opacity="0.4">
          <rect x="175" y="70" width="14" height="30" />
          <rect x="192" y="62" width="12" height="38" />
          <rect x="208" y="75" width="16" height="25" />
          <rect x="228" y="58" width="10" height="42" />
        </g>

        {/* Kız Kulesi (sağ) */}
        <g fill="currentColor" opacity="0.65">
          <rect x="300" y="50" width="14" height="50" rx="1" />
          <rect x="296" y="44" width="22" height="8" rx="1" />
          <polygon points="307,22 295,44 319,44" />
          <ellipse cx="307" cy="98" rx="28" ry="6" opacity="0.5" />
        </g>

        {/* Sağ minare / kubbe */}
        <g fill="currentColor" opacity="0.45">
          <rect x="340" y="55" width="4" height="45" />
          <polygon points="342,46 337,55 347,55" />
          <ellipse cx="360" cy="78" rx="16" ry="10" />
          <rect x="348" y="78" width="24" height="22" />
        </g>

        {/* Zemin çizgisi */}
        <path
          d="M0 100 Q100 95 200 100 T400 98 L400 120 L0 120 Z"
          fill="currentColor"
          opacity="0.25"
        />
      </svg>

      {/* Martılar — hafif CSS uçuşu */}
      <svg className="skyline__bird skyline__bird--1" viewBox="0 0 24 8" width="18" height="6">
        <path d="M0 5 Q6 0 12 5 Q18 0 24 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg className="skyline__bird skyline__bird--2" viewBox="0 0 24 8" width="14" height="5">
        <path d="M0 5 Q6 0 12 5 Q18 0 24 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg className="skyline__bird skyline__bird--3" viewBox="0 0 24 8" width="20" height="7">
        <path d="M0 5 Q6 0 12 5 Q18 0 24 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export default Skyline;
