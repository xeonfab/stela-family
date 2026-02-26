const JewelCandle = ({ size = 24, lit = false }: { size?: number; lit?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`jewel-candle-icon ${lit ? "is-active" : ""}`}
    style={{ overflow: "visible" }}
  >
    <defs>
      {/* Body: brushed gold gradient (light top-left → dark bottom-right) */}
      <linearGradient id="candle-body-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDF3CE" />
        <stop offset="25%" stopColor="#E8CC6A" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="75%" stopColor="#B8942A" />
        <stop offset="100%" stopColor="#8B6914" />
      </linearGradient>
      {/* Body highlight for 3D feel */}
      <linearGradient id="candle-body-highlight" x1="30%" y1="0%" x2="70%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
      </linearGradient>
      {/* Flame gold gradient */}
      <linearGradient id="candle-flame-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDF3CE" />
        <stop offset="30%" stopColor="#F5D76E" />
        <stop offset="60%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#B8942A" />
      </linearGradient>
      {/* Flame inner glow */}
      <radialGradient id="candle-flame-glow" cx="50%" cy="60%" r="50%">
        <stop offset="0%" stopColor="rgba(255,243,206,0.7)" />
        <stop offset="100%" stopColor="rgba(212,175,55,0)" />
      </radialGradient>
      {/* Drop shadow */}
      <filter id="candle-shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="3" floodColor="#D4AF37" floodOpacity="0.3" />
      </filter>
      {/* Flame aura glow (active only) */}
      <filter id="flame-aura" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#D4AF37" floodOpacity="0.5" />
      </filter>
    </defs>

    {/* ── BODY: Rounded cylinder ── */}
    <rect
      x="8"
      y="14"
      width="8"
      height="12"
      rx="2.5"
      ry="2.5"
      className="candle-body-shape"
      filter="url(#candle-shadow)"
    />
    {/* Body highlight overlay */}
    <rect
      x="8"
      y="14"
      width="8"
      height="12"
      rx="2.5"
      ry="2.5"
      fill="url(#candle-body-highlight)"
    />
    {/* Wick */}
    <line
      x1="12"
      y1="14"
      x2="12"
      y2="11"
      className="candle-wick"
    />

    {/* ── FLAME: Teardrop above body ── */}
    <g className="candle-flame-group">
      <path
        d="M12 2C12 2 8 6.5 8 9C8 11.2 9.8 13 12 13C14.2 13 16 11.2 16 9C16 6.5 12 2 12 2Z"
        className="candle-flame-shape"
      />
      {/* Inner glow */}
      <ellipse
        cx="12"
        cy="9.5"
        rx="2.5"
        ry="3"
        fill="url(#candle-flame-glow)"
        className="candle-flame-inner"
      />
    </g>
  </svg>
);

export default JewelCandle;
