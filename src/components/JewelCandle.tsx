const JewelCandle = ({ size = 24, lit = false }: { size?: number; lit?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`jewel-candle ${lit ? "jewel-candle-lit" : ""}`}
  >
    <defs>
      <linearGradient id="gold-3d" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDF3CE" />
        <stop offset="40%" stopColor="#D4AF37" />
        <stop offset="80%" stopColor="#B88A24" />
        <stop offset="100%" stopColor="#8B6513" />
      </linearGradient>
      <linearGradient id="gold-highlight" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
      <filter id="jewel-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#D4AF37" floodOpacity="0.3" />
      </filter>
    </defs>
    <path
      d="M12 2C12 2 5 9 5 14.5C5 18.6421 8.13401 22 12 22C15.866 22 19 18.6421 19 14.5C19 9 12 2 12 2Z"
      fill="url(#gold-3d)"
      filter="url(#jewel-shadow)"
    />
    <path
      d="M12 3.5C12 3.5 6.5 9.5 6.5 14.5C6.5 17.5 8.5 20 12 20.5C10 19 9 16 9 13C9 10 12 6 12 3.5Z"
      fill="url(#gold-highlight)"
    />
  </svg>
);

export default JewelCandle;
